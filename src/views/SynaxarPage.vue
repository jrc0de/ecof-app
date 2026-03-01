<template>
  <ion-page>
    <ion-header>
      <ion-toolbar color="primary">
        <ion-buttons slot="start">
          <ion-menu-button></ion-menu-button>
        </ion-buttons>
        <ion-title>Synaxaire</ion-title>
      </ion-toolbar>
    </ion-header>

    <ion-content class="ion-padding">
      <ion-searchbar v-model="searchTerm" placeholder="Recherche" :debounce="300"></ion-searchbar>

      <div v-if="loading" class="ion-text-center ion-margin">
        <ion-spinner></ion-spinner>
        <p>Chargement des saints...</p>
      </div>

      <ion-card v-if="error" color="danger">
        <ion-card-content>{{ error }}</ion-card-content>
      </ion-card>

      <ion-list v-if="!loading && !error">
        <ion-item v-for="item in visibleSaints" :key="item.vies_id" button detail @click="showSaintDetail(item)">
          <ion-label>
            <h2>{{ item.saint }}</h2>
          </ion-label>
        </ion-item>
      </ion-list>

      <ion-infinite-scroll :disabled="allLoaded" @ionInfinite="loadMore">
        <ion-infinite-scroll-content loading-spinner="crescent" loading-text="Chargement..."></ion-infinite-scroll-content>
      </ion-infinite-scroll>
    </ion-content>
  </ion-page>
</template>

<script setup>
import { ref, onMounted, computed, watch } from "vue"
import { useRouter } from "vue-router"
import {
  IonPage,
  IonHeader,
  IonToolbar,
  IonButtons,
  IonMenuButton,
  IonTitle,
  IonContent,
  IonSearchbar,
  IonList,
  IonItem,
  IonLabel,
  IonSpinner,
  IonCard,
  IonCardContent,
  IonInfiniteScroll,
  IonInfiniteScrollContent,
} from "@ionic/vue"

const PAGE_SIZE = 40
const router = useRouter()

const saints = ref([]) // données brutes
const normalizedSaints = ref([]) // cache des noms normalisés
const loading = ref(false)
const error = ref(null)
const searchTerm = ref("")
const page = ref(1)

const removeAccents = (str) =>
  str
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()

const fetchSaints = async () => {
  loading.value = true
  error.value = null
  try {
    const response = await fetch("https://ecof-api-production.up.railway.app/api/synaxar")
    if (!response.ok) throw new Error("Erreur lors du chargement des données")
    saints.value = await response.json()

    // 🔑 Pré-calcul unique des noms normalisés → zéro recalcul pendant la recherche
    normalizedSaints.value = saints.value.map((item) => removeAccents(item.saint))
  } catch (err) {
    error.value = err.message
  } finally {
    loading.value = false
  }
}

// Filtrage sur le cache pré-calculé
const filteredSaints = computed(() => {
  if (!searchTerm.value) return saints.value
  const q = removeAccents(searchTerm.value)
  return saints.value.filter((_, i) => normalizedSaints.value[i].includes(q))
})

// 🔑 Pagination AUSSI en mode recherche → jamais plus de PAGE_SIZE éléments dans le DOM
const visibleSaints = computed(() => filteredSaints.value.slice(0, page.value * PAGE_SIZE))

const allLoaded = computed(() => visibleSaints.value.length >= filteredSaints.value.length)

// Reset page à chaque nouvelle recherche
watch(searchTerm, () => {
  page.value = 1
})

const loadMore = (event) => {
  page.value++
  event.target.complete()
}

const showSaintDetail = (item) => {
  router.push(`/saint/${item.vies_id}`)
}

onMounted(fetchSaints)
</script>
