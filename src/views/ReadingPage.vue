<template>
  <ion-page>
    <ion-header>
      <ion-toolbar color="primary">
        <ion-buttons slot="start">
          <ion-button @click="goBack">
            <ion-icon slot="icon-only" :icon="arrowBack"></ion-icon>
          </ion-button>
        </ion-buttons>
        <ion-title>Lecture</ion-title>
      </ion-toolbar>
    </ion-header>

    <ion-content>
      <!-- Loading indicator -->
      <div v-if="loading" class="loading-container">
        <ion-spinner></ion-spinner>
      </div>

      <!-- Content -->
      <div v-else-if="readingData" class="ion-padding">
        <h2 class="book-title">{{ readingData.book_txt }}</h2>
        <div class="example-content">
          {{ readingData.reading }}
        </div>
      </div>

      <!-- No content -->
      <div v-else class="no-content">
        <p>Aucune lecture disponible</p>
      </div>
    </ion-content>
  </ion-page>
</template>

<script setup>
import { ref, onMounted } from "vue";
import { useRouter, useRoute } from "vue-router";
import {
  IonPage,
  IonHeader,
  IonToolbar,
  IonButtons,
  IonButton,
  IonIcon,
  IonTitle,
  IonContent,
  IonSpinner,
} from "@ionic/vue";
import { arrowBack } from "ionicons/icons";

const router = useRouter();
const route = useRoute();

const readingData = ref(null);
const loading = ref(true);

const goBack = () => {
  router.back();
};

const fetchReadingData = async () => {
  loading.value = true;
  try {
    const readingId = route.params.id;
    const response = await fetch(
      `https://ecof-api-production.up.railway.app/api/reading/${readingId}`,
    );

    if (!response.ok) {
      throw new Error(`Erreur HTTP: ${response.status}`);
    }

    const data = await response.json();
    // L'API retourne un tableau, on prend le premier élément
    readingData.value = data[0] || null;
  } catch (error) {
    console.error("Erreur lors du chargement de la lecture:", error);
    readingData.value = null;
  } finally {
    loading.value = false;
  }
};

onMounted(() => {
  fetchReadingData();
});
</script>

<style scoped>
.book-title {
  font-size: 1.3rem;
  font-weight: 600;
  margin-bottom: 1.5rem;
  color: var(--ion-color-primary);
  text-align: center;
}

.example-content {
  line-height: 1.8;
  text-align: justify;
  padding-top: 0.5rem;
  white-space: pre-line; /* Préserve les retours à la ligne (\r\n) */
}

.loading-container {
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 200px;
}

.no-content {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 4rem 2rem;
  margin: 2rem 0;
  text-align: center;
}

.no-content p {
  margin: 0;
  font-size: 0.95rem;
  color: var(--ion-color-medium);
  font-weight: 400;
}
</style>
