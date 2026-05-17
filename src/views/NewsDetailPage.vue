<template>
  <ion-page>
    <ion-header>
      <ion-toolbar color="primary">
        <ion-buttons slot="start">
          <ion-back-button text="" default-href="/news"></ion-back-button>
        </ion-buttons>
        <ion-title>{{ article?.title ?? "Article" }}</ion-title>
      </ion-toolbar>
    </ion-header>

    <ion-content class="ion-padding">
      <div v-if="loading" class="ion-text-center ion-padding">
        <ion-spinner name="crescent" />
      </div>

      <ion-note v-else-if="error" color="danger" class="ion-padding"> Impossible de charger l'article : {{ error }} </ion-note>

      <template v-else-if="article">
        <MarkdownSection :html="article.text" />
      </template>
    </ion-content>
  </ion-page>
</template>

<script setup>
import { ref } from "vue"
import { useRoute } from "vue-router"
import { IonPage, IonHeader, IonToolbar, IonButtons, IonBackButton, IonTitle, IonContent, IonNote, IonSpinner, onIonViewWillEnter } from "@ionic/vue"
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
    if (!res.ok) throw new Error(`${res.status} ${res.statusText}`)
    article.value = await res.json()
  } catch (err) {
    error.value = err.message
  } finally {
    loading.value = false
  }
})
</script>

<style lang="css" scoped>
ion-content {
  --padding-bottom: env(safe-area-inset-bottom, 16px);
}
</style>
