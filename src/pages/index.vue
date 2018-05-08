<template>
  <q-page class="flex flex-center">
    <q-btn @click="notify">Show Notification</q-btn>
    <q-btn @click="getWifi">Show Wifi</q-btn>
  </q-page>
</template>

<script>
import Vue from 'vue'
import Component from 'vue-class-component'
import { Notify } from 'quasar';
const { ipcRenderer } = require('electron');

@Component({name: 'Index'})
export default class Index extends Vue {
  model = 'test';

  notify()  {
    Notify.create({message: 'This is a warning', position: 'top-right'});
  }

  getWifi() {
    ipcRenderer.send('command:get_wifi');
    console.log(this.model);
  }
}
</script>
