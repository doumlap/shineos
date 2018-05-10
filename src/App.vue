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
