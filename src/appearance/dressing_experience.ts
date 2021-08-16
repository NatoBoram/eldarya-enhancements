import type { Template } from "hogan.js"
import { translate } from "../i18n/translate"
import { isEnum } from "../ts_util"
import { loadFavourites } from "../ui/favourites"
import { loadAppearanceUI, loadAvatarPictoActions } from "./appearance_ui"
import {
  categoryContainerDataSet,
  categoryGroupDataSet,
  itemDataSet,
} from "./data_set"
import { AppearanceCategoryCode } from "./enums/appearance_category_code.enum"
import { openCategory } from "./favourites_actions"
import { loadHiddenCategory, unloadHiddenCategories } from "./hidden"
import wardrobe from "./wardrobe"

export function loadDressingExperience(): void {
  if (!location.pathname.startsWith("/player/appearance")) return
  loadAppearanceUI()
  handledCategories.clear()
  loading = false

  // Setup categories
  for (const li of document.querySelectorAll<HTMLLIElement>(
    "#wardrobe-menu>li, #appearance-items-categories li"
  )) {
    const { category } = li.dataset
    if (!isEnum(category, AppearanceCategoryCode)) continue

    switch (category) {
      case AppearanceCategoryCode.background:
        li.addEventListener("click", () =>
          document.getElementById("ee-category")?.remove()
        )
        continue
      case AppearanceCategoryCode.favorites:
        li.addEventListener("click", () => {
          document.getElementById("ee-category")?.remove()
          void handleCategory(category)
        })
        continue
      case AppearanceCategoryCode.attic:
        continue
      default:
        li.addEventListener("click", () => {
          document
            .getElementById("appearance-items-category-favorites")
            ?.remove()
          void handleCategory(category)
        })
    }
  }
}

/**
 * Get the category container for the clicked category and load its groups
 * @returns Category container
 */
async function handleCategory(
  category: AppearanceCategoryCode
): Promise<HTMLDivElement | null> {
  const appearanceItems =
    document.querySelector<HTMLDivElement>("#appearance-items")
  if (!appearanceItems) return null

  const oldCatContainer = document.querySelector<HTMLDivElement>(
    `#appearance-items-category-${category}`
  )

  if (oldCatContainer) {
    await onAppearanceItemsCategory(category, appearanceItems, oldCatContainer)
    return oldCatContainer
  }

  return new Promise(resolve => {
    new MutationObserver((_, observer) => {
      const newCatContainer = document.querySelector<HTMLDivElement>(
        `#appearance-items-category-${category}`
      )
      if (!newCatContainer) return
      observer.disconnect()

      void (async (): Promise<void> => {
        await onAppearanceItemsCategory(
          category,
          appearanceItems,
          newCatContainer
        )
        resolve(newCatContainer)
      })()
    }).observe(appearanceItems, { childList: true })
  })
}

async function onAppearanceItemsCategory(
  category: AppearanceCategoryCode,
  appearanceItems: HTMLDivElement,
  categoryContainer: HTMLDivElement
): Promise<void> {
  if (category === AppearanceCategoryCode.favorites) loadFavourites()
  else {
    await new Promise(resolve => setTimeout(resolve, 220))
    loadEeItems(appearanceItems, categoryContainer)
    await handleGroups(appearanceItems, categoryContainer)
  }
}

function loadEeItems(
  appearanceItems: HTMLDivElement,
  categoryContainer: HTMLDivElement
): HTMLDivElement {
  // Get information about the current category
  const appearanceCategory = categoryContainerDataSet(categoryContainer)!
  wardrobe.setCategory(appearanceCategory)
  categoryContainer.classList.remove("active")
  categoryContainer.style.display = "none"

  // Setup appearance_items_category
  const template: Template = require("../templates/html/appearance_items_category.html")
  document.getElementById("ee-category")?.remove()
  appearanceItems.insertAdjacentHTML(
    "beforeend",
    template.render({ ...appearanceCategory, translate })
  )

  const eeItems = document.querySelector<HTMLDivElement>("#ee-items")!
  eeItems.dataset.categoryid = appearanceCategory.categoryid.toString()
  eeItems.dataset.category = appearanceCategory.category
  eeItems.dataset.categoryname = appearanceCategory.categoryname
  return eeItems
}

