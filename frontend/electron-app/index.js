const electron = require("electron")
const { loadPlugins } = require("./utils")
const { app, BrowserWindow, Menu, ipcMain } = electron;
const { is } = require("electron-util")
const { PLUGINS_PATH } = process.env

async function runApp() {

    const plugins = await loadPlugins(PLUGINS_PATH)

    let mainWindow;

    const createWindow = () => {
        mainWindow = new BrowserWindow({
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
    }
    app.on('ready', createWindow)

    const menuTemplate = [
        {
            label: "View",
            submenu: [{role:"reload"}, {role: "toggledevtools"}]
        }
    ];

    const streams = new Map()

    class SharedPtr {
        constructor(timeout) {
            this.ref_count = 1
            this.timeout = timeout
            this.setHandler = this.setHandler.bind(this)
            this.timeoutHandler = this.timeoutHandler.bind(this)
            this.incrementRef = this.incrementRef.bind(this)
            this.decrementRef = this.decrementRef.bind(this)
            this.shouldBeFree = this.shouldBeFree.bind(this)
            this.free = this.free.bind(this)
            

        }

        timeoutHandler() {
            if (this.requestHandler) {
                this.requestHandler()
            }
            this.timer = setTimeout(this.timeoutHandler, this.timeout)
        }

        setHandler(requestHandler) {
            this.requestHandler = requestHandler
            this.timer = setTimeout(this.timeoutHandler, 100)
        }

        incrementRef() {
            this.ref_count++;
        }

        decrementRef() {
            this.ref_count--;
        }

        shouldBeFree() {
            return this.ref_count === 0
        }

        free() {
            console.log("stream is clean!")
            if (this.timer) {
                clearTimeout(this.timer)
            }
            
        }
    }

    // ************************ plugins dependencies
    async function wallets_request(exchange) {
        try {
            if (exchange in plugins) {
                let wallets = await plugins[exchange].wallets()
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

    function exitHandler(options, exitCode) {
        if (timer) {
            clearInterval(timer)
        } else {
            console.log("no timer")
        }
        if (options.cleanup) console.log('clean');
        if (exitCode || exitCode === 0) console.log(exitCode);
        if (options.exit) process.exit();
    }

    process.on('exit', exitHandler.bind(null,{cleanup:true}));
    process.on('SIGINT', exitHandler.bind(null, {exit:true}));
    process.on('SIGUSR1', exitHandler.bind(null, {exit:true}));
    process.on('SIGUSR2', exitHandler.bind(null, {exit:true}));
    process.on('uncaughtException', exitHandler.bind(null, {exit:true}));
}

runApp()




