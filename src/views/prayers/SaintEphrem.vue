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
        <p class="auteur">Saint Éphrem le Syrien</p>

        <div class="priere-texte">
          <p>
            Seigneur et Maître de ma vie,<br />
            Ne m'abandonne pas à l'esprit de paresse, de découragement,<br />
            de domination et de vaines paroles.
          </p>

          <p>
            Mais fais-moi la grâce, à moi ton serviteur,<br />
            de l'esprit d'intégrité, d'humilité, de patience et d'amour.
          </p>

          <p>
            Oui, Seigneur Roi,<br />
            Accorde-moi de voir mes fautes<br />
            Et de ne pas condamner mon frère,<br />
            Car tu es béni dans les siècles des siècles. Amen.
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
  IonContent,
} from "@ionic/vue";
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
