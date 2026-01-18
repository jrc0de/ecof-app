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
          v-for="event in events" 
          :key="event.id"
          button
          @click="openEventDetail(event)">
          
          <ion-label>
            <h2>{{ event.title }}</h2>
            <p>{{ formatDateTime(event.date) }}</p>
            <p>{{ event.location }}</p>
          </ion-label>
        </ion-item>
      </ion-list>

      <!-- État vide -->
      <div v-if="events.length === 0" class="ion-padding ion-text-center">
        <p>Aucun office programmé</p>
      </div>
    </ion-content>
  </ion-page>
</template>

<script setup>
import { ref } from 'vue';
import {
  IonPage, IonHeader, IonToolbar, IonTitle, IonContent,
  IonList, IonItem, IonLabel, IonButtons, IonMenuButton
} from '@ionic/vue';

const events = ref([
  {
    id: 1,
    title: 'Prière du matin',
    date: new Date('2026-01-20T07:00:00'),
    location: 'Église Saint-Pierre'
  },
  {
    id: 2,
    title: 'Messe dominicale',
    date: new Date('2026-01-25T10:30:00'),
    location: 'Cathédrale'
  },
  {
    id: 3,
    title: 'Vêpres',
    date: new Date('2026-01-28T18:00:00'),
    location: 'Chapelle du Couvent'
  }
]);

const formatDateTime = (date) => {
  return date.toLocaleString('fr-FR', { 
    day: 'numeric',
    month: 'long',
    hour: '2-digit', 
    minute: '2-digit'
  });
};

const openEventDetail = (event) => {
  console.log('Détails:', event);
};
</script>

<style scoped>
ion-item h2 {
  font-weight: 600;
  margin-bottom: 4px;
}

ion-item p {
  font-size: 14px;
  color: var(--ion-color-medium);
}
</style>