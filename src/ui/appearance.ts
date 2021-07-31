import type { Template } from "hogan.js"
import { saveFavourite, showFavourite } from "../appearance/fake_favourites"
import { exportPreview, importOutfit } from "../appearance/favorites_actions"
import { downloadAppearance } from "../download-canvas"
import { translate } from "../i18n/translate"
import indexed_db from "../indexed_db/indexed_db"
import type { FavoritesAction } from "../templates/interfaces/favorites_action"
import type { OutfitThumbs } from "../templates/interfaces/outfit_thumb"

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
  void loadFakeFavourites()
}

function loadFavoritesActions(): void {
  const actions = document.getElementById("favorites-actions")
  if (!actions || document.querySelector(".favorites-action-ee")) return

  const actionTemplate: Template = require("../templates/html/favorites_action.html")

  const importAction: FavoritesAction = {
    id: "import-outfit",
    text: translate.appearance.favourites.buttons.import,
  }
  const exportAction: FavoritesAction = {
    id: "export-outfit",
    text: translate.appearance.favourites.buttons.export,
  }
  const downloadAction: FavoritesAction = {
    id: "download-outfit",
    text: translate.appearance.favourites.buttons.download,
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

export async function loadFakeFavourites(): Promise<void> {
  const thumbs = document.querySelector("#all-outfit-thumbs .mCSB_container")
  if (!thumbs) return

  const template: Template = require("../templates/html/outfit_thumbs.html")

  const favourites = await indexed_db.getFavouriteOutfits()

  document.querySelector("#ee-outfit-thumbs")?.remove()
  thumbs.insertAdjacentHTML(
    "beforeend",
    template.render({
      outfits: favourites,
    } as OutfitThumbs)
  )

  document
    .querySelector(".ee-available-slot")
    ?.addEventListener("click", (): void => void saveFavourite())

  for (const div of document.querySelectorAll<HTMLDivElement>(
    ".ee-outfit-thumb"
  )) {
    div.addEventListener("click", () => {
      const favourite = favourites.find(
        favourite => favourite.id === Number(div.dataset.arrayIndex)
      )
      if (!favourite) return

      showFavourite(favourite)
    })
  }
}
