<template>
  <ion-page>
    <ion-header>
      <ion-toolbar color="primary">
        <ion-buttons slot="start">
          <ion-back-button text="" default-href="/prayers"></ion-back-button>
        </ion-buttons>
        <ion-title>Prières diverses</ion-title>
      </ion-toolbar>
    </ion-header>

    <ion-content class="ion-padding">
      <ion-list>
        <ion-item button v-for="priere in prieres" :key="priere.id" :router-link="priere.route" router-direction="forward" detail>
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
import { IonPage, IonHeader, IonToolbar, IonButtons, IonBackButton, IonTitle, IonContent, IonList, IonItem, IonLabel } from "@ionic/vue"

const prieres = [
  {
    id: 1,
    titre: "Prière de Saint Éphrem",
    auteur: "Saint Éphrem le Syrien",
    route: "/prayers/miscellaneous/saint-ephrem",
  },
  {
    id: 2,
    titre: "Prière de Saint Patrick",
    auteur: "Saint Patrick, archevêque d'Armagh, apôtre de l'Irlande",
    route: "/prayers/miscellaneous/saint-patrick",
  },
  {
    id: 3,
    titre: "Prière du matin de Monseigneur Jean",
    auteur: "Saint Jean, évêque de Saint-Denis",
    route: "/prayers/miscellaneous/mgr-jean",
  },
]
</script>

<style scoped>
ion-item {
  --padding-start: 16px;
}
</style>
