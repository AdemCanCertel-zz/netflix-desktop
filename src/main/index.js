const { app, BrowserWindow, globalShortcut } = require('electron');
const path = require('path');
const url = require('url')
const presence = require('../Presence/presence')

let win;

app.commandLine.appendSwitch(
  'widevine-cdm-path',
  path.join(__dirname, '../bin/widevinecdmadapter.plugin')
);
app.commandLine.appendSwitch(
  'widevine-cdm-version',
  '1.4.8.984'
);

const createWindow = () => {
  win = new BrowserWindow({
    width: 1500,
    height: 800,
    icon: __dirname + '../images/Netflix.png',
    frame: false,
    webPreferences: {
      plugins: true,
      nodeIntegration: true
    },
    alwaysOnTop: true,
  });


	const template = [
		{
			label: "Netflix",
			submenu: [
				{
					label: "Exit",
					click() {
						app.quit();
					}
				}
			]
		},
		{
			label: "View",
			submenu: [{ role: "reload" }, { role: "togglefullscreen" }]
		},
		{ label: "Window", submenu: [{ role: "minimize" }, { role: "close" }] }
	];

  win.loadURL('https://www.netflix.com/browse');
  win.setMenu(null);
  win.on('closed', () => {
    mainWindow = null;
    win.show();
  })};

app.whenReady().then(() => {
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