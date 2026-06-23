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

    <ion-content>
      <ion-searchbar v-model="searchTerm" placeholder="Recherche" :debounce="300"></ion-searchbar>

      <div v-if="loading" class="state-container">
        <ion-spinner color="primary"></ion-spinner>
        <p>Chargement...</p>
      </div>

      <div v-else-if="error" class="state-container">
        <p class="error-text">
          {{ error }}
        </p>
      </div>

      <ion-list v-else>
        <ion-item v-for="item in visibleSaints" :key="item.id" button detail @click="showSaintDetail(item)">
          <ion-label class="ion-text-wrap">
            <h2>{{ item.saint }}</h2>
          </ion-label>
        </ion-item>
      </ion-list>

      <ion-infinite-scroll v-if="!loading && !error" :disabled="allLoaded" @ionInfinite="loadMore">
        <ion-infinite-scroll-content loading-spinner="crescent" loading-text="Chargement..."> </ion-infinite-scroll-content>
      </ion-infinite-scroll>
    </ion-content>
  </ion-page>
</template>

<script setup>
import { ref, computed, watch } from "vue"
import { useIonRouter } from "@ionic/vue"
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
  IonInfiniteScroll,
  IonInfiniteScrollContent,
  onIonViewWillEnter,
} from "@ionic/vue"

const PAGE_SIZE = 40

const ionRouter = useIonRouter()

const saints = ref([])
const loading = ref(true)
const error = ref(null)
const searchTerm = ref("")
const displayCount = ref(PAGE_SIZE)
const hasFetched = ref(false)

const removeAccents = (str) =>
  str
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()

const fetchSaints = async () => {
  loading.value = true
  error.value = null
  displayCount.value = PAGE_SIZE

  try {
    const response = await fetch("https://ecof-api-production.up.railway.app/api/synaxar")

    if (!response.ok) {
      throw new Error("Erreur lors du chargement des données")
    }

    const data = await response.json()

    saints.value = data.map((item) => ({
      ...item,
      _normalized: item.saint ? removeAccents(item.saint) : "",
    }))

    hasFetched.value = true
  } catch (err) {
    error.value = err.message
  } finally {
    loading.value = false
  }
}

const filteredSaints = computed(() => {
  if (!searchTerm.value.trim()) {
    return saints.value
  }

  const q = removeAccents(searchTerm.value)

  return saints.value.filter((item) => item._normalized.includes(q))
})

const visibleSaints = computed(() => filteredSaints.value.slice(0, displayCount.value))

const allLoaded = computed(() => displayCount.value >= filteredSaints.value.length)

watch(searchTerm, () => {
  displayCount.value = PAGE_SIZE
})

const loadMore = async (event) => {
  displayCount.value += PAGE_SIZE
  await event.target.complete()
}

const showSaintDetail = (item) => {
  ionRouter.push({
    name: "Saint",
    params: {
      id: item.vies_id,
    },
  })
}

onIonViewWillEnter(() => {
  if (!hasFetched.value) {
    fetchSaints()
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
