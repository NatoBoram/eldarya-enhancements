import type { Template } from "hogan.js"
import { saveFavourite, showFavourite } from "../appearance/fake_favourites"
import { exportPreview, importOutfit } from "../appearance/favourites_actions"
import { Console } from "../console"
import { downloadAppearance } from "../download-canvas"
import { translate } from "../i18n/translate"
import indexed_db from "../indexed_db/indexed_db"
import { waitObserve } from "../takeover/click"
import type { FavouritesAction } from "../templates/interfaces/favourites_action"

export function loadFavourites(): void {
  if (!location.pathname.startsWith("/player/appearance/favorites")) return

  loadFavouritesActions()
  void loadFakeFavourites()
}

function loadFavouritesActions(): void {
  const actions = document.getElementById("favorites-actions")
  if (!actions || document.querySelector(".favorites-action-ee")) return

  const actionTemplate: Template = require("../templates/html/favourites_action.html")

  const importAction: FavouritesAction = {
    id: "import-outfit",
    text: translate.appearance.favourites.buttons.import,
  }
  const exportAction: FavouritesAction = {
    id: "export-outfit",
    text: translate.appearance.favourites.buttons.export,
  }
  const downloadAction: FavouritesAction = {
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
  const appearanceItems = document.querySelector("#appearance-items")
  if (!appearanceItems) {
    Console.error("Couldn't access #appearance-items", appearanceItems)
    return
  }

  const thumbs = await waitObserve(
    appearanceItems,
    "#all-outfit-thumbs .mCSB_container",
    3000
  )
  if (!thumbs) {
    Console.error("Couldn't access #all-outfit-thumbs", thumbs)
    return
  }

  const template: Template = require("../templates/html/outfit_thumbs.html")

  const favourites = await indexed_db.getFavouriteOutfits()

  document.querySelector("#ee-outfit-thumbs")?.remove()
  thumbs.insertAdjacentHTML(
    "beforeend",
    template.render({ outfits: favourites })
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
