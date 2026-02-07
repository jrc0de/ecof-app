<template>
  <ion-page>
    <ion-header>
      <ion-toolbar color="primary">
        <ion-buttons slot="start">
          <ion-back-button default-href="/synaxar"></ion-back-button>
        </ion-buttons>
        <ion-title>{{ saintData?.saint || "Saint" }}</ion-title>
      </ion-toolbar>
    </ion-header>

    <ion-content>
      <!-- Loading indicator -->
      <div v-if="loading" class="loading-container">
        <ion-spinner></ion-spinner>
      </div>

      <!-- Segment (tabs horizontaux) -->
      <ion-segment v-else v-model="selectedTab" @ionChange="segmentChanged">
        <ion-segment-button value="vie_b" :disabled="!saintData?.vie_b">
          <ion-icon :src="fileTextIcon"></ion-icon>
          <ion-label>Vie brève</ion-label>
        </ion-segment-button>

        <ion-segment-button value="vita_long" :disabled="!saintData?.vita_long">
          <ion-icon :src="bookAIcon"></ion-icon>
          <ion-label>Vie synaxaire</ion-label>
        </ion-segment-button>

        <ion-segment-button value="vita_liturgy" :disabled="!saintData?.vita_liturgy">
          <ion-icon :src="scrollTextIcon"></ion-icon>
          <ion-label>Vie liturgique</ion-label>
        </ion-segment-button>
      </ion-segment>

      <!-- Contenu dynamique -->
      <div class="ion-padding">
        <!-- Vie brève -->
        <div v-if="selectedTab === 'vie_b'">
          <div v-if="saintData?.vie_b" class="example-content">
            {{ saintData.vie_b }}
          </div>
          <div v-else class="no-content">
            <ion-icon :src="fileTextIcon" size="large"></ion-icon>
            <p>Aucune vie brève disponible</p>
          </div>
        </div>

        <!-- Vie synaxaire -->
        <div v-if="selectedTab === 'vita_long'">
          <div v-if="saintData?.vita_long" class="example-content">
            {{ saintData.vita_long }}
          </div>
          <div v-else class="no-content">
            <ion-icon :src="bookAIcon" size="large"></ion-icon>
            <p>Aucune vie synaxaire disponible</p>
          </div>
        </div>

        <!-- Vie liturgique -->
        <div v-if="selectedTab === 'vita_liturgy'">
          <div v-if="saintData?.vita_liturgy" class="example-content">
            {{ saintData.vita_liturgy }}
          </div>
          <div v-else class="no-content">
            <ion-icon :src="scrollTextIcon" size="large"></ion-icon>
            <p>Aucune vie liturgique disponible</p>
          </div>
        </div>
      </div>
    </ion-content>
  </ion-page>
</template>

<script setup>
import { ref, onMounted, computed } from "vue";
import { useRoute } from "vue-router";
import {
  IonContent,
  IonHeader,
  IonPage,
  IonTitle,
  IonToolbar,
  IonButtons,
  IonBackButton,
  IonIcon,
  IonSpinner,
  IonSegment,
  IonSegmentButton,
  IonLabel,
} from "@ionic/vue";

import fileTextIcon from "@/assets/icons/file-text.svg";
import bookAIcon from "@/assets/icons/book-a.svg";
import scrollTextIcon from "@/assets/icons/scroll-text.svg";

const route = useRoute();
const saintData = ref(null);
const loading = ref(true);
const selectedTab = ref("vie_b");

const fetchSaintData = async () => {
  loading.value = true;
  try {
    const saintId = route.params.id;
    const response = await fetch(`https://ecof-api-production.up.railway.app/api/vita/${saintId}`);
    const data = await response.json();
    saintData.value = data;

    // Sélectionner automatiquement le premier onglet disponible
    if (data.vie_b) {
      selectedTab.value = "vie_b";
    } else if (data.vita_long) {
      selectedTab.value = "vita_long";
    } else if (data.vita_liturgy) {
      selectedTab.value = "vita_liturgy";
    }
  } catch (error) {
    console.error("Erreur lors du chargement des données du saint:", error);
  } finally {
    loading.value = false;
  }
};

const segmentChanged = (event) => {
  selectedTab.value = event.detail.value;
};

onMounted(() => {
  fetchSaintData();
});
</script>

<style scoped>
.example-content {
  line-height: 1.8;
  text-align: justify;
  padding-top: 1rem;
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
  padding: 3rem 1rem;
  color: var(--ion-color-medium);
  text-align: center;
}

.no-content ion-icon {
  margin-bottom: 1rem;
  opacity: 0.5;
}

.no-content p {
  margin: 0;
  font-size: 0.95rem;
}

ion-segment {
  margin: 1rem;
}

ion-segment-button {
  min-height: 60px;
}

ion-segment-button ion-icon {
  margin-bottom: 4px;
}
</style>
