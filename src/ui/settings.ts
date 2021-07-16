import type { Template } from "hogan.js"
import { getName } from "../download-canvas"
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

  document
    .getElementById("ee-import")
    ?.addEventListener("click", importSettings)

  document
    .getElementById("ee-export")
    ?.addEventListener("click", exportSettings)
}

function reloadSettings(): void {
  document.querySelector<HTMLDivElement>(".account-ee-bloc")?.remove()
  loadSettings()
}

function importSettings(): void {
  const input = document.createElement("input")
  input.setAttribute("type", "file")
  input.setAttribute("accept", "application/json")
  input.click()

  input.addEventListener("input", event => {
    if (!event.target) return
    const files = (<HTMLInputElement>event.target).files
    if (!files) return
    const file = files[0]
    if (!file) return
    void file.text().then(value => {
      if (!value) return

      LocalStorage.settings = JSON.parse(value)

      reloadSettings()
      $.flavrNotif("Imported settings!")
    })
  })
}

function exportSettings(): void {
  const href =
    "data:text/json;charset=utf-8," +
    encodeURIComponent(JSON.stringify(LocalStorage.settings, null, "\t"))

  const a = document.createElement("a")
  a.setAttribute("href", href)
  a.setAttribute(
    "download",
    `${getName() ?? "eldarya-enhancements"}-settings.json`
  )
  a.click()
}
