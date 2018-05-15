<template>
  <q-layout view="lHh Lpr lFf">
    <q-page-container id="container">
      <router-view />
    </q-page-container>
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
  .container {
    min-width: 100vh;
  }

  .q-layout {
    background-color: black;
  }

  .app-container.active {
    background-color: rgba(0, 0, 0, 0.2);
    background: url('http://images.all-free-download.com/images/graphicthumb/metal_plate_background_vector_290130.jpg') repeat 0 0;
    background-size: 300px 300px;
    opacity: 0.15;
    border: 5px solid white;
    box-shadow: inset 0 0 0 #fff,
            inset 0 0 10px  #fff,
            inset 0 0 15px  #eee,
            inset 0 0 20px  #ccc,
            inset 0 0 25px  #aaa
  }

  .app-container {
   border: 7px solid grey;
   background: none;
  }
</style>
