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
      <!-- Carte uMap -->
      <div class="map-container">
        <iframe :src="umapUrl" width="100%" height="100%" frameborder="0" allowfullscreen></iframe>
      </div>
    </ion-content>
  </ion-page>
</template>

<script setup>
import {
  IonPage,
  IonHeader,
  IonToolbar,
  IonButtons,
  IonMenuButton,
  IonTitle,
  IonContent,
} from "@ionic/vue";

const umapUrl =
  "https://umap.openstreetmap.fr/fr/map/ecof-france_1159509?scaleControl=false&miniMap=false&scrollWheelZoom=false&zoomControl=true&editMode=disabled&moreControl=true&searchControl=null&tilelayersControl=null&embedControl=null&datalayersControl=true&onLoadPanel=none&captionBar=false&captionMenus=true";
</script>

<style scoped>
.map-content {
  --padding-start: 0;
  --padding-end: 0;
  --padding-top: 0;
  --padding-bottom: 0;
}

.map-container {
  width: 100%;
  height: 100%;
}

.map-container iframe {
  display: block;
}
</style>
