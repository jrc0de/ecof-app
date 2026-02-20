<template>
  <ion-page>
    <ion-header>
      <ion-toolbar color="primary">
        <ion-buttons slot="start">
          <ion-menu-button></ion-menu-button>
        </ion-buttons>
        <ion-title>Paroisses</ion-title>
      </ion-toolbar>
    </ion-header>

    <ion-content class="ion-padding">
      <ion-list-header>
        <ion-label>
          <h2>14 - Calvados</h2>
        </ion-label>
      </ion-list-header>
      <ion-list>
        <ion-item button @click="showEvents('lisieux')">
          <ion-thumbnail slot="start">
            <img :src="lisieuxImg" alt="Lisieux" />
          </ion-thumbnail>
          <ion-label>
            <h2>Paroisse Notre-Dame en Normandie</h2>
            <p>Le Mesnil-Germain</p>
          </ion-label>
          <ion-icon :icon="chevronForward" slot="end"></ion-icon>
        </ion-item>
      </ion-list>

      <ion-list-header>
        <ion-label>
          <h2>33 - Gironde</h2>
        </ion-label>
      </ion-list-header>
      <ion-list>
        <ion-item button @click="showEvents('bordeaux')">
          <ion-thumbnail slot="start">
            <img :src="bordeauxImg" alt="Bordeaux" />
          </ion-thumbnail>
          <ion-label>
            <h2>Paroisse de l'Exaltation de la Sainte Croix et Saint-Paulin de Nole</h2>
            <p>Bordeaux</p>
          </ion-label>
          <ion-icon :icon="chevronForward" slot="end"></ion-icon>
        </ion-item>
      </ion-list>

      <ion-list-header>
        <ion-label>
          <h2>34 - Hérault</h2>
        </ion-label>
      </ion-list-header>
      <ion-list>
        <ion-item button @click="showEvents('montpellier')">
          <ion-thumbnail slot="start">
            <img :src="montpellierImg" alt="Montpellier" />
          </ion-thumbnail>
          <ion-label>
            <h2>Paroisse de la Théophanie</h2>
            <p>Montpellier</p>
          </ion-label>
          <ion-icon :icon="chevronForward" slot="end"></ion-icon>
        </ion-item>
      </ion-list>

      <ion-list-header>
        <ion-label>
          <h2>37 - Indre-et-Loire</h2>
        </ion-label>
      </ion-list-header>
      <ion-list>
        <ion-item button @click="showEvents('amboise')">
          <ion-thumbnail slot="start">
            <img :src="amboiseImg" alt="Amboise" />
          </ion-thumbnail>
          <ion-label>
            <h2>Paroisse du Moutier Saint-Martin</h2>
            <p>Amboise</p>
          </ion-label>
          <ion-icon :icon="chevronForward" slot="end"></ion-icon>
        </ion-item>
      </ion-list>

      <ion-list-header>
        <ion-label>
          <h2>38 - Isère</h2>
        </ion-label>
      </ion-list-header>
      <ion-list>
        <ion-item button @click="showEvents('grenoble')">
          <ion-thumbnail slot="start">
            <img :src="grenobleImg" alt="Grenoble" />
          </ion-thumbnail>
          <ion-label>
            <h2>Paroisse de la Résurrection</h2>
            <p>Grenoble</p>
          </ion-label>
          <ion-icon :icon="chevronForward" slot="end"></ion-icon>
        </ion-item>
      </ion-list>

      <ion-list-header>
        <ion-label>
          <h2>44 - Loire-Atlantique</h2>
        </ion-label>
      </ion-list-header>
      <ion-list>
        <ion-item button @click="showEvents('nantes')">
          <ion-thumbnail slot="start">
            <img :src="nantesImg" alt="Nantes" />
          </ion-thumbnail>
          <ion-label>
            <h2>Paroisse de la Trinité et Saint-Clair</h2>
            <p>Nantes</p>
          </ion-label>
          <ion-icon :icon="chevronForward" slot="end"></ion-icon>
        </ion-item>
      </ion-list>

      <ion-list-header>
        <ion-label>
          <h2>45 - Loiret</h2>
        </ion-label>
      </ion-list-header>
      <ion-list>
        <ion-item button @click="showEvents('orleans')">
          <ion-thumbnail slot="start">
            <img :src="orleansImg" alt="Orleans" />
          </ion-thumbnail>
          <ion-label>
            <h2>Paroisse Saint-Avit</h2>
            <p>Orléans</p>
          </ion-label>
          <ion-icon :icon="chevronForward" slot="end"></ion-icon>
        </ion-item>
        <ion-item button @click="showEvents('stloup')">
          <ion-thumbnail slot="start">
            <img :src="stloupImg" alt="StLoup" />
          </ion-thumbnail>
          <ion-label>
            <h2>Chapelle Saint-Loup de Sens et Sainte-Radegonde</h2>
            <p>Saint-Loup-des-Vignes</p>
          </ion-label>
          <ion-icon :icon="chevronForward" slot="end"></ion-icon>
        </ion-item>
      </ion-list>

      <ion-list-header>
        <ion-label>
          <h2>49 - Maine-et-Loire</h2>
        </ion-label>
      </ion-list-header>
      <ion-list>
        <ion-item button @click="showEvents('angers')">
          <ion-thumbnail slot="start">
            <img :src="angersImg" alt="Angers" />
          </ion-thumbnail>
          <ion-label>
            <h2>Paroisse Saint-Martin d'Anjou</h2>
            <p>Angers</p>
          </ion-label>
          <ion-icon :icon="chevronForward" slot="end"></ion-icon>
        </ion-item>
      </ion-list>

      <ion-list-header>
        <ion-label>
          <h2>56 - Morbihan</h2>
        </ion-label>
      </ion-list-header>
      <ion-list>
        <ion-item button @click="showEvents('vannes')">
          <ion-thumbnail slot="start">
            <img :src="vannesImg" alt="Vannes" />
          </ion-thumbnail>
          <ion-label>
            <h2>Chapelle Saint-Martin du Moustoir</h2>
            <p>Vannes</p>
          </ion-label>
          <ion-icon :icon="chevronForward" slot="end"></ion-icon>
        </ion-item>
      </ion-list>

      <ion-list-header>
        <ion-label>
          <h2>69 - Rhône</h2>
        </ion-label>
      </ion-list-header>
      <ion-list>
        <ion-item button @click="showEvents('lyon')">
          <ion-thumbnail slot="start">
            <img :src="lyonImg" alt="Lyon" />
          </ion-thumbnail>
          <ion-label>
            <h2>Paroisse Sainte-Marie et Saint-Jean</h2>
            <p>Lyon</p>
          </ion-label>
          <ion-icon :icon="chevronForward" slot="end"></ion-icon>
        </ion-item>
      </ion-list>

      <ion-list-header>
        <ion-label>
          <h2>75 - Paris</h2>
        </ion-label>
      </ion-list-header>
      <ion-list>
        <ion-item button @click="showEvents('paris')">
          <ion-thumbnail slot="start">
            <img :src="parisImg" alt="Paris" />
          </ion-thumbnail>
          <ion-label>
            <h2>Cathédrale Saint Irénée</h2>
            <p>Paris</p>
          </ion-label>
          <ion-icon :icon="chevronForward" slot="end"></ion-icon>
        </ion-item>
      </ion-list>

      <ion-list-header>
        <ion-label>
          <h2>86 - Vienne</h2>
        </ion-label>
      </ion-list-header>
      <ion-list>
        <ion-item button @click="showEvents('poitiers')">
          <ion-thumbnail slot="start">
            <img :src="poitiersImg" alt="Poitiers" />
          </ion-thumbnail>
          <ion-label>
            <h2>Paroisse Saint-Savin et Saint-Cyprien</h2>
            <p>Poitiers</p>
          </ion-label>
          <ion-icon :icon="chevronForward" slot="end"></ion-icon>
        </ion-item>
      </ion-list>
    </ion-content>
  </ion-page>
