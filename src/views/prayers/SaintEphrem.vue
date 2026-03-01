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
import { IonPage, IonHeader, IonToolbar, IonButtons, IonBackButton, IonTitle, IonContent, IonAccordionGroup, IonAccordion, IonItem, IonLabel } from "@ionic/vue"
</script>

<style scoped>
.priere-container {
  max-width: 600px;
  margin: 0 auto;
}

h1 {
  font-size: 1.8rem;
  margin-bottom: 1rem;
  color: var(--ion-color-primary);
}

.about-accordion {
  margin-bottom: 2rem;
}

.about-content {
  padding: 0.75rem 1rem;
  background: var(--ion-color-light);
}

.about-content p {
  font-size: 0.88rem;
  font-style: italic;
  color: var(--ion-color-medium);
  line-height: 1.6;
  margin-bottom: 0.5rem;
}

.priere-texte {
  font-size: 1.1rem;
  line-height: 1.8;
}

.priere-texte p {
  margin-bottom: 1.5rem;
}
</style>
