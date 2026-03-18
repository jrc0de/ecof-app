<template>
  <ion-page>
    <ion-header>
      <ion-toolbar color="primary">
        <ion-buttons slot="start">
          <ion-back-button default-href="/prayers"></ion-back-button>
        </ion-buttons>
        <ion-title>Prière de Saint Éphrem</ion-title>
      </ion-toolbar>
    </ion-header>

    <ion-content class="ion-padding">
      <div class="priere-container">
        <h1>Prière de Saint Éphrem</h1>
        <div class="priere-texte">
          <p>Seigneur et Maître de ma vie, l'esprit d'oisiveté, de découragement, de domination et de parole facile, éloigne de moi.</p>
          <p>L'esprit de pureté, d'humilité, de patience et de charité, donne à Ton serviteur.</p>
          <p>Oui, Seigneur et Roi, donne-moi de voir mes fautes et de ne pas juger mon frère, car Tu es béni dans les siècles des siècles. Amen.</p>
        </div>
      </div>
    </ion-content>
  </ion-page>
</template>

<script setup>
import { IonPage, IonHeader, IonToolbar, IonButtons, IonBackButton, IonTitle, IonContent } from "@ionic/vue"
</script>

<style scoped>
.priere-container {
  max-width: 600px;
  margin: 0 auto;
}

h1 {
  font-size: 1.3rem;
  font-weight: 600;
  margin-bottom: 1.5rem;
  color: var(--ion-color-primary);
}

.priere-texte {
  line-height: 1.8;
  text-align: left;
}

.priere-texte p {
  margin-bottom: 1.5rem;
}
</style>
