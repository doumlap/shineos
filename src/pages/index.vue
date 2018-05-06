<template>
  <q-page class="flex flex-center">
    <q-field
  icon="cloud"
  label="Your Gmail"
  helper="Helper"
  error-label="We need a valid email"
  :count="10"
>
  <q-input suffix="@gmail.com" v-model="model" />
</q-field>
  </q-page>
</template>

<style>
</style>

<script>
export default {
  data () {
    return {
      model: 'test'
    }
  }
}
</script>
