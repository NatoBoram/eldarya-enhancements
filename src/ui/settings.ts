import type { Template } from "hogan.js"
import { LocalStorage } from "../local_storage/local_storage"

export function loadSettings(): void {
  const accountRight = document.querySelector("#account-right div")
  if (!accountRight || accountRight.querySelector(".account-ee-bloc")) return

  const settingsTemplate: Template = require("../templates/html/settings.html")

  accountRight.insertAdjacentHTML(
    "beforeend",
    settingsTemplate.render(LocalStorage.settings)
  )

  document.getElementById("ee-debug-enabled")?.addEventListener("click", () => {
    LocalStorage.debug = !LocalStorage.debug
    reloadSettings()
  })

  document
    .getElementById("ee-minigames-enabled")
    ?.addEventListener("click", () => {
      LocalStorage.minigames = !LocalStorage.minigames
      reloadSettings()
    })

  document
    .getElementById("ee-explorations-enabled")
    ?.addEventListener("click", () => {
      LocalStorage.explorations = !LocalStorage.explorations
      reloadSettings()
    })

  document
    .getElementById("ee-market-enabled")
    ?.addEventListener("click", () => {
      LocalStorage.market = !LocalStorage.market
      reloadSettings()
    })
}

function reloadSettings(): void {
  document.querySelector<HTMLDivElement>(".account-ee-bloc")?.remove()
  loadSettings()
}
