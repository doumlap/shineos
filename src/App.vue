<template>
  <div id="q-app">
    <router-view />
  </div>
</template>

<script>
import Vue from 'vue';
import wifi from './components/wifi-component/wifi.vue';
import sound from './components/sound-component/sound.vue';
import ostime from './components/time-component/time.vue';
import lang from 'quasar-framework/i18n/fr';

const bugsnag = require('bugsnag-js')
const bugsnagVue = require('bugsnag-vue')

const bugsnagClient = bugsnag('48a557c373da3aa36fc37975aac41286')
bugsnagClient.use(bugsnagVue(Vue))

Vue.component('wifi', wifi);
Vue.component('sound', sound);
Vue.component('ostime', ostime);


export default {
  name: 'App.vue??',
  mounted() {
    this.$q.i18n.set(lang);
  }
}
</script>
