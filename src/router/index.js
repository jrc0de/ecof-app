import { createRouter, createWebHistory } from "@ionic/vue-router"
import AboutPage from "../views/AboutPage.vue"
import CalendarPage from "../views/CalendarPage.vue"
import MapPage from "../views/MapPage.vue"
import ParishesPage from "../views/ParishesPage.vue"
import ParishPage from "../views/ParishPage.vue"
import PrayersPage from "../views/PrayersPage.vue"
import SynaxarPage from "../views/SynaxarPage.vue"
import SaintPage from "../views/SaintPage.vue"

const routes = [
  {
    path: "/",
    redirect: "/paroisses",
  },
  {
    path: "/paroisses",
    name: "Parishes",
    component: ParishesPage,
  },
  {
    path: "/paroisse/:id/horaires",
    name: "Parish",
    component: ParishPage,
  },
  {
    path: "/calendar",
    name: "Calendar",
    component: CalendarPage,
  },
  {
    path: "/map",
    name: "Map",
    component: MapPage,
  },
  {
    path: "/prayers",
    name: "Prayers",
    component: PrayersPage,
  },
  {
    path: "/synaxar",
    name: "Synaxar",
    component: SynaxarPage,
  },
  {
    path: "/saint",
    name: "Saint",
    component: SaintPage,
  },
  {
    path: "/about",
    name: "About",
    component: AboutPage,
  },
];

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
});

export default router;
