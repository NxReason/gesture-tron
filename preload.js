const { contextBridge, ipcRenderer } = require('electron');

contextBridge.exposeInMainWorld('directory', {
  open: () => ipcRenderer.invoke('OPEN_DIR'),
});
