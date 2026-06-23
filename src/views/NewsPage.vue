<template>
  <ion-page>
    <ion-header>
      <ion-toolbar color="primary">
        <ion-buttons slot="start">
          <ion-menu-button></ion-menu-button>
        </ion-buttons>
        <ion-title>Actualités</ion-title>
      </ion-toolbar>
    </ion-header>

    <ion-content>
      <div v-if="loading" class="state-container">
        <ion-spinner color="primary"></ion-spinner>
        <p>Chargement...</p>
      </div>

      <div v-else-if="error" class="state-container">
        <p class="error-text">Impossible de charger les actualités : {{ error }}</p>
      </div>

      <ion-list v-else>
        <ion-item v-for="article in articles" :key="article.id" button detail :router-link="`/news/${article.id}`" router-direction="forward">
          <ion-label>
            <h2 class="article-title">{{ article.title }}</h2>
            <p>{{ article.author }} • {{ formatDate(article.published_at) }}</p>

            <ion-badge class="slug-badge">
              {{ article.slug }}
            </ion-badge>

            <ion-badge color="light" v-if="isNew(article.published_at)"> Nouveau </ion-badge>
          </ion-label>
        </ion-item>
      </ion-list>
    </ion-content>
  </ion-page>
</template>

<script setup>
import { ref } from "vue"
import { IonPage, IonHeader, IonToolbar, IonButtons, IonMenuButton, IonTitle, IonContent, IonList, IonItem, IonLabel, IonBadge, IonSpinner, IonNote, onIonViewWillEnter } from "@ionic/vue"

const articles = ref([])
const loading = ref(true)
const error = ref(null)
const hasFetched = ref(false)

function formatDate(isoString) {
  return new Intl.DateTimeFormat("fr-FR", {
    day: "2-digit",
    month: "long",
    year: "numeric",
  }).format(new Date(isoString))
}

function isNew(isoString) {
  const sevenDaysAgo = new Date()
  sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7)
  return new Date(isoString) > sevenDaysAgo
}

async function fetchArticles() {
  loading.value = true
  error.value = null
  try {
    const res = await fetch("https://ecof-api-production.up.railway.app/api/news")
    if (!res.ok) throw new Error(`${res.status} ${res.statusText}`)
    articles.value = await res.json()
    hasFetched.value = true
  } catch (err) {
    error.value = err.message
  } finally {
    loading.value = false
  }
}

onIonViewWillEnter(() => {
  if (!hasFetched.value) fetchArticles()
})
</script>

<style scoped>
ion-item {
  --padding-start: 16px;
}

ion-label {
  min-width: 0;
}

h2.article-title {
  font-weight: 400;
  margin-bottom: 4px;
  max-width: 100%;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
}

p {
  margin: 0;
  opacity: 0.7;
  font-size: 0.9em;
}

ion-badge {
  margin-top: 6px;
  margin-right: 4px;
}

.slug-badge {
  --background: var(--ion-color-primary-tint);
  --color: var(--ion-color-primary-contrast);
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
