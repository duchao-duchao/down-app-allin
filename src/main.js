const { app, BrowserWindow, ipcMain } = require('electron');
const path = require('path');
const { download } = require('electron-dl');

function createWindow() {
  const win = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      // preload: path.join(__dirname, 'preload.js'),
      nodeIntegration: true,
      contextIsolation: false,
    },
  });

  win.loadFile('./src/index.html');
}

app.whenReady().then(createWindow);

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

app.on('activate', () => {
  if (BrowserWindow.getAllWindows().length === 0) {
    createWindow();
  }
});


ipcMain.on('download-software', (event, software) => {
    let url;
  
    switch (software) {
      case 'vscode':
        url = 'https://update.code.visualstudio.com/latest/win32-x64/stable';
        break;
      case 'git':
        url = 'https://github.com/git-for-windows/git/releases/download/v2.42.0.windows.1/Git-2.42.0-64-bit.exe';
        break;
      case 'node':
        url = 'https://nodejs.org/dist/v18.16.0/node-v18.16.0-x64.msi';
        break;
      case 'chrome':
        url = 'https://dl.google.com/chrome/install/375.126/chrome_installer.exe';
        break;
      default:
        event.reply('download-status', 'Unknown software!');
        return;
    }
  
    download(BrowserWindow.getFocusedWindow(), url)
      .then(dl => event.reply('download-status', `${software} downloaded to ${dl.getSavePath()}`))
      .catch(err => event.reply('download-status', `Download failed: ${err.message}`));
  });