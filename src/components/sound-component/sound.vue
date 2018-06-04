<template>
  <div class="sound_core_component">
    <div v-on:click="togglePanel()">
      <q-icon name="volume_down" class="sound_button" />
    </div>
    <div v-show="showPanel==true" class="soud_core_component_knob_panel">
      <q-knob :value="level" @input="val => { level = val }" :min="0" :max="100" size="12rem" :step="5" color="white" track-color="black">
        <q-icon class="on-left soud_core_component_knob_panel_icon" name="volume_down"/> {{level}}
      </q-knob>
    </div>
  </div>
</template>
<script>
import Vue from 'vue'
const { ipcRenderer } = require('electron');
import { Watch, Component } from 'vue-property-decorator'

@Component({name: 'sound'})
export default class SoundComponent extends Vue {
  level = 50;
  showPanel = false;

  mounted() {
    ipcRenderer.send('command:get_sound');

    ipcRenderer.on('reply:get_sound', (ev, level) => {
      this.level = level * 100;
    });
  }

  togglePanel() {
    this.showPanel = !this.showPanel;
  }

  @Watch('level')
  onLevelChanged(n, o) {
    if (n && !isNaN(n)) {
      ipcRenderer.send('command:adjust_sound', this.level);
    }
  }
}
</script>

<style>
.sound_core_component .sound_button {
  font-size: 3rem;
  cursor: pointer;
}

.sound_core_component .soud_core_component_knob_panel {
  position: fixed;
  bottom: 65px;
  right: 65px;
}

.sound_core_component .soud_core_component_knob_panel .soud_core_component_knob_panel_icon {
  font-size: 3rem
}
</style>
