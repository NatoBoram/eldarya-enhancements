import type { Template } from "hogan.js"
import { translate } from "../i18n/translate"
import indexed_db from "../indexed_db/indexed_db"
import { parseAvatar } from "../outfit"
import { loadFakeFavourites } from "../ui/favourites"
import { wearOutfit } from "./favourites_actions"
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
      content: template.render({ translate }),
      onBuild: $container => {
        $container.addClass("new-layout-popup")
        $container.addClass("created-outfit-popup")

        const saveButton =
          document.querySelector<HTMLButtonElement>('[rel="btn-save"]')
        if (!saveButton) return

        const input = document.querySelector<HTMLInputElement>("#choose-name")
        if (!input) return

        // Disable button when invalid input
        input.addEventListener("keyup", event => {
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
          text: translate.appearance.favourites.save_outfit.save,
          style: "default",
          action: () => {
            const name =
              document.querySelector<HTMLInputElement>("#choose-name")?.value
            if (!name) return false

            const avatar = Sacha.Avatar.avatars["#appearance-preview"]
            if (!avatar) return false
            const items = parseAvatar(avatar)

            void saveAction(name, items).then(resolve)
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
    content: template.render({ ...favourite, translate }),
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
        text: translate.appearance.favourites.click_outfit.delete,
        style: "default",
        action: () => {
          void deleteFavourite(favourite)
          return true
        },
      },
      wear: {
        text: translate.appearance.favourites.click_outfit.wear,
        style: "default",
        action: () => {
          const avatar = Sacha.Avatar.avatars["#appearance-preview"]
          if (!avatar) return false

          void (async (): Promise<void> =>
            wearOutfit(avatar, favourite.items))()

          return true
        },
      },
      rename: {
        text: translate.appearance.favourites.rename_outfit.button,
        style: "default",
        action: () => {
          setTimeout(
            () =>
              void showRenameFavourite(favourite).then(favourite => {
                if (favourite) void loadFakeFavourites()
              }),
            800
          )

          return true
        },
      },
    },
  })
}

async function saveAction(
  name: string,
  items: ParsableItem[]
): Promise<FavouriteOutfit> {
  const blob = await new Promise<Blob>((resolve, reject) => {
    document
      .querySelector<HTMLCanvasElement>("#appearance-preview canvas")
      ?.toBlob(
        blob => {
          if (blob) resolve(blob)
          else reject("Blob doesn't exist.")
        },
        "image/png",
        1
      )
  })

  const favourite = await indexed_db.addFavouriteOutfit({ items, name, blob })
  return { ...favourite, url: URL.createObjectURL(blob) }
}

export async function showRenameFavourite(
  favourite: FavouriteOutfit
): Promise<FavouriteOutfit | null> {
  const template: Template = require("../templates/html/rename_favourite_outfit_flavr.html")
  const rendered = template.render({
    ...favourite,
    title: translate.appearance.favourites.rename_outfit.title(favourite.name),
    translate,
  })

  return new Promise<FavouriteOutfit | null>(resolve => {
    $.flavr({
      content: rendered,
      onBuild: $container => {
        $container.addClass("new-layout-popup")
        $container.addClass("created-outfit-popup")

        const renameButton =
          document.querySelector<HTMLButtonElement>('[rel="btn-rename"]')
        if (!renameButton) return

        document
          .querySelector<HTMLInputElement>("#choose-name")
          ?.addEventListener("keyup", event => {
            if (event.key === "Enter") renameButton.click()

            if (document.querySelector<HTMLInputElement>("#choose-name")?.value)
              renameButton.classList.remove("disabled")
            else renameButton.classList.add("disabled")
          })

        renameButton.classList.add("nl-button", "nl-button-lg", "disabled")
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
        rename: {
          text: translate.appearance.favourites.rename_outfit.button,
          style: "default",
          action: () => {
            const name =
              document.querySelector<HTMLInputElement>("#choose-name")?.value
            if (!name) return false

            void indexed_db
              .updateFavouriteOutfit({ ...favourite, name })
              .then(resolve)

            return true
          },
        },
      },
    })
  })
}
