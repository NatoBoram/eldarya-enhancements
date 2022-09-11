import { Console } from "../console"
import { trimImageUrl } from "../eldarya_util"
import type { AppearanceCategory } from "../templates/interfaces/appearance_category"
import type { AppearanceGroup } from "../templates/interfaces/appearance_group"
import type { AppearanceItem } from "../templates/interfaces/appearance_item"
import type { AppearanceCategoryCode } from "./enums/appearance_category_code.enum"

export function categoryContainerDataSet(
  categoryContainer: HTMLDivElement
): AppearanceCategory | undefined {
  const { categoryid, category, categoryname } = categoryContainer.dataset
  if (!categoryid || !category || !categoryname) {
    Console.error(
      "Couldn't find a category container's dataset",
      categoryContainer
    )
    return
  }

  return {
    categoryid: Number(categoryid),
    category: category as AppearanceCategoryCode,
    categoryname,
  }
}

export function categoryGroupDataSet(
  groupItem: HTMLLIElement,
  appearanceCategory: AppearanceCategory
): AppearanceGroup | undefined {
  const { itemid, group, name, rarity, rarityname } = groupItem.dataset
  if (!itemid || !group || !name || !rarity || !rarityname) return
  return {
    ...appearanceCategory,
    itemid: Number(itemid),
    group: Number(group),
    name,
    rarity,
    rarityname,
  }
}

export function itemDataSet(
  li: HTMLLIElement,
  appearanceGroup: AppearanceGroup
): AppearanceItem | undefined {
  const { itemid, name, rarity, rarityname } = li.dataset
  const icon = li.querySelector("img")?.src
  if (!itemid || !name || !rarity || !rarityname || !icon) return

  return {
    ...appearanceGroup,
    itemid: Number(itemid),
    name,
    rarity,
    rarityname,
    icon: trimImageUrl(icon),
  }
}
