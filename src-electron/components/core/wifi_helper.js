import { ipcMain } from 'electron';
import AbstractComponent from '../abstract_component'
var wifi = require('node-wifi');
wifi.init({iface: null});

export default class WifiHelper extends AbstractComponent {
  constructor(window, app, bugsnag) {
    super(window, app, bugsnag)

    this.initListeners();

    setInterval(function () {
      this.getCurrentConnections();
    }.bind(this), 5000);
  }

  getCurrentConnections = () => {
    wifi.getCurrentConnections((err, currentNetwork) => {
      this.window.send('reply:is_connected', currentNetwork.length > 0);
    });
  }

  initListeners = () => {
    ipcMain.on('command:get_wifi', (ev, args) => {
      wifi.scan((err, networks) => {
        ev.sender.send('reply:get_wifi', networks);
      });
    });

    ipcMain.on('command:connect_wifi', (ev, credential) => {
      wifi.connect({ ssid: credential.ssid, password: credential.pwd}, (err, networks) => {
        ev.sender.send('reply:connect_wifi');
      })
    });

    ipcMain.on('command:is_connected', ev => {
      this.getCurrentConnections();
    });
  }
}


