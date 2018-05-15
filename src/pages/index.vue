<template>
  <div class="desktop">
    <q-page padding class="flex flex-center desktop_container app-container active">
      <div class="">

      </div>
    </q-page>
  </div>
</template>

<script>
  import Vue from 'vue'
  import Component from 'vue-class-component'

  @Component({
    name: 'Index'
  })
  export default class Index extends Vue {
    mounted() {}
  }
</script>

<style>
  .desktop {
    overflow: hidden;
  }

  .desktop .desktop_container {
    overflow: hidden;
    outline: none;
    border-radius: 5px;
    color: white;
    width: 80%;
    height: 80vh;
    min-height: 1vh !important;
    margin-top: 8%;
  }
</style>
