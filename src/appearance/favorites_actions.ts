import type { Item } from "../eldarya/item"
import { exportOutfit } from "../outfit"
import type { ParsableItem } from "./interfaces/parsable_item"

export function exportPreview(): void {
  exportOutfit("#appearance-preview")
}

export function importOutfit(): void {
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
    void file.text().then(async value => {
      if (!value) return

      const outfit: ParsableItem[] = JSON.parse(value)
      const avatar = Sacha.Avatar.avatars["#appearance-preview"]
      if (!avatar) return

      $.flavrNotif("Importing outfit. Please wait...")

      // Get all categories
      const categories = new Set<string>()
      for (const clothing of outfit) {
        categories.add(clothing.type)
      }

      // Open all categories
      await Promise.all(
        Array.from(categories.values()).map(async category =>
          openCategory(category)
        )
      )

      // Get all groups
      const groups = new Set<number>()
      for (const clothing of outfit) {
        if (document.querySelector(`[data-group="${clothing.group}"]`))
          groups.add(clothing.group)
      }

      // Open all groups
      await Promise.all(
        Array.from(groups.values()).map(async group => openGroup(group))
      )

      // Get the items from `availableItems`
      const wornItems: Item[] = []
      for (const clothing of outfit) {
        const item = availableItems[clothing.id]
        if (item) wornItems.push(item)
      }

      removeClothes()
      avatar.addItems(wornItems)
      initializeSelectedItems()
      initializeHiddenCategories()

      $.flavrNotif("Imported outfit!")
    })
  })
}

function removeClothes(): void {
  const avatar = Sacha.Avatar.avatars["#appearance-preview"]
  if (!avatar) return

  for (let i = avatar.children.length - 1; i >= 0; i--) {
    const itemRender = avatar.children[i]
    if (!itemRender) continue

    const item = itemRender.getItem()
    if (Sacha.Avatar.removeItemFromAllAvatars(item)) {
      $(`#appearance-item-${item._id}`).removeClass("selected")
    }
  }
}

async function openGroup(group: number): Promise<void> {
  return new Promise<void>(resolve => {
    const categoryContainer = $("#appearance-items-group-" + group.toString())
    if (categoryContainer.hasClass("active")) {
      resolve()
      return
    }

    if (categoryContainer.length <= 0) {
      void $.get(
        "/player/openGroup/" + group.toString(),
        (view: string): void => {
          $(view).hide().appendTo("#appearance-items")
        }
      ).always(() => {
        resolve()
      })
    } else {
      resolve()
    }
  })
}

async function openCategory(category: string): Promise<void> {
  return new Promise<void>(resolve => {
    const categoryContainer = $("#appearance-items-category-" + category)
    if (categoryContainer.hasClass("active")) {
      resolve()
      return
    }

    if (categoryContainer.length <= 0) {
      void $.post("/player/openCategory/" + category, (view: string): void => {
        $(view).hide().appendTo("#appearance-items")
      }).always(() => {
        resolve()
      })
    } else {
      resolve()
    }
  })
}
