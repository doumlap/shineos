<template>
  <div class="desktop">
    <q-page class="flex flex-center desktop_container" v-bind:style="{ backgroundImage: 'url(' + background + ')' }">
      <div class="">

      </div>
      <q-context-menu>
        <q-list link separator style="min-width: 150px; max-height: 300px;">
          <q-item v-close-overlay>
            <q-item-main label="Changer l'arriere plan" @click.native="changeBackground()"/>
          </q-item>
          <q-item v-close-overlay>
            <q-item-main label="Configuration"/>
          </q-item>
        </q-list>
      </q-context-menu>
    </q-page>
    <q-modal v-model="opened">
      <div class="row desktop_wallpaper_panel">
        <div v-for="(img, index) in backgrounds" v-bind:key="`img-${index}`" class="col-2 justify-center">
          <img :src="img" v-on:click="selectBackground(index)"/>
        </div>
      </div>
    </q-modal>
  </div>
</template>

<script>
import Vue from 'vue'
import Component from 'vue-class-component'

@Component({name: 'Index'})
export default class Index extends Vue {
    opened = false;
    background = '';
    backgrounds = [
      'https://fsb.zobj.net/crop.php?r=WLC63MpZBMGrAEd5lFgEjHizBE51D32FdDTajNNpED8ZhbA4eLYExeqUDgM4j3ngcSuOby4CasBS1fm5AipSUDwfkLUSxaz4OD3tg0Ih90xJRd65nJDQDVfPSekndNRoQ6tX64oOJtImC3i-',
      'https://fsb.zobj.net/crop.php?r=CtMuGsGpW1w-9gTo0RFZYVWn4Il3xy1RBC3-svm145Xr9qWUIS973BBqTouMeODqkzhkYx9aVbr70D9sH7xS3kFroDVD65FmvEQyDb9K4zCKV0Tzasz0qyYfL8tHCfaAVJ75HTXeUpJ5nHvT',
      'https://fsb.zobj.net/crop.php?r=hzEi7UGU5R6aaSAkiqUroG89fukApwxg7nVj1EKZKDAoh2KZq8A-vla35oP_0mKKKoP34eUyGEGEjhEs8ws49zcGp24e0cLEikMndgMacERfCtKYP5aMDsS0-npRErtPau4iL41d-DVh44L6',
      'https://fsa.zobj.net/crop.php?r=6b9fQaFEqKezlPeMl-T019TOvbVjIXoPkUG_cQa8VAjmDvjLTak3YrvlQ7LhI1-CTFIUpNyjL0Vi-AyZs0QitL3ubOoLkH3U0SWQIOeIFmlbTFytzZ5Fg6_c7Ev6tHL2--LAeh1hjYWzQzPK',
      'https://fsb.zobj.net/crop.php?r=tDKffRX509QrzGcrL5ri7nMKabrGuYx7FpmMtaTw3NghVuBtT14aQbFgWxFAGdnINxfquhXo34GgpCiMu4ADTyxw0ckafBHWL0G_RntaKr349OEEbyVG0ocH61lnvVSoHKR3Ss3GQ6V4rsH4',
      'https://fsa.zobj.net/crop.php?r=eQXpgXPvwSTQbkMFtx13NB3K4SNxIqF8O6fYwv0yULmx1R4_Q6ZyXOxeUKhl1aUJDBr473QftTEotO3F9Vkd0-Riosnqxm59gwLMfILIWNsmlzqfTSH6v7cOmelmPNtbLwTyNME8Mg2_KXvB'
    ];

    mounted() {
      this.background = this.backgrounds[5];
    }

    changeBackground() {
      this.opened = true;
    }

    selectBackground(index) {
      this.background = this.backgrounds[index];
      this.opened = false;
    }
}
</script>
<style>
  .desktop {
    overflow: hidden;
  }

  .desktop .desktop_container {
    background: no-repeat center center fixed;
    -webkit-background-size: cover;
    -moz-background-size: cover;
    -o-background-size: cover;
    background-size: cover;
  }

  .desktop .desktop_wallpaper_panel{
    margin: 25px;
  }

  .desktop .desktop_wallpaper_panel img{
    display: block;
    max-width:230px;
    max-height:95px;
    width: auto;
    height: auto;
    cursor: pointer;
  }
</style>
