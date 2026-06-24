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

    <ion-content>
      <ion-list>
        <ion-item
          button
          v-for="section in sections"
          :key="section.id"
          :router-link="section.disabled ? undefined : section.route"
          router-direction="forward"
          :detail="!section.disabled"
          :disabled="section.disabled"
        >
          <ion-label>
            <h2>{{ section.titre }}</h2>
            <p>{{ section.description }}</p>
          </ion-label>
        </ion-item>
      </ion-list>
    </ion-content>
  </ion-page>
</template>

<script setup>
import { IonPage, IonHeader, IonToolbar, IonButtons, IonMenuButton, IonTitle, IonContent, IonList, IonItem, IonLabel } from "@ionic/vue"

const sections = [
  {
    id: 1,
    titre: "Prières des Heures",
    description: "Office divin pour les différentes heures de la journée",
    route: "/prayers/hours",
    disabled: false,
  },
  {
    id: 2,
    titre: "Prières diverses",
    description: "Prières des saints ou pour des occasions particulières",
    route: "/prayers/miscellaneous",
    disabled: false,
  },
]
</script>