</template>

<script setup>
import { useRouter } from "vue-router";
import {
  IonPage,
  IonHeader,
  IonToolbar,
  IonButtons,
  IonMenuButton,
  IonTitle,
  IonContent,
  IonList,
  IonListHeader,
  IonItem,
  IonThumbnail,
  IonLabel,
  IonIcon,
} from "@ionic/vue";
import { chevronForward } from "ionicons/icons";

import bordeauxImg from "@/assets/img/parishes/Bordeaux.webp";
import montpellierImg from "@/assets/img/parishes/montpellier.png";
import amboiseImg from "@/assets/img/parishes/amboise.png";
import grenobleImg from "@/assets/img/parishes/Grenoble.webp";
import nantesImg from "@/assets/img/parishes/Nantes.webp";
import orleansImg from "@/assets/img/parishes/orleans.png";
import stloupImg from "@/assets/img/parishes/StLoup.webp";
import angersImg from "@/assets/img/parishes/Angers.webp";
import vannesImg from "@/assets/img/parishes/Vannes.webp";
import lyonImg from "@/assets/img/parishes/lyon.png";
import parisImg from "@/assets/img/parishes/paris.png";
import poitiersImg from "@/assets/img/parishes/poitiers.png";
import lisieuxImg from "@/assets/img/parishes/lisieux.png";

const router = useRouter();

const showEvents = (paroisse_id) => {
  router.push(`/paroisse/${paroisse_id}/horaires`);
};
</script>

<style scoped>
ion-list-header {
  padding-top: 20px;
}

ion-thumbnail {
  --size: 80px;
  --border-radius: 5px;
}

ion-thumbnail img {
  max-height: 100%;
  max-width: 100%;
  object-fit: contain;
}

ion-list-header h2 {
  font-weight: 600;
  color: var(--ion-color-primary);
}
</style>
