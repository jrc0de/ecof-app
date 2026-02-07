<template>
  <ion-page>
    <ion-header>
      <ion-toolbar color="primary">
        <ion-buttons slot="start">
          <ion-back-button default-href="/paroisses"></ion-back-button>
        </ion-buttons>
        <ion-title>Horaires</ion-title>
      </ion-toolbar>
    </ion-header>

    <ion-content class="ion-padding">
      <!-- Loader pendant le chargement -->
      <div v-if="loading" class="loading-container">
        <ion-spinner color="primary"></ion-spinner>
        <p>Chargement des événements...</p>
      </div>

      <!-- Message d'erreur -->
      <div v-else-if="error" class="error-container">
        <ion-text color="danger">
          <h3>Erreur</h3>
          <p>{{ error }}</p>
        </ion-text>
      </div>

      <!-- Liste des événements -->
      <div v-else>
        <ion-list v-if="events.length > 0">
          <ion-item v-for="event in events" :key="event.uid" lines="full">
            <ion-label class="ion-text-wrap">
              <h2>{{ event.title }}</h2>
              <p>{{ formatDate(event.start) }}</p>
              <p>{{ formatTime(event.start) }} - {{ formatTime(event.end) }}</p>
              <p v-if="event.description">{{ event.description }}</p>
              <p>{{ event.location }}</p>
            </ion-label>
          </ion-item>
        </ion-list>

        <!-- Message si aucun événement -->
        <div v-else class="empty-state">
          <ion-text color="medium">
            <p>Aucun événement liturgique</p>
          </ion-text>
        </div>
      </div>
    </ion-content>
  </ion-page>
</template>

<script setup>
import { ref, onMounted } from "vue";
import { useRoute } from "vue-router";
import {
  IonPage,
  IonHeader,
  IonToolbar,
  IonButtons,
  IonBackButton,
  IonTitle,
  IonContent,
  IonList,
  IonItem,
  IonLabel,
  IonText,
  IonSpinner,
} from "@ionic/vue";

const route = useRoute();
const events = ref([]);
const loading = ref(true);
const error = ref(null);

onMounted(async () => {
  await fetchEvents();
});

const fetchEvents = async () => {
  try {
    loading.value = true;
    error.value = null;

    const parishId = route.params.id;
    const response = await fetch(
      `https://ecof-api-production.up.railway.app/api/parish/${parishId}`,
    );

    if (!response.ok) {
      throw new Error("Impossible de récupérer les événements");
    }

    const data = await response.json();
    events.value = data.events || [];
  } catch (err) {
    error.value = err.message;
    console.error("Erreur:", err);
  } finally {
    loading.value = false;
  }
};

const formatDate = (dateString) => {
  const date = new Date(dateString);
  return date.toLocaleDateString("fr-FR", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  });
};

const formatTime = (dateString) => {
  const date = new Date(dateString);
  return date.toLocaleTimeString("fr-FR", {
    hour: "2-digit",
    minute: "2-digit",
  });
};
</script>

<style scoped>
.loading-container,
.error-container,
.empty-state {
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 50vh;
  text-align: center;
}
</style>
