import type { Template } from "hogan.js"
import { LocalStorage } from "../local_storage/local_storage"
import { parseAvatar } from "../outfit"
import { loadFakeFavourites } from "../ui/appearance"
import { wearOutfit } from "./favorites_actions"

export function saveFavourite(): void {
  showCreatedOutfitPopup()
}

function deleteFavourite(index: number): void {
  LocalStorage.favourites = LocalStorage.favourites.filter(
    (_, i) => i !== index
  )
  loadFakeFavourites()
}

function showCreatedOutfitPopup(): void {
  const template: Template = require("../templates/html/created_outfit_flavr.html")

  $.flavr({
    content: template.render({}),
    onBuild: $container => {
      $container.addClass("new-layout-popup")
      $container.addClass("created-outfit-popup")

      const saveButton =
        document.querySelector<HTMLButtonElement>('[rel="btn-save"]')
      if (!saveButton) return

      document
        .querySelector<HTMLInputElement>("#choose-name")
        ?.addEventListener("keyup", event => {
          if (event.key === "Enter") saveButton.click()

          if (document.querySelector<HTMLInputElement>("#choose-name")?.value)
            saveButton.classList.remove("disabled")
          else saveButton.classList.add("disabled")
        })

      saveButton.classList.add("nl-button", "nl-button-lg", "disabled")
    },
    buttons: {
      close: {
        text: "",
        style: "close",
        action: () => true,
      },
      save: {
        text: "Save",
        style: "default",
        action: () => {
          const name =
            document.querySelector<HTMLInputElement>("#choose-name")?.value
          if (!name) return false

          const avatar = Sacha.Avatar.avatars["#appearance-preview"]
          if (!avatar) return false
          const items = parseAvatar(avatar)

          const preview = document
            .querySelector<HTMLCanvasElement>("#appearance-preview canvas")
            ?.toDataURL("image/png")
          if (!preview) return false

          LocalStorage.favourites = [
            ...LocalStorage.favourites,
            {
              items,
              name,
              preview,
            },
          ]

          loadFakeFavourites()
          return true
        },
      },
    },
  })
}

export function showFavourite(index: number): void {
  const template: Template = require("../templates/html/favourite_outfit_flavr.html")

  $.flavr({
    content: template.render({ ...LocalStorage.favourites[index] }),
    onBuild: $container => {
      $container.addClass("new-layout-popup")
      $container.addClass("created-outfit-popup")
    },
    buttons: {
      close: {
        text: "",
        style: "close",
        action: () => true,
      },
      delete: {
        text: "Delete",
        style: "default",
        action: () => {
          deleteFavourite(index)
          return true
        },
      },
      wear: {
        text: "Wear",
        style: "default",
        action: () => {
          const avatar = Sacha.Avatar.avatars["#appearance-preview"]
          const outfit = LocalStorage.favourites[index]?.items
          if (!avatar || !outfit) return false

          void wearOutfit(avatar, outfit)
          return true
        },
      },
    },
  })
}
