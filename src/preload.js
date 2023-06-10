const {
  contextBridge,
  ipcRenderer
} = require('electron')

contextBridge.exposeInMainWorld('electron', {
  path: ipcRenderer.invoke('path'),
  config: ipcRenderer.invoke('config'),
  existsSync: (path) => ipcRenderer.invoke('existsSync', path),
  mkdirSync: (path) => ipcRenderer.invoke('mkdirSync', path),
  writeFileSync: (path, data) => ipcRenderer.invoke('writeFileSync', path, data),
  readFileSync: (path, options) => ipcRenderer.invoke('readFileSync', path, options)
})