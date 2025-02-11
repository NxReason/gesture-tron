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

  win.loadURL('http://localhost:5173');
  win.webContents.openDevTools();
  // win.loadFile('index.html'); // for prod
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
