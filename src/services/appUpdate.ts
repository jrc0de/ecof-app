import { App } from "@capacitor/app"
import { Capacitor } from "@capacitor/core"
import { Browser } from "@capacitor/browser"
import { alertController } from "@ionic/vue"

export async function checkUpdate() {
  const { version } = await App.getInfo()
  const platform = Capacitor.getPlatform()

  const res = await fetch("https://ecof-api-production.up.railway.app/api/app-config")
  const { versions, store_urls } = await res.json()

  const { latest, minimum } = versions[platform]

  if (isOlderThan(version, minimum)) {
    await showUpdateAlert(store_urls[platform], true)
  } else if (isOlderThan(version, latest)) {
    await showUpdateAlert(store_urls[platform], false)
  }
}

function isOlderThan(current: string, target: string): boolean {
  const c = current.split(".").map(Number)
  const t = target.split(".").map(Number)
  for (let i = 0; i < 3; i++) {
    if (c[i] < t[i]) return true
    if (c[i] > t[i]) return false
  }
  return false
}

async function showUpdateAlert(storeUrl: string, forced: boolean) {
  const alert = await alertController.create({
    header: forced ? "Mise à jour requise" : "Mise à jour disponible",
    message: forced ? "Une mise à jour est nécessaire pour continuer." : "Une nouvelle version est disponible.",
    backdropDismiss: !forced,
    buttons: [
      ...(forced ? [] : [{ text: "Plus tard", role: "cancel" }]),
      {
        text: "Mettre à jour",
        handler: () => Browser.open({ url: storeUrl }),
      },
    ],
  })
  await alert.present()
}
