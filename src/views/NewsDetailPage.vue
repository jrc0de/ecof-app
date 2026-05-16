<template>
  <ion-page>
    <ion-header>
      <ion-toolbar color="primary">
        <ion-buttons slot="start">
          <ion-back-button default-href="/news"></ion-back-button>
        </ion-buttons>
        <ion-title>{{ article?.title ?? "Article" }}</ion-title>
      </ion-toolbar>
    </ion-header>

    <ion-content class="ion-padding">

      <div v-if="loading" class="ion-text-center ion-padding">
        <ion-spinner name="crescent" />
      </div>

      <ion-note v-else-if="error" color="danger" class="ion-padding">
        Impossible de charger l'article : {{ error }}
      </ion-note>

      <template v-else-if="article">
        <h1 class="article-title">{{ article.title }}</h1>

        <p class="article-meta">
          {{ article.author }} • {{ formatDate(article.published_at) }}
        </p>

        <ion-badge color="primary" class="ion-margin-bottom">
          {{ article.slug }}
        </ion-badge>

        <div class="article-body" v-html="article.content"></div>
      </template>

    </ion-content>
  </ion-page>
</template>

<script setup>
import { ref } from "vue"
import { useRoute } from "vue-router"
import {
  IonPage,
  IonHeader,
  IonToolbar,
  IonButtons,
  IonBackButton,
  IonTitle,
  IonContent,
  IonNote,
  IonSpinner,
  IonBadge,
  onIonViewWillEnter,
} from "@ionic/vue"

const route = useRoute()
const article = ref(null)
const loading = ref(true)
const error = ref(null)

function formatDate(isoString) {
  return new Intl.DateTimeFormat("fr-FR", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
  }).format(new Date(isoString))
}

onIonViewWillEnter(async () => {
  loading.value = true
  error.value = null
  article.value = null
  try {
    const id = route.params.id
    const res = await fetch(
      `https://ecof-api-production.up.railway.app/api/news/${id}`
    )
    if (!res.ok) throw new Error(`${res.status} ${res.statusText}`)
    article.value = await res.json()
  } catch (err) {
    error.value = err.message
  } finally {
    loading.value = false
  }
})
</script>

<style scoped>
.article-title {
  font-size: 1.4rem;
  font-weight: 700;
  margin-bottom: 6px;
}

.article-meta {
  opacity: 0.6;
  font-size: 0.9em;
  margin-bottom: 12px;
}

.article-body {
  line-height: 1.7;
  font-size: 1rem;
}

.article-body :deep(img) {
  max-width: 100%;
  border-radius: 8px;
  margin: 12px 0;
}

.article-body :deep(p) {
  margin-bottom: 12px;
}
</style>