import { ipcMain } from 'electron';
import AbstractComponent from '../abstract_component'
//const vol = require('vol');

export default class SoundHelper extends AbstractComponent {
  constructor(window, app, bugsnag) {
    super(window, app, bugsnag);
    // ipcMain.on('command:adjust_sound', (ev, level) => {
    //   if (level && !isNaN(level) && level >= 0 && level <= 100) {
    //     vol.set(level/100);
    //   }
    // });

    // ipcMain.on('command:get_sound', (ev) => {
    //   vol.get().then(level => {
    //     ev.sender.send('reply:get_sound', level);
    //   });
    // });
  }
}


