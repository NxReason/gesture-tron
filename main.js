const { app, BrowserWindow, ipcMain } = require('electron/main');
const path = require('node:path');
const { getImages } = require('./backend/dir');

function createWindow() {
  const win = new BrowserWindow({
    width: 1200,
    height: 900,
    webPreferences: {
      preload: path.join(__dirname, 'preload.js'),
    },
  });

  if (process.env.DEV) {
    win.loadURL('http://localhost:5173');
    win.webContents.openDevTools();
  } else {
    win.loadFile('./dist/index.html');
  }
}

app.whenReady().then(() => {
  ipcMain.handle('OPEN_DIR', getImages);
  createWindow();

  app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) {
      createWindow();
    }
  });
});

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});
