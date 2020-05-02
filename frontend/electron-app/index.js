const electron = require("electron")

const { app, BrowserWindow, Menu, ipcMain } = electron;

let todayWindow;

app.on('ready', () => {
    todayWindow = new BrowserWindow({
        webPreferences: {
            nodeIntegration: true
        },
        title: "CryptoTrader"
    })

    todayWindow.loadURL(`http://localhost:3000`)
    todayWindow.on('close', () => {
        app.quit();
        todayWindow = null;
    })
})
