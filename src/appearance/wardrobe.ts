import type { Item } from "../eldarya/item"
import type { AppearanceCategory } from "../templates/interfaces/appearance_category"
import type { AppearanceGroup } from "../templates/interfaces/appearance_group"
import type { AppearanceItem } from "../templates/interfaces/appearance_item"

class Wardrobe {
  private readonly categories: Record<number, AppearanceCategory> = {}

  private readonly groups: Record<number, AppearanceGroup> = {}

  private readonly items: Record<number, AppearanceItem> = {}

  availableItems?: Record<number, Item>

  getCategories(): AppearanceCategory[] {
    return Object.values(this.categories)
  }

  getCategory(id: number): AppearanceCategory | undefined {
    return this.categories[id]
  }

  getCategoryGroups(categoryid: number): AppearanceGroup[] {
    return Object.values(this.groups).filter(
      group => group.categoryid === categoryid
    )
  }

  getGroup(id: number): AppearanceGroup | undefined {
    return this.groups[id]
  }

  getGroups(): AppearanceGroup[] {
    return Object.values(this.groups)
  }

  getItem(id: number): AppearanceItem | undefined {
    return this.items[id]
  }

  getItems(group: number): AppearanceItem[] {
    return Object.values(this.items).filter(item => item.group === group)
  }

  setCategory(category: AppearanceCategory): void {
    this.categories[category.categoryid] = category
  }

  setGroup(group: AppearanceGroup): void {
    this.groups[group.group] = group
  }

  setItem(item: AppearanceItem): void {
    this.items[item.itemid] = item
  }
}

export default new Wardrobe()
