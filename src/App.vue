<template>
  <ion-app>
    <ion-menu content-id="main-content">
      <ion-header>
        <ion-toolbar color="primary">
          <ion-title>Menu</ion-title>
        </ion-toolbar>
      </ion-header>
      <ion-content class="ion-padding">
        <ion-list>
          <ion-item button @click="navigateTo('paroisses')">
            <ion-label>Paroisses</ion-label>
            <img :src="parishImage" class="menu-img" />
          </ion-item>

          <ion-item button @click="navigateTo('calendar')">
            <ion-label>Calendrier</ion-label>
            <img :src="calendarImage" class="menu-img" />
          </ion-item>

          <ion-item button @click="navigateTo('map')">
            <ion-label>Carte</ion-label>
            <img :src="mapImage" class="menu-img" />
          </ion-item>

          <ion-item button @click="navigateTo('prayers')">
            <ion-label>Prières</ion-label>
            <img :src="prayerImage" class="menu-img" />
          </ion-item>

          <ion-item button @click="navigateTo('synaxar')">
            <ion-label>Synaxaire</ion-label>
            <img :src="synaxarImage" class="menu-img" />
          </ion-item>

          <ion-item button @click="navigateTo('about')">
            <ion-label>À propos</ion-label>
            <img :src="aboutImage" class="menu-img" />
          </ion-item>
        </ion-list>
      </ion-content>
    </ion-menu>
    <ion-router-outlet id="main-content" />
  </ion-app>
</template>

<script setup>
import {
  IonApp,
  IonRouterOutlet,
  IonMenu,
  IonHeader,
  IonToolbar,
  IonTitle,
  IonContent,
  IonList,
  IonItem,
  IonLabel,
  menuController,
} from "@ionic/vue";
import { useRouter } from "vue-router";

import synaxarImage from "@/assets/img/layout/saints.png";
import parishImage from "@/assets/img/layout/ange.png";
import aboutImage from "@/assets/img/layout/ange-b.png";
import prayerImage from "@/assets/img/layout/seraphim.png";
import mapImage from "@/assets/img/layout/pins.png";
import calendarImage from "@/assets/img/layout/christ.png";

const router = useRouter();

const navigateTo = async (routePath) => {
  await menuController.close();
  router.push(`/${routePath}`);
};
</script>

<style scoped>
ion-menu ion-item {
  --min-height: 80px;
}

.menu-img {
  position: absolute;
  bottom: 0px;
  right: 4px;
  height: 70px;
  object-fit: contain;
}
</style>
