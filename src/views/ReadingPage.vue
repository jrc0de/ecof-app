<template>
  <ion-page>
    <ion-header>
      <ion-toolbar color="primary">
        <ion-buttons slot="start">
          <ion-back-button text="" default-href="/calendar" />
        </ion-buttons>
        <ion-title>Lecture</ion-title>
      </ion-toolbar>
    </ion-header>

    <ion-content>
      <!-- LOADING -->
      <div v-if="loading" class="state-container">
        <ion-spinner color="primary"></ion-spinner>
        <p>Chargement...</p>
      </div>

      <!-- ERROR -->
      <div v-else-if="error" class="state-container">
        <p class="error-text">
          {{ error }}
        </p>
      </div>

      <!-- CONTENT -->
      <div v-else-if="readingData" class="reading-wrapper ion-padding">
        <h2 class="book-title">
          {{ readingData.book_txt }}
        </h2>

        <div class="reading-text">
          {{ readingData.reading }}
        </div>
      </div>

      <!-- EMPTY -->
      <div v-else class="state-container">
        <p>Aucune lecture disponible</p>
      </div>
    </ion-content>
  </ion-page>
</template>

<script setup>
import { ref } from "vue"
import { useRoute } from "vue-router"
import { IonPage, IonHeader, IonToolbar, IonButtons, IonBackButton, IonTitle, IonContent, IonSpinner, onIonViewWillEnter } from "@ionic/vue"

const route = useRoute()

const readingData = ref(null)
const loading = ref(true)
const error = ref(null)

const fetchReadingData = async () => {
  loading.value = true
  error.value = null

  try {
    const readingId = route.params.id

    const response = await fetch(`https://ecof-api-production.up.railway.app/api/reading/${readingId}`)

    if (!response.ok) throw new Error(`Erreur HTTP: ${response.status}`)

    const data = await response.json()

    readingData.value = data[0] || null
  } catch (err) {
    error.value = err.message
  } finally {
    loading.value = false
  }
}

onIonViewWillEnter(fetchReadingData)
</script>

<style scoped>
.book-title {
  font-size: 1.3rem;
  font-weight: 600;
  margin-bottom: 1.5rem;
  color: var(--ion-color-primary);
  text-align: center;
}

.reading-text {
  line-height: 1.8;
  text-align: left;
  padding-top: 0.5rem;
  white-space: pre-line;
}

.reading-wrapper {
  max-width: 680px;
  margin: 0 auto;
}

.state-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 50vh;
  gap: 10px;
  color: #aaa;
  font-size: 0.9rem;
}

.error-text {
  color: var(--ion-color-danger);
}
</style>
