<template>
  <ion-page>
    <ion-header>
      <ion-toolbar color="primary">
        <ion-buttons slot="start">
          <ion-back-button text="" default-href="/news"></ion-back-button>
        </ion-buttons>

        <ion-title>
          {{ article?.title ?? "Article" }}
        </ion-title>
      </ion-toolbar>
    </ion-header>

    <ion-content>
      <div v-if="loading" class="state-container">
        <ion-spinner color="primary"></ion-spinner>
        <p>Chargement...</p>
      </div>

      <div v-else-if="error" class="state-container">
        <p class="error-text">Impossible de charger l'article : {{ error }}</p>
      </div>

      <div v-else-if="article" class="ion-padding">
        <MarkdownSection :html="article.text" />
      </div>
    </ion-content>
  </ion-page>
</template>

<script setup>
import { ref } from "vue"
import { useRoute } from "vue-router"
import { IonPage, IonHeader, IonToolbar, IonButtons, IonBackButton, IonTitle, IonContent, IonSpinner, onIonViewWillEnter } from "@ionic/vue"
import MarkdownSection from "@/components/MarkdownSection.vue"

const route = useRoute()

const article = ref(null)
const loading = ref(true)
const error = ref(null)

onIonViewWillEnter(async () => {
  loading.value = true
  error.value = null
  article.value = null

  try {
    const id = route.params.id

    const res = await fetch(`https://ecof-api-production.up.railway.app/api/news/${id}`)

    if (!res.ok) {
      throw new Error(`${res.status} ${res.statusText}`)
    }

    article.value = await res.json()
  } catch (err) {
    error.value = err.message
  } finally {
    loading.value = false
  }
})
</script>

<style scoped>
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
