const {
  app,
  BrowserWindow,
  ipcMain
} = require('electron');
const fs = require('fs')
const path = require('path')
const config = require('./config.json')

let createWindow = () => {
  let win = new BrowserWindow({
    width: 1000,
    height: 550,
    autoHideMenuBar: true,
    // fullscreen: true,
    resizable: false,
    webPreferences: {
      preload: path.join(__dirname, 'preload.js'),
      devTools: false,
    }
  })
  ipcMain.handle('path', () => path.join(__dirname, '\\flashcards'))
  ipcMain.handle('config', () => config)
  ipcMain.handle('existsSync', (event, path) => fs.existsSync(path))
  ipcMain.handle('mkdirSync', (event, path) => fs.mkdirSync(path))
  ipcMain.handle('writeFileSync', (event, path, data) => fs.writeFileSync(path, data))
  ipcMain.handle('readFileSync', (event, path, options) => fs.readFileSync(path, options))
  win.loadFile('./public/main_menu/index.html')
}

app.once('ready', () => {
  createWindow()
  app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) {
      createWindow()
    }
  })
})

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit()
  }
})