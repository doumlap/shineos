<template>
  <q-layout view="lHh Lpr lFf">
    <q-layout-header>

    </q-layout-header>
    <q-page-container>
      <router-view />
    </q-page-container>
    <q-layout-footer>
      <ostime class="float-right on-left"></ostime>
      <div class="float-right on-left" style="border-right: 1px solid black; height: 50px;"></div>
      <wifi class="float-right on-left" ></wifi>
      <div class="float-right on-left" style="border-right: 1px solid black; height: 50px;"></div>
      <sound class="float-right on-left"></sound>
    </q-layout-footer>
    <!-- <q-layout-drawer :content-class="['bg-grey-3', 'q-pa-sm']" side="right" v-model="drawer" :overlay="true">
      ...
    </q-layout-drawer> -->
  </q-layout>
</template>

<script>
import Vue from 'vue'
import Component from 'vue-class-component'

export default {
  name: 'LayoutDefault',
  props: { drawer: true }
}
</script>
<style>

</style>
