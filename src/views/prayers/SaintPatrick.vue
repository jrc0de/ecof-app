<template>
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

        <ion-accordion-group class="about-accordion">
          <ion-accordion>
            <ion-item slot="header" color="primary">
              <ion-label>À propos</ion-label>
            </ion-item>
            <div slot="content" class="about-content">
              <p>C'est saint Patrick qui a composé cet hymne vers 450.</p>
              <p>
                «&nbsp;Tout homme qui le chantera chaque jour en méditant pieusement en Dieu, les
                démons ne pourront se maintenir devant sa face. Cette prière lui sera une défense
                contre tout poison et envie, une sauvegarde contre la mort subite. Elle sera une
                cuirasse pour son âme après la mort.
              </p>
              <p>
                Patrick la chanta quand des embûches étaient dressées contre lui par Loegaire pour
                l'empêcher d'aller semer la foi à Tara, de sorte que ceux qui les attendaient
                crurent voir des daims avec, derrière eux, un faon.
              </p>
              <p>Et on l'appelle : «&nbsp;Faed Fiada&nbsp;», «&nbsp;Cri du Daim&nbsp;».</p>
              <p>
                Voici la cuirasse de la foi, pour protéger le corps et l'âme contre les démons, les
                hommes et les vices.&nbsp;»
              </p>
            </div>
          </ion-accordion>
        </ion-accordion-group>

        <div class="priere-texte">
          <p>
            Je me lève aujourd'hui,<br />
            Par une force puissante&nbsp;:<br />
            L'invocation à de la Trinité&nbsp;!<br />
            La croyance en la Trinité&nbsp;!<br />
            La confession de l'Unité,<br />
            Du Créateur du monde.
          </p>
          <p>
            Je me léve aujourd'hui,<br />
            Par la force de la naissance du Christ et de Son baptême,<br />
            Par la force de Sa crucifixion et de Sa mise au tombeau,<br />
            Par la force de Sa résurrection et de Son ascension,<br />
            Par la force de Sa venue au jour du jugement.
          </p>
          <p>
            Je me léve aujourd'hui,<br />
            Par la force des ordres des chérubins,<br />
            Dans l'obéissance des anges,<br />
            Dans le service des archanges,<br />
            Dans l'espoir de la résurrection,<br />
            Dans les prières des patriarches,<br />
            Dans les prédictions des prophètes,<br />
            Dans les prédications des apôtres,<br />
            Dans la fidélité des confesseurs,<br />
            Dans l'innocence des vierges saintes,<br />
            Dans les actions des hommes justes.
          </p>
          <p>
            Je me léve aujourd'hui,<br />
            Par la force du ciel,<br />
            Lumière du soleil,<br />
            Eclat de la lune,<br />
            Splendeur du feu,<br />
            Vitesse de l'éclair,<br />
            Rapidité du vent,<br />
            Profondeur de la mer,<br />
            Stabilité de la terre,<br />
            Solidité de la pierre.
          </p>
          <p>
            Je me lève aujourd'hui,<br />
            Par la force de Dieu pour me guider,<br />
            Puissance de Dieu pour me soutenir,<br />
            Intelligence de Dieu pour me conduire,<br />
            Oeil de Dieu pour regarder devant moi,<br />
            Oreille de Dieu pour m'entendre,<br />
            Parole de Dieu pour parler pour moi,<br />
            Main de Dieu pour me garder,<br />
            Chemin de Dieu pour me précéder,<br />
            Bouclier de Dieu pour me protéger,
          </p>
          <p>
            Armée de Dieu pour me sauver,<br />
            Des filets des démons,<br />
            Des séductions des vices,<br />
            Des inclinations de la nature,<br />
            De tous les hommes qui me veulent du mal,<br />
            De loin ou de près,<br />
            Dans la solitude ou la multitude.<br />
          </p>
          <p>
            J'appelle aujourd'hui toutes ces forces<br />
            Entre moi et le mal.<br />
            Contre toute force cruelle et impitoyable<br />
            Qui attaque mon corps ou mon âme.<br />
            Contre les incantations des faux prophètes,<br />
            Contre les lois noires du paganisme,<br />
            Contre les lois fausses des hérétiques,<br />
            Contre la nuisance de l'idolâtrie,<br />
            Contre les charmes des sorciers,<br />
            Contre toute science qui souille le corps et l'âme de l'homme,<br />
            Que le Christ me protège dès aujourd'hui<br />
            Contre le poison, contre le feu,<br />
            Contre la noyade, contre la blessure,<br />
            Et qu'il me vienne une foule de bienfaits.
          </p>
          <p>
            Le Christ avec moi,<br />
            Le Christ devant moi,<br />
            Le Christ derrière moi,<br />
            Le Christ en moi,<br />
            Le Christ au-dessus de moi,<br />
            Le Christ au dessous de moi,<br />
            Le Christ à ma droite,<br />
            Le Christ à ma gauche,<br />
            Le Christ en largeur,<br />
            Le Christ en longueur,<br />
            Le Christ en hauteur,<br />
            Le Christ dans le coeur de tout homme qui pense à moi&nbsp;!<br />
            Le Christ dans tout oeil qui me voit&nbsp;!<br />
            Le Christ dans toute oreille qui m'écoute&nbsp;!
          </p>
          <p>
            Je me lève aujourd'hui,<br />
            Par une force puissante&nbsp;:<br />
            L'invocation à la Trinité&nbsp;!<br />
            La croyance à la Trinité&nbsp;!<br />
            La confession de l'Unité<br />
            Du Créateur du monde.
          </p>
          <p>
            Au Seigneur est le salut&nbsp;!<br />
            Au Christ est le salut&nbsp;!<br />
            Au Seigneur est le salut&nbsp;!<br />
            Que Ton salut, Seigneur, soit toujours avec nous&nbsp;!<br />
            Amen&nbsp;!
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
  IonAccordionGroup,
  IonAccordion,
  IonItem,
  IonLabel,
} from "@ionic/vue";
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
