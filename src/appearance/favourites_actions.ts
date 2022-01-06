import type { Avatar } from "../eldarya/avatar"
import type { Item } from "../eldarya/item"
import { translate } from "../i18n/translate"
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
    const files = (event.target as HTMLInputElement).files
    if (!files) return
    const file = files[0]
    if (!file) return
    void file.text().then(async value => {
      if (!value) return

      const outfit: ParsableItem[] = JSON.parse(value)
      const avatar = Sacha.Avatar.avatars["#appearance-preview"]
      if (!avatar) return

      await wearOutfit(avatar, outfit)
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

export async function openGroup(group: number): Promise<HTMLDivElement | null> {
  return new Promise<HTMLDivElement | null>((resolve): void => {
    const groupContainer = document.querySelector<HTMLDivElement>(
      `#appearance-items-group-${group}`
    )
    if (groupContainer) return void resolve(groupContainer)

    const avatar = Sacha.Avatar.avatars["#appearance-preview"]
    if (!avatar) return void resolve(null)

    void $.get(
      `/player/openGroup/${group}`,
      { wornItems: avatar.getItemsToSave() },
      (view: string): void => {
        $(view).hide().appendTo("#appearance-items")
        resolve(
          document.querySelector<HTMLDivElement>(
            `#appearance-items-group-${group}`
          )
        )
      }
    )
  })
}

export async function openCategory(
  category: string
): Promise<HTMLDivElement | null> {
  return new Promise<HTMLDivElement | null>((resolve): void => {
    const categoryContainer = document.querySelector<HTMLDivElement>(
      `#appearance-items-category-${category}`
    )
    if (categoryContainer) return void resolve(categoryContainer)

    void $.post(`/player/openCategory/${category}`, (view: string): void => {
      $(view).hide().appendTo("#appearance-items")
      resolve(
        document.querySelector<HTMLDivElement>(
          `#appearance-items-category-${category}`
        )
      )
    })
  })
}

export async function wearOutfit(
  avatar: Avatar,
  outfit: ParsableItem[]
): Promise<void> {
  $.flavrNotif(translate.appearance.favourites.importing)

  // Get all categories
  const categories = new Set<string>()
  for (const clothing of outfit)
    if (!availableItems[clothing.id]) categories.add(clothing.type)

  // Open all categories
  await Promise.all(
    Array.from(categories.values()).map(async category =>
      openCategory(category)
    )
  )

  // Get all groups
  const groups = new Set<number>()
  for (const clothing of outfit)
    if (
      document.querySelector(`[data-group="${clothing.group}"]`) &&
      !availableItems[clothing.id]
    )
      groups.add(clothing.group)

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

  const avatarActions = document.getElementById("avatar-actions")
  if (avatarActions) avatarActions.style.display = "initial"

  $.flavrNotif(translate.appearance.favourites.imported)
}
