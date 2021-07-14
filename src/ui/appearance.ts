import type { Template } from "hogan.js"
import { exportPreview, importOutfit } from "../appearance/favorites_actions"
import { downloadAppearance } from "../download-canvas"
import type { FavoritesAction } from "../templates/interfaces/favorites_action"

let observer: MutationObserver | null

export function loadAppearance(): void {
  observer?.disconnect()
  observer = null

  const appearanceItems = document.getElementById("appearance-items")
  if (!appearanceItems) return

  observer = new MutationObserver(loadAppearance)
  observer.observe(appearanceItems, {
    childList: true,
  })

  loadFavoritesActions()
}

function loadFavoritesActions(): void {
  const actions = document.getElementById("favorites-actions")
  if (!actions || document.querySelector(".favorites-action-ee")) return

  const actionTemplate: Template = require("../templates/html/favorites_action.html")

  const importAction: FavoritesAction = {
    id: "import-outfit",
    text: "Import",
  }
  const exportAction: FavoritesAction = {
    id: "export-outfit",
    text: "Export",
  }
  const downloadAction: FavoritesAction = {
    id: "download-outfit",
    text: "Download",
  }

  actions.insertAdjacentHTML(
    "beforeend",
    actionTemplate.render(importAction) +
      actionTemplate.render(exportAction) +
      actionTemplate.render(downloadAction)
  )

  document
    .getElementById(importAction.id)
    ?.addEventListener("click", importOutfit)

  document
    .getElementById(exportAction.id)
    ?.addEventListener("click", exportPreview)

  document
    .getElementById(downloadAction.id)
    ?.addEventListener("click", downloadAppearance)
}
