import type { Template } from "hogan.js"
import { Console } from "../console"
import { toWebFull } from "../eldarya_util"
import { translate } from "../i18n/translate"
import { quantizeUrl } from "../mcq/quantization"
import { isEnum } from "../ts_util"
import { loadFavourites } from "../ui/favourites"
import { loadAppearanceUI } from "./appearance_ui"
import { arrayToColorJsIo, Swatch } from "./colour"
import {
  categoryContainerDataSet,
  categoryGroupDataSet,
  itemDataSet,
} from "./data_set"
import { AppearanceCategoryCode } from "./enums/appearance_category_code.enum"
import { openCategory, openGroup } from "./favourites_actions"
import { loadHiddenCategory, unloadHiddenCategories } from "./hidden"
import wardrobe from "./wardrobe"

/** Loads the new dressing experience and allows item groups to be loaded in the
 * background
 */
export async function loadDressingExperience(): Promise<void> {
  if (!location.pathname.startsWith("/player/appearance")) return

  handledCategories.clear()
  loading = false

  loadAppearanceUI()
  setupCategoryEvents()

  await new Promise(resolve => setTimeout(resolve, 1000))
  // await loadBackground()
}

function setupCategoryEvents(): void {
  const categories = document.querySelectorAll<HTMLLIElement>(
    "#wardrobe-menu>li, #appearance-items-categories li"
  )

  for (const li of categories) {
    const { category } = li.dataset
    if (!isEnum(category, AppearanceCategoryCode)) {
      Console.warn("Unsupported category", li)
      continue
    }

    switch (category) {
      case AppearanceCategoryCode.background:
        li.addEventListener("click", () => {
          document.getElementById("ee-category")?.remove()
          removeSearchCategory()
        })
        continue

      case AppearanceCategoryCode.favorites:
        li.addEventListener("click", () => {
          document.getElementById("ee-category")?.remove()
          removeSearchCategory()
          void handleCategory(category)
        })
        continue

      case AppearanceCategoryCode.attic:
        continue

      default:
        li.addEventListener("click", () => {
          removeFavouriteCategory()
          removeSearchCategory()
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
  if (!appearanceItems) {
    Console.error("Couldn't find #appearance-items", appearanceItems)
    return null
  }

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
    await handleGroups(categoryContainer)
  }
}

/** Load items that have already been put into  */
function loadEeItems(
  appearanceItems: HTMLDivElement,
  categoryContainer: HTMLDivElement
): HTMLDivElement | null {
  // Get information about the current category
  const appearanceCategory = categoryContainerDataSet(categoryContainer)
  if (!appearanceCategory) return null
  wardrobe.setCategory(appearanceCategory)
  categoryContainer.classList.remove("active")
  categoryContainer.style.display = "none"

  // Setup empty custom category container
  const template: Template = require("../templates/html/appearance_items_category.html")
  const rendered = template.render({ ...appearanceCategory, translate })
  document.getElementById("ee-category")?.remove()
  appearanceItems.insertAdjacentHTML("beforeend", rendered)

  return document.querySelector<HTMLDivElement>("#ee-items")
}

/** Set of categories that have been loaded in the background already. */
const handledCategories = new Set<AppearanceCategoryCode>()

/** Load each groups synchronously and add them to a custom container. */
async function handleGroups(categoryContainer: HTMLDivElement): Promise<void> {
  const appearanceCategory = categoryContainerDataSet(categoryContainer)
  if (!appearanceCategory) return
  wardrobe.setCategory(appearanceCategory)
  categoryContainer.classList.remove("active")
  categoryContainer.style.display = "none"

  const handled = handledCategories.has(appearanceCategory.category)
  handledCategories.add(appearanceCategory.category)

  loadHiddenCategory(appearanceCategory.category)

  const appearanceItemGroups = getAppearanceItemGroups(categoryContainer)
  for (const li of appearanceItemGroups) {
    const appearanceGroup = categoryGroupDataSet(li, appearanceCategory)
    if (!appearanceGroup?.group) {
      Console.warn("Couldn't find a group's group", li)
      continue
    }
    wardrobe.setGroup(appearanceGroup)

    if (
      !document.querySelector(
        `#appearance-items-group-${appearanceGroup.group}`
      ) &&
      !handled
      // && !loadHiddenGroup(appearanceGroup.group)
    )
      await openGroup(appearanceGroup.group)

    const appearanceItemsGroup = document.querySelector<HTMLDivElement>(
      `#appearance-items-group-${appearanceGroup.group}`
    )
    if (!appearanceItemsGroup) continue
    appearanceItemsGroup.classList.remove("active")

    // Evaluate Eldarya's script to add to the `availableItems`.
    const script = appearanceItemsGroup.querySelector("script")
    if (script) {
      // eslint-disable-next-line @typescript-eslint/no-implied-eval
      setTimeout(script.innerHTML, 0)
      await new Promise(resolve => setTimeout(resolve, 1))
    }

    const appearenceItems = Array.from(
      appearanceItemsGroup.querySelectorAll<HTMLLIElement>("li.appearance-item")
    )
    for (let c = 0; c < appearenceItems.length; c++) {
      const li = appearenceItems[c]
      if (!li) continue

      const appearanceItem = itemDataSet(li, appearanceGroup)
      if (!appearanceItem?.icon) continue

      const webFull = toWebFull(appearanceItem.icon)
      const colours = await quantizeUrl(webFull, 1)
      if (!colours) continue

      const calculable = colours.map(arrayToColorJsIo)
      const set = new Set(calculable.map(c => Swatch.findClosestDelta(c)))

      // const rgb = colours.map(arrayToRgb)
      // const set = new Set(rgb)

      const palHtml = [...set]
        .slice(0, 2)
        .map(swatch => {
          const span = document.createElement("span")
          span.textContent = "⬤"
          // span.style.color = rgbaToHex(swatch)
          span.style.color = swatch.hexadecimal
          span.title = swatch.name
          return span.outerHTML
        })
        .join("\n")

      const div = document.createElement("div")
      div.innerHTML = palHtml
      div.style.left = "2em"
      div.style.position = "absolute"

      li.insertAdjacentHTML("afterbegin", div.outerHTML)
      appearenceItems[c] = li
    }

    const outerHTML = Array.from(
      appearanceItemsGroup.querySelectorAll<HTMLLIElement>("li.appearance-item")
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
    appearanceItemsGroup.remove()

    const active = document.querySelector(
      `#wardrobe-menu li[data-category="${appearanceGroup.category}"].active`
    )

    if (active) {
      document
        .querySelector<HTMLDivElement>("#ee-items")
        ?.insertAdjacentHTML("beforeend", outerHTML)

      initializeSelectedItems()
      initializeHiddenCategories()
    } else if (handled) break
  }

  if (!handled) handledCategories.delete(appearanceCategory.category)
  unloadHiddenCategories()
}

/** Get all the groups in a category */
function getAppearanceItemGroups(
  categoryContainer: HTMLDivElement
): NodeListOf<HTMLLIElement> {
  return categoryContainer.querySelectorAll<HTMLLIElement>(
    "li.appearance-item-group"
  )
}

let loading = false

export async function loadBackground(): Promise<void> {
  if (loading) return
  loading = true
  let success = true

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

  const template: Template = require("../templates/html/flavr_notif/icon_message.html")

  for (const category of categories) {
    if (!location.pathname.startsWith("/player/appearance")) {
      success = false
      break
    }

    const active = document.querySelector(
      `#wardrobe-menu li[data-category="${category}"].active`
    )
    if (active) continue

    const categoryContainer = await openCategory(category)
    if (!categoryContainer) {
      success = false
      break
    }

    let finished = false
    setTimeout(() => {
      if (!finished)
        $.flavrNotif(
          template.render({
            icon: `/static/img/mall/categories/${category}.png`,
            message: translate.appearance.loading(
              document.querySelector<HTMLLIElement>(
                `#wardrobe-menu li[data-category="${category}"]`
              )?.dataset.categoryname ?? category
            ),
          })
        )
    }, 1000)

    await handleGroups(categoryContainer)
    finished = true
  }

  if (success) $.flavrNotif(translate.appearance.loaded)
  loading = false
}

function removeSearchCategory(): void {
  return document.getElementById("appearance-items-category-search")?.remove()
}

function removeFavouriteCategory(): void {
  document.getElementById("appearance-items-category-favorites")?.remove()
}
