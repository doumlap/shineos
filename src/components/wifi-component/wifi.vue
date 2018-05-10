<template>
  <div class="wifi_core_component">
    <div  v-on:click="togglePanel()">
      <q-icon v-if="isConnected==true" class="wifi_button" name="wifi"/>
      <q-icon v-if="isConnected==false" class="wifi_button disconnected" name="signal_wifi_off" />
    </div>
    <div v-show="showPanel==true" class="wifi_core_component_panel">
      <q-scroll-area class="wifi_core_scroll_area" :style="{height: panelHeight + 'px'}">
        <q-list highlight>
          <q-list-header>Choisir un reseau <q-spinner-radio v-show="networks.length==0" class="search_network float-right"></q-spinner-radio></q-list-header>
          <q-item v-for="network in networks" v-bind:data="network" v-bind:key="network.bssid" @click.native="connect(network)">
            <q-item-side><q-icon class="network_item" name="wifi"/></q-item-side>
            <q-item-main :label="network.ssid" style="cursor: pointer;"/>
          </q-item>
        </q-list>
      </q-scroll-area>
    </div>
  </div>
</template>
<script>
import Vue from 'vue';
import Component from 'vue-class-component';
import { isContext } from 'vm';
import { Dialog } from 'quasar';
const { ipcRenderer } = require('electron');

@Component({name: 'wifi'})
export default class WifiComponent extends Vue {
  networks = new Array();
  isConnected = true;
  showPanel = false;
  panelHeight = 70;

  beforeDestroy() {
    ipcRenderer.removeListener('reply:get_wifi');
  }

  mounted() {
    this.addListeners();
    this.getConnectionStatus();
  }

  togglePanel() {
    this.showPanel = !this.showPanel;

    if (this.showPanel === true) {
      this.panelHeight = 70;
      this.showNetwork();
    }
  }

  connect(network) {
    this.showPanel = false;

    this.$q.dialog({title: 'Network Connection', message: `Wifi ${network.ssid} password :`, prompt: {model: '', type: 'password'}}).then((pwd) => {
      ipcRenderer.send('command:connect_wifi', {ssid: network.ssid, pwd: pwd});
    });
  }

  getConnectionStatus() {
    ipcRenderer.send('command:is_connected');
  }

  showNetwork() {
    for (let i = this.networks.length; i > 0; i--) {
      this.networks.pop();
    }

    ipcRenderer.send('command:get_wifi');
  }

  setWifiBar(network) {
    if (network) {
      if (network.signal_level > -50) {
        return 'signal_wifi_4_bar';
      }
      else if (network.signal_level < -50 && network.signal_level > -65) {
         return 'signal_wifi_3_bar';
      }
      else if (network.signal_level < -66 && network.signal_level > -79) {
         return 'signal_wifi_2_bar';
      }
      else if (network.signal_level < -80) {
          return 'signal_wifi_1_bar';
      }
    }

     return 'signal_wifi_0_bar';
  }

  addListeners() {
    let self = this;

    ipcRenderer.on('reply:get_wifi', function (ev, result) {
      setTimeout(() => {
         result.forEach(function (network) {
            if (!network.ssid) network.ssid = 'hidden';
            network._bar = self.setWifiBar(network);
            self.networks.push(network);
         });

         self.panelHeight = 70 + (40 * result.length);
      }, 1000);
    });

    ipcRenderer.on('reply:connect_wifi', function (ev, result) {
      self.isConnected = true;
    });

    ipcRenderer.on('reply:is_connected', function (ev, result) {
      self.isConnected = result;
    });
  }
}
</script>
<style>
  .wifi_core_component .wifi_button {
    font-size: 3rem;
    cursor: pointer;
  }

  .wifi_core_component .wifi_core_component_panel {
    position: fixed;
    bottom: 65px;
    right: 35px;
  }

  .wifi_core_component .network_item {
    font-size: 1.5rem;
    margin-right: 5px;
  }

  .wifi_core_component .search_network {
    font-size: 1.5rem;
    margin-top: 9px;
    margin-right: 7px;
  }

  .wifi_core_component .wifi_core_scroll_area {
    width: 225px;
    max-height: 300px;
    background-color: white;
  }
</style>
