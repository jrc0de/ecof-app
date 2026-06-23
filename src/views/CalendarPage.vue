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

    <ion-content>
      <div class="ion-padding">
        <ion-item lines="none" class="date-item">
          <ion-icon :icon="calendarOutline" slot="start" color="medium"></ion-icon>

          <ion-label color="medium">
            {{ formattedDate }}
          </ion-label>

          <ion-datetime-button datetime="datetime" slot="end"></ion-datetime-button>
        </ion-item>

        <ion-modal :keep-contents-mounted="true" ref="modal">
          <ion-datetime
            id="datetime"
            presentation="date"
            :value="selectedDate"
            @ionChange="handleDateChange"
            locale="fr-FR"
            :first-day-of-week="1"
            :format-options="{
              date: {
                day: '2-digit',
                month: '2-digit',
                year: 'numeric',
              },
            }"
          ></ion-datetime>
        </ion-modal>

        <!-- LOADING -->
        <div v-if="loading" class="state-container">
          <ion-spinner color="primary"></ion-spinner>
          <p>Chargement...</p>
        </div>

        <!-- ERROR -->
        <div v-else-if="error" class="state-container">
          <p class="error-text">
            {{ error }}
          </p>
        </div>

        <!-- CONTENU -->
        <div v-else-if="calendarData">
          <!-- SYNAXAIRE -->
          <div class="section">
            <h3 class="section-title">Calendrier du jour</h3>

            <ion-list>
              <ion-item v-for="saint in calendarData.synaxar" :key="saint.id" :button="saint.id !== 0" :detail="saint.id !== 0" @click="saint.id !== 0 && navigateToSaint(saint.id)">
                <ion-label>
                  <h2>{{ saint.prefixe }} {{ saint.saint }}</h2>
                </ion-label>
              </ion-item>
            </ion-list>
          </div>

          <!-- LECTURES -->
          <div v-if="hasReadings" class="section">
            <h3 class="section-title">Lectures du jour</h3>

            <!-- TEMPORAL -->
            <div v-if="calendarData.readings.temporal.length > 0">
              <div v-for="block in calendarData.readings.temporal" :key="block.block_title">
                <h4 class="subsection-title">
                  {{ block.block_title }}
                </h4>

                <ion-list>
                  <ion-item v-for="reading in block.readings" :key="reading.id" button detail @click="navigateToReading(reading.id)">
                    <ion-label>
                      {{ reading.book_txt }}
                    </ion-label>
                  </ion-item>
                </ion-list>
              </div>
            </div>

            <!-- SANCTORAL -->
            <div v-if="calendarData.readings.sanctoral.length > 0">
              <div v-for="block in calendarData.readings.sanctoral" :key="block.block_title">
                <h4 class="subsection-title">
                  {{ block.block_title }}
                </h4>

                <ion-list>
                  <ion-item v-for="reading in block.readings" :key="reading.id" button detail @click="navigateToReading(reading.id)">
                    <ion-label>
                      {{ reading.book_txt }}
                    </ion-label>
                  </ion-item>
                </ion-list>
              </div>
            </div>
          </div>
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
  IonMenuButton,
  IonTitle,
  IonContent,
  IonDatetime,
  IonDatetimeButton,
  IonModal,
  IonList,
  IonItem,
  IonLabel,
  IonSpinner,
  IonIcon,
  onIonViewWillEnter,
} from "@ionic/vue"

import { calendarOutline } from "ionicons/icons"
import { ref, computed, watch } from "vue"
import { useIonRouter } from "@ionic/vue"

const ionRouter = useIonRouter()
const modal = ref()

const toLocalISO = () => {
  const d = new Date()
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}-${String(d.getDate()).padStart(2, "0")}T00:00:00`
}

const selectedDate = ref(toLocalISO())
const calendarData = ref(null)
const loading = ref(false)
const error = ref(null)
const loadedDate = ref(null)

const formattedDate = computed(() => {
  if (!selectedDate.value) return ""
  const str = new Date(selectedDate.value).toLocaleDateString("fr-FR", {
    weekday: "long",
    day: "2-digit",
    month: "long",
  })
  return str.charAt(0).toUpperCase() + str.slice(1)
})

const dateParam = computed(() => {
  if (!selectedDate.value) return ""
  const d = new Date(selectedDate.value)
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}-${String(d.getDate()).padStart(2, "0")}`
})

const hasReadings = computed(() => {
  if (!calendarData.value) return false
  return calendarData.value.readings.temporal.length > 0 || calendarData.value.readings.sanctoral.length > 0
})

const fetchCalendarData = async () => {
  if (!dateParam.value) return

  loading.value = true
  error.value = null

  try {
    const response = await fetch(`https://ecof-api-production.up.railway.app/api/calendar/${dateParam.value}`)

    if (!response.ok) throw new Error(`Erreur HTTP: ${response.status}`)

    calendarData.value = await response.json()
    loadedDate.value = dateParam.value
  } catch (err) {
    error.value = `Erreur lors du chargement des données: ${err.message}`
  } finally {
    loading.value = false
  }
}

const navigateToSaint = (id) => ionRouter.push(`/saint/${id}`)

const navigateToReading = (id) => ionRouter.push(`/reading/${id}`)

const handleDateChange = (event) => {
  const [date] = event.detail.value.split("T")
  selectedDate.value = `${date}T00:00:00`
  modal.value.$el.dismiss()
}

onIonViewWillEnter(() => {
  if (loadedDate.value !== dateParam.value) fetchCalendarData()
})

watch(dateParam, fetchCalendarData)
</script>

<style scoped>
.date-item {
  --border-radius: 10px;
  margin-bottom: 8px;
}

.section {
  margin-top: 30px;
  margin-bottom: 30px;
}

.section-title {
  font-size: 1.3rem;
  font-weight: bold;
  color: var(--ion-color-primary);
  margin-bottom: 15px;
  padding-left: 16px;
}

.subsection-title {
  font-size: 1rem;
  font-weight: 600;
  color: var(--ion-color-medium-shade);
  margin-top: 20px;
  margin-bottom: 10px;
  padding-left: 16px;
}

ion-list {
  background: transparent;
}

ion-item {
  --padding-start: 16px;
  --inner-padding-end: 16px;
  margin-bottom: 8px;
}

.state-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 50vh;
  gap: 10px;
  color: #aaa;
  font-size: 0.9rem;
}

.error-text {
  color: var(--ion-color-danger);
}
</style>
