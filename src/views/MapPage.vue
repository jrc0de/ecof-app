<template>
  <ion-page>
    <ion-header>
      <ion-toolbar color="primary">
        <ion-buttons slot="start">
          <ion-menu-button></ion-menu-button>
        </ion-buttons>
        <ion-title>Lieux de culte</ion-title>
      </ion-toolbar>
    </ion-header>

    <ion-content class="map-content">
      <div class="map-container">
        <iframe :src="umapUrl" width="100%" height="100%" allowfullscreen title="Carte des lieux de culte ECOF"></iframe>
        <div class="map-hint" v-if="showHint">✌️ 2 doigts pour naviguer</div>
      </div>
    </ion-content>
  </ion-page>
</template>

<script setup>
import { ref } from "vue"
import { IonPage, IonHeader, IonToolbar, IonButtons, IonMenuButton, IonTitle, IonContent, onIonViewWillEnter, onIonViewWillLeave } from "@ionic/vue"

const umapUrl =
  "https://umap.openstreetmap.fr/fr/map/ecof-france_1159509?scaleControl=false&miniMap=false&scrollWheelZoom=false&zoomControl=true&editMode=disabled&moreControl=true&searchControl=null&tilelayersControl=null&embedControl=null&datalayersControl=true&onLoadPanel=none&captionBar=false&captionMenus=true"

const showHint = ref(false)
let hintTimeout = null

onIonViewWillEnter(() => {
  if (window.matchMedia("(pointer: coarse)").matches) {
    showHint.value = true
    hintTimeout = setTimeout(() => (showHint.value = false), 3000)
  }
})

onIonViewWillLeave(() => {
  clearTimeout(hintTimeout)
  showHint.value = false
})
</script>

<style scoped>
.map-content {
  --padding-start: 0;
  --padding-end: 0;
  --padding-top: 0;
  --padding-bottom: 0;
}

.map-container {
  position: relative;
  width: 100%;
  height: 100%;
}

.map-container iframe {
  border: none;
  display: block;
  width: 100%;
  height: 100%;
}

.map-hint {
  position: absolute;
  bottom: 24px;
  left: 50%;
  transform: translateX(-50%);
  background: rgba(0, 0, 0, 0.55);
  color: white;
  font-size: 12px;
  padding: 5px 12px;
  border-radius: 20px;
  pointer-events: none;
  white-space: nowrap;
  backdrop-filter: blur(4px);
}
</style>
