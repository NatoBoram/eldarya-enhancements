import type { ParsableItem } from "./appearance/interfaces/parsable_item"
import type { Avatar } from "./eldarya/avatar"

export function exportOutfit(selector: string, name = "outfit"): void {
  const avatar = Sacha.Avatar.avatars[selector]
  if (!avatar) return

  const outfit = parseAvatar(avatar)

  const href =
    "data:text/json;charset=utf-8," +
    encodeURIComponent(JSON.stringify(outfit, null, "\t"))

  const a = document.createElement("a")
  a.setAttribute("href", href)
  a.setAttribute("download", `${name}.json`)
  a.click()
}

export function parseAvatar(avatar: Avatar): ParsableItem[] {
  return avatar.children.map(child => {
    const item = child.getItem()
    return {
      id: item._id,
      group: item._group,
      name: item._name,
      image: item._image,
      type: item._type,
      categoryId: item._categoryId,
      hiddenCategories: Object.values(item._hiddenCategories),
      animationData: item._animationData,
      locked: item._locked,
    }
  })
}
