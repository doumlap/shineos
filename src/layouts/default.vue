<template>
  <q-layout view="lHh Lpr lFf">
    <q-layout-header>
      header
    </q-layout-header>
    <q-page-container>
      <router-view />
    </q-page-container>
    <q-layout-footer>
    </q-layout-footer>
  </q-layout>
</template>

<script>
import Vue from 'vue'
import Component from 'vue-class-component'
import { openURL } from 'quasar'

export default {
  name: 'LayoutDefault',
}
</script>
