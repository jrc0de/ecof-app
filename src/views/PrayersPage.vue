<template>
  <ion-page>
    <ion-header>
      <ion-toolbar color="primary">
        <ion-buttons slot="start">
          <ion-menu-button></ion-menu-button>
        </ion-buttons>
        <ion-title>Prières</ion-title>
      </ion-toolbar>
    </ion-header>

    <ion-content class="ion-padding">
      <ion-list>
        <ion-item
          button
          v-for="priere in prieres"
          :key="priere.id"
          :router-link="priere.route"
          detail
        >
          <ion-label>
            <h2>{{ priere.titre }}</h2>
            <p>{{ priere.auteur }}</p>
          </ion-label>
        </ion-item>
      </ion-list>
    </ion-content>
  </ion-page>
</template>

<script setup>
import { ref } from "vue";
import {
  IonPage,
  IonHeader,
  IonToolbar,
  IonButtons,
  IonMenuButton,
  IonTitle,
  IonContent,
  IonList,
  IonItem,
  IonLabel,
} from "@ionic/vue";

const prieres = ref([
  {
    id: 1,
    titre: "Prière de Saint Éphrem",
    auteur: "Saint Éphrem le Syrien",
    route: "/prayers/saint-ephrem",
  },
  {
    id: 2,
    titre: "Prière de Saint Patrick",
    auteur: "Saint Patrick, archevêque d'Armagh, apôtre de l'Irlande",
    route: "/prayers/saint-patrick",
  },
]);
</script>

<style scoped>
ion-item {
  --padding-start: 16px;
}
</style>
