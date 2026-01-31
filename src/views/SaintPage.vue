<template>
  <ion-tabs>
    <ion-tab tab="saints">
      <ion-page id="saints-page">
        <ion-header>
          <ion-toolbar color="primary">
            <ion-buttons slot="start">
              <ion-menu-button></ion-menu-button>
            </ion-buttons>
            <ion-title>Vie brève</ion-title>
          </ion-toolbar>
        </ion-header>
        <ion-content class="ion-padding">
          <div class="example-content">Contenu de la vie</div>
        </ion-content>
      </ion-page>
    </ion-tab>

    <ion-tab tab="lectures">
      <ion-page id="lectures-page">
        <ion-header>
          <ion-toolbar color="primary">
            <ion-buttons slot="start">
              <ion-menu-button></ion-menu-button>
            </ion-buttons>
            <ion-title>Vie synaxaire</ion-title>
          </ion-toolbar>
        </ion-header>
        <ion-content class="ion-padding">
          <div class="example-content">Contenu de la vie</div>
        </ion-content>
      </ion-page>
    </ion-tab>

    <ion-tab tab="calendrier">
      <ion-page id="calendrier-page">
        <ion-header>
          <ion-toolbar color="primary">
            <ion-buttons slot="start">
              <ion-menu-button></ion-menu-button>
            </ion-buttons>
            <ion-title>Vie liturgique</ion-title>
          </ion-toolbar>
        </ion-header>
        <ion-content class="ion-padding">
          <div class="example-content">Contenu de la vie</div>
        </ion-content>
      </ion-page>
    </ion-tab>

    <ion-tab-bar slot="bottom">
      <ion-tab-button tab="saints">
        <ion-icon src="/src/assets/icons/file-text.svg"></ion-icon>
        Vie brève
      </ion-tab-button>

      <ion-tab-button tab="lectures">
        <ion-icon src="/src/assets/icons/book-a.svg"></ion-icon>
        Vie synaxaire
      </ion-tab-button>

      <ion-tab-button tab="calendrier">
        <ion-icon src="/src/assets/icons/scroll-text.svg"></ion-icon>
        Vie liturgique
      </ion-tab-button>
    </ion-tab-bar>
  </ion-tabs>
</template>

<script setup>
import {
  IonContent,
  IonHeader,
  IonPage,
  IonTab,
  IonTabs,
  IonTabBar,
  IonTabButton,
  IonTitle,
  IonToolbar,
  IonButtons,
  IonMenuButton,
  IonIcon
} from '@ionic/vue';
</script>