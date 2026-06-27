<template>
  <ion-page>
    <ion-header>
      <ion-toolbar color="primary">
        <ion-buttons slot="start">
          <ion-back-button text="" default-href="/prayers"></ion-back-button>
        </ion-buttons>
        <ion-title>Office des Heures</ion-title>
      </ion-toolbar>
    </ion-header>

    <ion-content>
      <div class="timeline">

        <div class="day-sep">
          <span class="day-sep-text">{{ labelJour1 }}</span>
        </div>

        <template v-for="slot in slots" :key="slot.debut">

          <div v-if="slot.sep" class="day-sep">
            <span class="day-sep-text">{{ labelJour2 }}</span>
          </div>

          <div class="scale">

            <div class="ruler">
              <div class="ruler-inner">
                <div
                  v-for="offset in [0, 1, 2]"
                  :key="offset"
                  class="r-tick"
                  :style="{ top: (offset * 36) + 'px' }"
                >
                  <span class="r-label" :class="{ major: offset === 0 }">
                    {{ (slot.debut + offset) % 24 }}h
                  </span>
                  <span class="r-dash" :class="offset === 0 ? 'major' : 'minor'"></span>
                </div>
              </div>
            </div>

            <div class="content-col">
              <div
                class="prayer-block"
                :class="{
                  active:   slot.debut === debutEnCours,
                  disabled: slot.disabled
                }"
                @click="!slot.disabled && $router.push(slot.route)"
              >
                <div class="prayer-inner">
                  <div class="prayer-titre">
                    <span v-if="slot.debut === debutEnCours" class="cur-dot" aria-label="En cours" />
                    {{ slot.titre }}
                  </div>
                  <div class="prayer-sous">{{ slot.sous }}</div>
                </div>
                <ion-icon
                  v-if="!slot.disabled"
                  :icon="chevronForward"
                  class="chevron-nav"
                  aria-hidden="true"
                />
              </div>
            </div>

          </div>
        </template>

      </div>
    </ion-content>
  </ion-page>
</template>

<script setup>
import { computed } from "vue"
import {
  IonPage, IonHeader, IonToolbar, IonButtons, IonBackButton,
  IonTitle, IonContent, IonIcon,
} from "@ionic/vue"
import { chevronForward } from "ionicons/icons"

const JOURS = ["dimanche","lundi","mardi","mercredi","jeudi","vendredi","samedi"]
const MOIS  = ["janvier","février","mars","avril","mai","juin","juillet",
               "août","septembre","octobre","novembre","décembre"]

function fmtDate(d) {
  return `${JOURS[d.getDay()]} ${d.getDate()} ${MOIS[d.getMonth()]}`
}

const maintenant = new Date()
const demain     = new Date(maintenant)
demain.setDate(demain.getDate() + 1)

const labelJour1 = fmtDate(maintenant)
const labelJour2 = fmtDate(demain)

const slots = [
  { debut: 18, titre: "Vêpres",    sous: "Au coucher du soleil",             route: "/prayers/hours/vespers",  disabled: true,  sep: false },
  { debut: 21, titre: "Complies",  sous: "3ème heure de la nuit",            route: "/prayers/hours/compline", disabled: false, sep: false },
  { debut:  0, titre: "Nocturnes", sous: "6ème heure de la nuit",            route: "/prayers/hours/vigils",   disabled: false, sep: true  },
  { debut:  3, titre: "Laudes",    sous: "Lever du soleil, 9ème heure",      route: "/prayers/hours/lauds",    disabled: false, sep: false },
  { debut:  6, titre: "Prime",     sous: "1ère heure du jour",               route: "/prayers/hours/prime",    disabled: false, sep: false },
  { debut:  9, titre: "Tierce",    sous: "3ème heure du jour",               route: "/prayers/hours/tierce",   disabled: false, sep: false },
  { debut: 12, titre: "Sexte",     sous: "6ème heure du jour, midi",         route: "/prayers/hours/sext",     disabled: false, sep: false },
  { debut: 15, titre: "None",      sous: "9ème heure du jour",               route: "/prayers/hours/none",     disabled: false, sep: false },
]

const debutEnCours = computed(() => {
  const h = new Date().getHours()
  return slots.find(s => h >= s.debut && h < s.debut + 3)?.debut ?? null
})
</script>

<style scoped>
.timeline {
  padding-bottom: env(safe-area-inset-bottom);
}

/* ── Séparateur de jour ── */
.day-sep {
  padding: 7px 14px 7px 14px;
  background: var(--ion-color-step-50);
  border-top: 2px solid var(--ion-color-primary);
  border-bottom: 0.5px solid var(--ion-color-step-150);
}

.day-sep:first-child {
  border-top: none;
}

.day-sep-text {
  font-size: 12px;
  font-weight: 600;
  color: var(--ion-color-primary);
  letter-spacing: 0.05em;
  text-transform: uppercase;
}

/* ── Ligne scale ── */
.scale {
  display: flex;
}

/* ── Réglette ── */
.ruler {
  width: 52px;
  flex-shrink: 0;
  position: relative;
}

.ruler-inner {
  position: relative;
  height: 108px;
}

.r-tick {
  position: absolute;
  right: 0;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: flex-end;
  gap: 4px;
  /* aligner le centre du tick sur la graduation, pas en dessous */
  transform: translateY(-50%);
}

.r-label {
  font-size: 11px;
  font-variant-numeric: tabular-nums;
  color: var(--ion-color-medium);
  line-height: 1;
}

.r-label.major {
  font-size: 12px;
  font-weight: 500;
  color: var(--ion-color-dark);
}

.r-dash {
  flex-shrink: 0;
  height: 1.5px;
  border-radius: 1px;
  background: var(--ion-color-step-300);
}
.r-dash.major { width: 10px; background: var(--ion-color-step-500); }
.r-dash.minor { width: 6px; }

/* ── Contenu ── */
.content-col {
  flex: 1;
  border-left: 1.5px solid var(--ion-color-step-200);
}

.prayer-block {
  height: 108px;
  border-bottom: 0.5px solid var(--ion-color-step-100);
  display: flex;
  /* texte ancré en haut, aligné sur la graduation de début */
  align-items: flex-start;
  padding-top: 10px;
  cursor: pointer;
}

.prayer-block.active {
  background: color-mix(in srgb, var(--ion-color-primary) 8%, transparent);
}

.prayer-block.disabled {
  opacity: 0.38;
  cursor: default;
}

.prayer-inner {
  flex: 1;
  padding: 0 8px 0 14px;
  display: flex;
  flex-direction: column;
  gap: 5px;
}

.prayer-titre {
  font-size: 15px;
  font-weight: 500;
  color: var(--ion-text-color);
  display: flex;
  align-items: center;
  gap: 7px;
}

.cur-dot {
  width: 7px;
  height: 7px;
  border-radius: 50%;
  background: var(--ion-color-primary);
  flex-shrink: 0;
}

.prayer-sous {
  font-size: 12px;
  color: var(--ion-color-medium);
}

.chevron-nav {
  font-size: 16px;
  color: var(--ion-color-medium);
  margin-right: 12px;
  flex-shrink: 0;
}
</style>