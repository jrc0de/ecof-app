<template>
  <ion-page>
    <ion-header>
      <ion-toolbar color="primary">
        <ion-buttons slot="start">
          <ion-back-button text="" default-href="/synaxar" />
        </ion-buttons>
        <ion-title>{{ saintData?.saint || saintData?.prefixe }}</ion-title>
      </ion-toolbar>
    </ion-header>

    <ion-content>
      <div v-if="loading" class="loading-container">
        <ion-spinner></ion-spinner>
      </div>

      <template v-else>
        <ion-segment v-model="selectedTab">
          <ion-segment-button v-if="saintData?.vie_b" value="vie_b">
            <ion-icon :src="fileTextIcon"></ion-icon>
            <ion-label>Vie brève</ion-label>
          </ion-segment-button>
          <ion-segment-button v-if="saintData?.vita_long" value="vita_long">
            <ion-icon :src="bookAIcon"></ion-icon>
            <ion-label>Synaxaire</ion-label>
          </ion-segment-button>
          <ion-segment-button v-if="saintData?.vita_liturgy" value="vita_liturgy">
            <ion-icon :src="scrollTextIcon"></ion-icon>
            <ion-label>Vie liturgique</ion-label>
          </ion-segment-button>
        </ion-segment>

        <div class="ion-padding">
          <!-- Vie brève (markdown) -->
          <div v-if="selectedTab === 'vie_b'">
            <div v-if="saintData?.vie_b">
              <MarkdownSection :html="saintData.vie_b" />
              <div v-if="saintData?.img" class="saint-image-container">
                <img :src="saintData.img" :alt="`Icône de ${saintData.saint}`" class="saint-image" />
              </div>
            </div>
            <div v-else class="no-content">
              <ion-icon :src="fileTextIcon" size="large"></ion-icon>
              <p>Hagiographie non disponible</p>
            </div>
          </div>

          <!-- Vita long (HTML depuis serveur) -->
          <div v-else-if="selectedTab === 'vita_long'">
            <MarkdownSection :html="saintData.vita_long" />
          </div>

          <!-- Vita liturgy (HTML depuis serveur) -->
          <div v-else-if="selectedTab === 'vita_liturgy'">
            <MarkdownSection :html="saintData.vita_liturgy" />
          </div>
        </div>
      </template>
    </ion-content>
  </ion-page>
</template>

<script setup>
import { ref } from "vue"
import { useRoute } from "vue-router"
import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar, IonButtons, IonBackButton, IonIcon, IonSpinner, IonSegment, IonSegmentButton, IonLabel, onIonViewWillEnter } from "@ionic/vue"

import MarkdownSection from "@/components/MarkdownSection.vue"
import fileTextIcon from "@/assets/icons/file-text.svg"
import bookAIcon from "@/assets/icons/book-a.svg"
import scrollTextIcon from "@/assets/icons/scroll-text.svg"

const route = useRoute()
const saintData = ref(null)
const loading = ref(true)
const selectedTab = ref("vie_b")

const fetchSaintData = async () => {
  loading.value = true
  try {
    const saintId = route.params.id
    const response = await fetch(`https://ecof-api-production.up.railway.app/api/vita/${saintId}`)
    const data = await response.json()
    saintData.value = data

    if (data.vie_b) selectedTab.value = "vie_b"
    else if (data.vita_long) selectedTab.value = "vita_long"
    else if (data.vita_liturgy) selectedTab.value = "vita_liturgy"
  } catch (error) {
    console.error("Erreur lors du chargement des données du saint:", error)
  } finally {
    loading.value = false
  }
}

onIonViewWillEnter(fetchSaintData)
</script>

<style scoped>
.saint-image-container {
  margin-top: 1.5rem;
  display: flex;
  justify-content: center;
}

.saint-image {
  max-width: 300px;
  width: 100%;
  height: auto;
  border-radius: 8px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
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
  text-align: center;
}

.no-content ion-icon {
  font-size: 56px;
  margin-bottom: 1rem;
  opacity: 0.3;
  color: var(--ion-color-medium);
}

.no-content p {
  margin: 0;
  font-size: 0.95rem;
  color: var(--ion-color-medium);
}

@media (max-width: 768px) {
  .saint-image {
    max-width: 100%;
  }
}
</style>