const handledCategories = new Set<AppearanceCategoryCode>()

/** Load each groups synchronously and add them to a custom container. */
async function handleGroups(
  appearanceItems: HTMLDivElement,
  categoryContainer: HTMLDivElement
): Promise<void> {
  const appearanceCategory = categoryContainerDataSet(categoryContainer)
  if (!appearanceCategory) return

  const handled = handledCategories.has(appearanceCategory.category)
  handledCategories.add(appearanceCategory.category)

  loadHiddenCategory(appearanceCategory.category)
  for (const li of categoryContainer.querySelectorAll<HTMLLIElement>(
    "li.appearance-item-group"
  )) {
    const appearanceGroup = categoryGroupDataSet(li, appearanceCategory)
    if (!appearanceGroup?.group) continue
    wardrobe.setGroup(appearanceGroup)

    if (
      !document.querySelector(
        `#appearance-items-group-${appearanceGroup.group}`
      ) &&
      !handled
      // && !loadHiddenGroup(appearanceGroup.group)
    )
      await $.get(`/player/openGroup/${appearanceGroup.group}`, view =>
        appearanceItems.insertAdjacentHTML("beforeend", view)
      )

    const div = document.querySelector<HTMLDivElement>(
      `#appearance-items-group-${appearanceGroup.group}`
    )
    if (!div) continue
    div.classList.remove("active")

    const script = div.querySelector("script") // eslint-disable-next-line @typescript-eslint/no-implied-eval
    if (script) setTimeout(script.innerHTML, 0)

    const outerHTML = Array.from(
      div.querySelectorAll<HTMLLIElement>("li.appearance-item")
    )
      .map(li => {
        const appearanceItem = itemDataSet(li, appearanceGroup)
        if (!appearanceItem?.icon) return li.outerHTML

        li.dataset.categoryid = appearanceItem.categoryid.toString()
        li.dataset.category = appearanceItem.category
        li.dataset.categoryname = appearanceItem.categoryname
        li.dataset.group = appearanceItem.group.toString()
        wardrobe.setItem(appearanceItem)

        return li.outerHTML
      })
      .join("\n")
    wardrobe.availableItems = availableItems

    const active = document.querySelector(
      `#wardrobe-menu li[data-category="${appearanceGroup.category}"].active`
    )

    if (active) {
      document
        .querySelector<HTMLDivElement>("#ee-items")
        ?.insertAdjacentHTML("beforeend", outerHTML)
      initializeSelectedItems()
      initializeHiddenCategories()
    }
  }

  unloadHiddenCategories()
}

let loading = false

export async function loadBackground(): Promise<void> {
  if (loading) return
  loading = true

  const appearanceItems =
    document.querySelector<HTMLDivElement>("#appearance-items")
  if (!appearanceItems) return

  const categories = [
    AppearanceCategoryCode.underwear,
    AppearanceCategoryCode.skin,
    AppearanceCategoryCode.tatoo,
    AppearanceCategoryCode.mouth,
    AppearanceCategoryCode.eye,
    AppearanceCategoryCode.hair,
    AppearanceCategoryCode.sock,
    AppearanceCategoryCode.shoe,
    AppearanceCategoryCode.pants,
    AppearanceCategoryCode.handAccessory,
    AppearanceCategoryCode.top,
    AppearanceCategoryCode.coat,
    AppearanceCategoryCode.glove,
    AppearanceCategoryCode.necklace,
    AppearanceCategoryCode.dress,
    AppearanceCategoryCode.hat,
    AppearanceCategoryCode.faceAccessory,
    AppearanceCategoryCode.belt,
    AppearanceCategoryCode.ambient,
  ]

  for (const [index, category] of categories.entries()) {
    if (
      !document.querySelector<HTMLDivElement>(
        `#appearance-items-category-${category}`
      ) &&
      !loadHiddenCategory(category)
    )
      await openCategory(category)

    const categoryContainer = document.querySelector<HTMLDivElement>(
      `#appearance-items-category-${category}`
    )
    if (!categoryContainer) continue

    const appearanceCategory = categoryContainerDataSet(categoryContainer)
    if (!appearanceCategory) continue
    loadAvatarPictoActions(
      (index + 1) / categories.length,
      appearanceCategory.categoryname
    )

    await handleGroups(appearanceItems, categoryContainer)
  }
}
