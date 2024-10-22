const { ipcRenderer } = require('electron');

document.getElementById('download-vscode').addEventListener('click', () => {
  ipcRenderer.send('download-software', 'vscode');
});

document.getElementById('download-git').addEventListener('click', () => {
  ipcRenderer.send('download-software', 'git');
});

document.getElementById('download-node').addEventListener('click', () => {
  ipcRenderer.send('download-software', 'node');
});

document.getElementById('download-chrome').addEventListener('click', () => {
  ipcRenderer.send('download-software', 'chrome');
});

ipcRenderer.on('download-status', (event, message) => {
  document.getElementById('status').innerText = message;
});
