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
          <ion-item button @click="navigateTo('home')">
            <ion-icon :src="'/assets/ui/house.svg'" slot="start"></ion-icon>
            <ion-label>Accueil</ion-label>
          </ion-item>

          <ion-item button @click="navigateTo('offices')">
            <ion-icon :src="'/assets/ui/church.svg'" slot="start"></ion-icon>
            <ion-label>Offices</ion-label>
          </ion-item>

          <ion-item button @click="navigateTo('calendar')">
            <ion-icon :src="'/assets/ui/calendar.svg'" slot="start"></ion-icon>
            <ion-label>Calendrier</ion-label>
          </ion-item>

          <ion-item button @click="navigateTo('map')">
            <ion-icon :src="'/assets/ui/map.svg'" slot="start"></ion-icon>
            <ion-label>Carte</ion-label>
          </ion-item>

          <ion-item button @click="navigateTo('prayers')">
            <ion-icon :src="'/assets/ui/praying.svg'" slot="start"></ion-icon>
            <ion-label>Prières</ion-label>
          </ion-item>

          <ion-item button @click="navigateTo('synaxar')">
            <ion-icon :src="'/assets/ui/book.svg'" slot="start"></ion-icon>
            <ion-label>Synaxaire</ion-label>
          </ion-item>

          <ion-item button @click="navigateTo('about')">
            <ion-icon :src="'/assets/ui/info.svg'" slot="start"></ion-icon>
            <ion-label>À propos</ion-label>
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
  IonIcon,
  menuController
} from '@ionic/vue';
import { 
  home, 
  business, 
  calendar, 
  map, 
  heart, 
  book, 
  informationCircle 
} from 'ionicons/icons';
import { useRouter } from 'vue-router';

const router = useRouter();

const navigateTo = async (routePath) => {
  await menuController.close();
  router.push(`/${routePath}`);
};
</script>