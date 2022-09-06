import type { Template } from "hogan.js"
import { getName } from "../download-canvas"
import { translate } from "../i18n/translate"
import { LocalStorage } from "../local_storage/local_storage"
import type { Settings } from "../templates/interfaces/settings"

/** Creates the UI for the settings in the account page. */
export function loadSettings(): void {
  const accountRight = document.querySelector("#account-right div")
  if (!accountRight || accountRight.querySelector(".account-ee-bloc")) return

  const settings: Partial<Settings> = {
    debug: LocalStorage.debug,
    explorations: LocalStorage.explorations,
    market: LocalStorage.market,
    minigames: LocalStorage.minigames,
    unlocked: LocalStorage.unlocked,
  }
  const settingsTemplate: Template = require("../templates/html/settings.html")
  const rendered = settingsTemplate.render({ ...settings, translate })
  accountRight.insertAdjacentHTML("beforeend", rendered)

  document.getElementById("ee-debug-enabled")?.addEventListener("click", () => {
    LocalStorage.debug = !LocalStorage.debug
    reloadSettings()
  })

  if (LocalStorage.unlocked) {
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
      .getElementById("ee-delete-explorations")
      ?.addEventListener("click", () => {
        LocalStorage.autoExploreLocations = []
      })
  }

  document
    .getElementById("ee-import")
    ?.addEventListener("click", importSettings)

  document
    .getElementById("ee-export")
    ?.addEventListener("click", () => void exportSettings())

  document
    .getElementById("ee-reset")
    ?.addEventListener("click", confirmResetSettings)
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
    const files = (event.target as HTMLInputElement).files
    if (!files) return
    const file = files[0]
    if (!file) return
    void file.text().then(async value => {
      if (!value) return

      const parsed: Settings = JSON.parse(value)
      await LocalStorage.setSettings(parsed)

      reloadSettings()
      $.flavrNotif(translate.account.imported)
    })
  })
}

async function exportSettings(): Promise<void> {
  const href =
    "data:text/json;charset=utf-8," +
    encodeURIComponent(
      JSON.stringify(await LocalStorage.getSettings(), null, 2)
    )

  const a = document.createElement("a")
  a.setAttribute("href", href)
  a.setAttribute(
    "download",
    `${getName() ?? "eldarya-enhancements"}-settings.json`
  )
  a.click()
}

function confirmResetSettings(): void {
  const template: Template = require("../templates/html/confirm_reset_settings.html")
  const rendered = template.render({ translate })

  $.flavr({
    content: rendered,
    dialog: "confirm",
    buttons: {
      close: { style: "close" },
      cancel: {
        text: translate.account.cancel,
        action: () => true,
      },
      confirm: {
        text: translate.account.confirm,
        action: () => {
          void resetSettings()
          return true
        },
      },
    },
    onBuild: $container => {
      $container.addClass("new-layout-popup vacation")
    },
  })
}

async function resetSettings(): Promise<void> {
  await LocalStorage.resetSettings()
  pageLoad(location.pathname)
}
