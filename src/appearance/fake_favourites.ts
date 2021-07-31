import type { Template } from "hogan.js"
import indexed_db from "../indexed_db/indexed_db"
import { parseAvatar } from "../outfit"
import { loadFakeFavourites } from "../ui/appearance"
import { wearOutfit } from "./favorites_actions"
import type { FavouriteOutfit } from "./interfaces/favourite_outfit"
import type { ParsableItem } from "./interfaces/parsable_item"

export async function saveFavourite(): Promise<FavouriteOutfit | null> {
  const favourite = await showOutfit()
  if (favourite) await loadFakeFavourites()
  return favourite
}

async function deleteFavourite(favourite: FavouriteOutfit): Promise<void> {
  await indexed_db.deleteFavouriteOutfit(favourite)
  await loadFakeFavourites()
}

async function showOutfit(): Promise<FavouriteOutfit | null> {
  const template: Template = require("../templates/html/created_outfit_flavr.html")

  return new Promise(resolve =>
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
          action: () => {
            resolve(null)
            return true
          },
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

            void saveAction(name, items, resolve)
            return true
          },
        },
      },
    })
  )
}

export function showFavourite(favourite: FavouriteOutfit): void {
  const template: Template = require("../templates/html/favourite_outfit_flavr.html")

  $.flavr({
    content: template.render(favourite),
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
          void deleteFavourite(favourite)
          return true
        },
      },
      wear: {
        text: "Wear",
        style: "default",
        action: () => {
          const avatar = Sacha.Avatar.avatars["#appearance-preview"]
          if (!avatar) return false

          void (async (): Promise<void> =>
            wearOutfit(avatar, favourite.items))()

          return true
        },
      },
    },
  })
}

async function saveAction(
  name: string,
  items: ParsableItem[],
  resolve: (value: FavouriteOutfit) => void
): Promise<void> {
  const blob = await new Promise<Blob>(resolve => {
    document
      .querySelector<HTMLCanvasElement>("#appearance-preview canvas")
      ?.toBlob(blob => resolve(blob!), "image/png", 1)
  })

  resolve({
    ...(await indexed_db.addFavouriteOutfit({
      items,
      name,
      blob,
    })),
    url: URL.createObjectURL(blob),
  })
}
