<template>
  <ion-page>
    <ion-header>
      <ion-toolbar color="primary">
        <ion-buttons slot="start">
          <ion-menu-button></ion-menu-button>
        </ion-buttons>
        <ion-title>Calendrier</ion-title>
      </ion-toolbar>
    </ion-header>

    <ion-content class="ion-padding">
      <ion-list>
        <ion-item>
          <ion-label>
            <h2>{{ selectedDate ? formattedDate : "Choisir une date" }}</h2>
            <p v-if="!selectedDate">Cliquez pour sélectionner</p>
          </ion-label>
          <ion-datetime-button datetime="datetime" slot="end"></ion-datetime-button>
        </ion-item>
      </ion-list>

      <ion-modal :keep-contents-mounted="true" ref="modal">
        <ion-datetime
          id="datetime"
          presentation="date"
          @ionChange="handleDateChange"
        ></ion-datetime>
      </ion-modal>
    </ion-content>
  </ion-page>
</template>

<script setup>
import {
  IonPage,
  IonHeader,
  IonToolbar,
  IonButtons,
  IonMenuButton,
  IonTitle,
  IonContent,
  IonDatetime,
  IonDatetimeButton,
  IonModal,
  IonList,
  IonItem,
  IonLabel,
} from "@ionic/vue";
import { ref, computed } from "vue";

const modal = ref();
const selectedDate = ref(null);

const formattedDate = computed(() => {
  if (!selectedDate.value) return "";
  const date = new Date(selectedDate.value);
  return date.toLocaleDateString("fr-FR", {
    day: "2-digit",
    month: "long",
    year: "numeric",
  });
});

const handleDateChange = (event) => {
  selectedDate.value = event.detail.value;
  modal.value.$el.dismiss();
};
</script>
