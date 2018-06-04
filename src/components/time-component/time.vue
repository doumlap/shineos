<template>
  <div class="time_core_component vertical-middle">
    <div class="time_core_component_time" v-on:click="togglePanel()">
      {{now}}
    </div>
    <div v-show="showPanel==true" class="time_core_component_calendar">
      <q-datetime-picker v-model="dateCalendar" type="date" :dark="true" />
    </div>
  </div>
</template>
<script>
import Vue from 'vue'
import { Component } from 'vue-property-decorator'
import { date } from 'quasar';

@Component({name: 'ostime'})
export default class TimeComponent extends Vue {
  showPanel = false;
  dateCalendar = new Date();
  now = date.formatDate(new Date(), 'hh:mm A');

  mounted() {
    setInterval(() => {
      this.now = date.formatDate(new Date(), 'hh:mm A');
    }, 1000);
  }

  togglePanel() {
    this.dateCalendar = this.now;
    this.showPanel = !this.showPanel;
  }
}
</script>

<style>
.time_core_component {

}
.time_core_component .time_core_component_time {
  height: 50px;
  line-height: 47px;
  cursor: pointer;
}

.time_core_component .time_core_component_calendar {
  position: fixed;
  bottom: 65px;
  right: 65px;
}
</style>
