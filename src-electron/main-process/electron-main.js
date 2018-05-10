import { app, BrowserWindow, ipcMain } from 'electron';
import ComponentLoader from './component_loader';
import wifi from '../components/core/wifi_helper';
import sound from '../components/core/sound_helper';

let bugsnag = require('bugsnag');
bugsnag.register('837be7a4eb807c262b261ec50418eb0a', { autoCaptureSessions: true });
bugsnag.onBeforeNotify(notif => {
  let meta = notif.events[0].metaData;
  meta.app = {version: '0.0.1a'};
  meta.user = { id: '08517fe9-8776-4467-ad47-e5d9496a769e', sn: '1ggrt5ddv1', name: 'Dominic Lapointe'};
});

/**
 * Set `__statics` path to static files in production;
 * The reason we are setting it here is that the path needs to be evaluated at runtime
 */
if (process.env.PROD) {
  global.__statics = require('path').join(__dirname, 'statics').replace(/\\/g, '\\\\')
}

let mainWindow;

function createWindow () {
  /**
   * Initial window options
   */
  mainWindow = new BrowserWindow({
    useContentSize: true
  })

  mainWindow.setMenu(null);
  //mainWindow.setKiosk(true);

  mainWindow.loadURL(process.env.APP_URL);

  mainWindow.on('closed', () => {
    mainWindow = null
  });

  mainWindow.toggleDevTools();

  new wifi(mainWindow, app, bugsnag);
  new sound(mainWindow, app, bugsnag);
  //ComponentLoader.instanciateModules(mainWindow, app, bugsnag);
}

app.on('ready', createWindow)

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

app.on('activate', () => {
  if (mainWindow === null) {
    createWindow()
  }
})
