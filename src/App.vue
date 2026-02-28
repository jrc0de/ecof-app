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
          <ion-menu-toggle auto-hide="false" v-for="item in menuItems" :key="item.route">
            <ion-item button :router-link="item.route" router-direction="root">
              <ion-label>{{ item.label }}</ion-label>
              <img slot="end" :src="item.image" class="menu-img" />
            </ion-item>
          </ion-menu-toggle>
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
  IonMenuToggle,
  IonHeader,
  IonToolbar,
  IonTitle,
  IonContent,
  IonList,
  IonItem,
  IonLabel,
} from "@ionic/vue";

import synaxarImage from "@/assets/img/layout/saints.png";
import parishImage from "@/assets/img/layout/ange.png";
import aboutImage from "@/assets/img/layout/ange-b.png";
import prayerImage from "@/assets/img/layout/seraphim.png";
import mapImage from "@/assets/img/layout/pins.png";
import calendarImage from "@/assets/img/layout/christ.png";

const menuItems = [
  { label: "Paroisses", route: "/paroisses", image: parishImage },
  { label: "Calendrier", route: "/calendar", image: calendarImage },
  { label: "Carte", route: "/map", image: mapImage },
  { label: "Prières", route: "/prayers", image: prayerImage },
  { label: "Synaxaire", route: "/synaxar", image: synaxarImage },
  { label: "À propos", route: "/about", image: aboutImage },
];
</script>

<style scoped>
ion-menu ion-item {
  --min-height: 80px;
}

.menu-img {
  height: 70px;
  object-fit: contain;
}
</style>
