const {
  contextBridge,
  ipcRenderer
} = require('electron')

contextBridge.exposeInMainWorld('electron', {
  node: () => process.versions.node,
  chrome: () => process.versions.chrome,
  electron: () => process.versions.electron,
  existsSync: (path) => ipcRenderer.invoke('existsSync', path),
  mkdirSync: (path) => ipcRenderer.invoke('mkdirSync', path),
  path: () => ipcRenderer.invoke('path')
})

// versions, modules, electrons