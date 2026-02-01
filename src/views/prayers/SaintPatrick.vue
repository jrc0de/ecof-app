w<template>
  <ion-page>
    <ion-header>
      <ion-toolbar color="primary">
        <ion-buttons slot="start">
          <ion-back-button default-href="/prayers"></ion-back-button>
        </ion-buttons>
        <ion-title>Prière de Saint Patrick</ion-title>
      </ion-toolbar>
    </ion-header>
    
    <ion-content class="ion-padding">
      <div class="priere-container">
        <h1>Prière de Saint Patrick</h1>
        <p class="auteur">Saint Patrick d'Irlande</p>
        
        <div class="priere-texte">
          <p>
            Que le Christ soit avec moi, le Christ devant moi,<br>
            Le Christ derrière moi, le Christ en moi,<br>
            Le Christ au-dessous de moi, le Christ au-dessus de moi,<br>
            Le Christ à ma droite, le Christ à ma gauche.
          </p>
          
          <p>
            Le Christ en largeur, le Christ en longueur, le Christ en hauteur,<br>
            Le Christ dans le cœur de tout homme qui pense à moi,<br>
            Le Christ dans la bouche de tout homme qui parle de moi,<br>
            Le Christ dans tout œil qui me voit,<br>
            Le Christ dans toute oreille qui m'écoute. Amen.
          </p>
        </div>
      </div>
    </ion-content>
  </ion-page>
</template>

<script setup>
import { 
  IonPage, 
  IonHeader, 
  IonToolbar, 
  IonButtons, 
  IonBackButton,
  IonTitle, 
  IonContent
} from '@ionic/vue';
</script>

<style scoped>
.priere-container {
  max-width: 600px;
  margin: 0 auto;
}

h1 {
  font-size: 1.8rem;
  margin-bottom: 0.5rem;
  color: var(--ion-color-primary);
}

.auteur {
  font-style: italic;
  color: var(--ion-color-medium);
  margin-bottom: 2rem;
}

.priere-texte {
  font-size: 1.1rem;
  line-height: 1.8;
}

.priere-texte p {
  margin-bottom: 1.5rem;
}
</style>