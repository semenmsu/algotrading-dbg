const electron = require("electron")
const { loadPlugins, exitHandler, SharedPtr } = require("./utils")
const { getFormatedUTCTime } = require('./utils/time')
const { app, BrowserWindow, Menu, ipcMain } = electron;
const { is } = require("electron-util")
const { PLUGINS_PATH } = process.env


async function timeitAsync(f){
    let startTime = Date.now()
    f()
    let stopTime = Date.now()
    return stopTime - startTime
}


const createMainWindow = () => {
    let mainWindow = new BrowserWindow({
        webPreferences: {
            devTools: is.development,
            nodeIntegration: true
        },
        title: "CryptoTrader"
    })



    const startUrl = process.env.ELECTRON_START_URL || `file://${__dirname}/build/index.html`
    mainWindow.loadURL(startUrl)
    mainWindow.on('close', () => {
        app.quit();
        mainWindow = null;
    })

    if (process.env.ELECTRON_START_URL) {
        const mainMenu = Menu.buildFromTemplate(menuTemplate);
        Menu.setApplicationMenu(mainMenu)
    } else {
        Menu.setApplicationMenu(false);
    }

    return mainWindow
}

const menuTemplate = [
    {
        label: "View",
        submenu: [{role:"reload"}, {role: "toggledevtools"}]
    }
];

async function runApp(createWindow) {

    const plugins = await loadPlugins(PLUGINS_PATH)

    let mainWindow;
    let onReady = () => {
        mainWindow = createWindow()
    }
    //app.on('ready', windowCreator)
    app.on('ready', onReady)

    

    const streams = new Map()

    // ************************ plugins dependencies
    async function wallets_request(exchange) {
        try {
            if (exchange in plugins) {
                let start = Date.now()
                let wallets = await plugins[exchange].wallets()
                let latency = Date.now() - start
                console.log(`[${getFormatedUTCTime()}] Bitfinex wallets request latency : `, latency)
                //console.log('latency', latency)

                mainWindow.webContents.send(`${exchange}:response:wallets`, wallets)
            } else {
                console.log("request for undefined plugin ", exchange)
            }
            
        } catch(e) {
            console("wallets_request error: ", e)
        }
    }
    // **********************************************

    function channelSubscribe(exchange, channel, timeout) {
        let stream_name = `${exchange}:request:${channel}`
        if (streams.has(stream_name)) {
            streams.get(stream_name).incrementRef()
        } else {
            let ptr = new SharedPtr(timeout)
            if (channel === "wallets") {
                ptr.setHandler(()=> wallets_request(exchange))
            }
            streams.set(stream_name, ptr)
        }
    }

    function channelUnsubscribe(exchange, channel) {
        let stream_name = `${exchange}:request:${channel}`
        let stream = streams.get(stream_name)
        stream.decrementRef()
        if (stream.shouldBeFree()) {
            stream.free()
            streams.delete(stream_name)
        }
    }

    ipcMain.on("request", (e, req) => {
        console.log(req)
        const { exchange, channel, event, timeout} = req
        if (event === "subscribe") {
            channelSubscribe(exchange, channel, timeout)
        } else if (event === "unsubscribe") {
            channelUnsubscribe(exchange, channel)
        }
    })

    let counter = 0

    let timer = setInterval(() => {
        mainWindow.webContents.send("react:counter:update", counter++) 
    }, 1000)


    process.on('exit', exitHandler.bind(null,{cleanup:true}));
    process.on('SIGINT', exitHandler.bind(null, {exit:true}));
    process.on('SIGUSR1', exitHandler.bind(null, {exit:true}));
    process.on('SIGUSR2', exitHandler.bind(null, {exit:true}));
    process.on('uncaughtException', exitHandler.bind(null, {exit:true}));
}

runApp(createMainWindow)




