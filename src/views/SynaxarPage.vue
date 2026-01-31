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
      
      <!-- Barre de recherche -->
      <ion-searchbar 
        v-model="searchTerm"
        placeholder="Recherche"
        @ionInput="handleSearch"
      ></ion-searchbar>

      <!-- Message de chargement -->
      <div v-if="loading" class="ion-text-center ion-margin">
        <ion-spinner></ion-spinner>
        <p>Chargement des saints...</p>
      </div>

      <!-- Message d'erreur -->
      <ion-card v-if="error" color="danger">
        <ion-card-content>
          {{ error }}
        </ion-card-content>
      </ion-card>

      <!-- Liste des saints -->
      <ion-list v-if="!loading && !error">
        <ion-item 
          v-for="(item, index) in filteredSaints" 
          :key="index"
          button
          @click="showSaintDetail(item)"
        >
          <ion-label>
            <h2>{{ item.saint }}</h2>
          </ion-label>
        </ion-item>
      </ion-list>

      <!-- Message si aucun résultat -->
      <div v-if="!loading && filteredSaints.length === 0" class="ion-text-center ion-margin">
        <p>Aucun résultat</p>
      </div>
    </ion-content>
  </ion-page>
</template>

<script setup>
import { ref, onMounted, computed } from 'vue';
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
  IonCardContent
} from '@ionic/vue';

const saints = ref([]);
const loading = ref(false);
const error = ref(null);
const searchTerm = ref('');

// Récupération des données
const fetchSaints = async () => {
  loading.value = true;
  error.value = null;
  
  try {
    const response = await fetch('https://ecof-api-production.up.railway.app/api/synaxar');
    
    if (!response.ok) {
      throw new Error('Erreur lors du chargement des données');
    }
    
    const data = await response.json();
    saints.value = data;
  } catch (err) {
    error.value = err.message;
    console.error('Erreur:', err);
  } finally {
    loading.value = false;
  }
};

// Filtrage des saints
const filteredSaints = computed(() => {
  if (!searchTerm.value) {
    return saints.value;
  }
  
  return saints.value.filter(item => 
    item.saint.toLowerCase().includes(searchTerm.value.toLowerCase())
  );
});

// Gestion de la recherche
const handleSearch = (event) => {
  searchTerm.value = event.target.value;
};

// Afficher les détails d'un saint (à personnaliser)
const showSaintDetail = (item) => {
  console.log('Saint sélectionné:', item);
  // Vous pouvez implémenter une modal ou une navigation ici
};

// Chargement au montage du composant
onMounted(() => {
  fetchSaints();
});
</script>

<style scoped>
ion-list {
  margin-top: 1rem;
}

ion-item {
  --padding-start: 16px;
}

h1 {
  margin-bottom: 1rem;
}
</style>