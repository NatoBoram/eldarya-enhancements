import type { Template } from "hogan.js"
import { translate } from "../i18n/translate"
import type { AppearanceCategory } from "../templates/interfaces/appearance_category"
import type { AppearanceGroup } from "../templates/interfaces/appearance_group"
import type { AppearanceItem } from "../templates/interfaces/appearance_item"
import { loadFavourites } from "../ui/favourites"
import { loadAppearanceUI } from "./appearance_ui"
import wardrobe from "./wardrobe"

export function loadDressingExperience(): void {
  if (!location.pathname.startsWith("/player/appearance")) return
  loadAppearanceUI()

  // Setup categories
  for (const li of document.querySelectorAll<HTMLLIElement>(
    "#wardrobe-menu>li, #appearance-items-categories li"
  )) {
    const { category } = li.dataset
    if (!category) continue

    switch (category) {
      case "background":
        li.addEventListener("click", () =>
          document.getElementById("ee-category")?.remove()
        )
        continue
      case "favorites":
        li.addEventListener("click", () => {
          document.getElementById("ee-category")?.remove()
          handleCategory(category)
        })
        continue
      case "attic":
        continue
      default:
        li.addEventListener("click", () => {
          document
            .getElementById("appearance-items-category-favorites")
            ?.remove()
          handleCategory(category)
        })
    }
  }
}

/** Get the category container for the clicked category and load its groups */
function handleCategory(category: string): void {
  const appearanceItems =
    document.querySelector<HTMLDivElement>("#appearance-items")
  if (!appearanceItems) return

  const oldCatContainer = document.querySelector<HTMLDivElement>(
    `#appearance-items-category-${category}`
  )
  if (oldCatContainer) {
    if (category === "favorites") loadFavourites()
    else void handleGroups(appearanceItems, oldCatContainer)
    return
  }

  new MutationObserver((_, observer) => {
    const newCatContainer = document.querySelector<HTMLDivElement>(
      `#appearance-items-category-${category}`
    )
    if (!newCatContainer) return
    observer.disconnect()

    if (category === "favorites") loadFavourites()
    else void handleGroups(appearanceItems, newCatContainer)
  }).observe(appearanceItems, { childList: true })
}

/** Load each groups synchronously and add them to a custom container. */
async function handleGroups(
  appearanceItems: HTMLDivElement,
  categoryContainer: HTMLDivElement
): Promise<void> {
  await new Promise(resolve => setTimeout(resolve, 220))

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
  const eeItems = document.querySelector("#ee-items")
  if (!eeItems) return

  loadHiddenCategory(appearanceCategory.category)
  for (const li of categoryContainer.querySelectorAll<HTMLLIElement>(
    "li.appearance-item-group"
  )) {
    const appearanceGroup = categoryGroupDataSet(li, appearanceCategory)!
    if (!appearanceGroup.group) continue
    wardrobe.setGroup(appearanceGroup)

    if (
      !document.querySelector<HTMLDivElement>(
        `#appearance-items-group-${appearanceGroup.group}`
      )
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

    // Check if the category is still active
    if (
      !document.querySelector(
        `#wardrobe-menu li[data-category="${appearanceGroup.category}"].active`
      )
    )
      break

    eeItems.insertAdjacentHTML(
      "beforeend",
      Array.from(div.querySelectorAll<HTMLLIElement>("li.appearance-item"))
        .map(li => {
          const appearanceItem = itemDataSet(li, appearanceGroup)!
          if (!appearanceItem.icon) return li.outerHTML

          li.dataset.categoryid = appearanceItem.categoryid.toString()
          li.dataset.category = appearanceItem.category
          li.dataset.categoryname = appearanceItem.categoryname
          li.dataset.group = appearanceItem.group.toString()

          wardrobe.setItem(appearanceItem)

          return li.outerHTML
        })
        .join("\n")
    )

    initializeSelectedItems()
    initializeHiddenCategories()
    wardrobe.availableItems = availableItems
  }

  unloadHiddenCategories()
}

function unloadHiddenCategories(): void {
  const hidden = document.querySelectorAll<HTMLDivElement>(
    "#appearance-items .appearance-items-category:not(.active):not([data-categoryname]), #appearance-items script"
  )
  for (const div of hidden) {
    div.remove()
  }
}

export function loadHiddenCategory(category: string): void {
  const categoryid = wardrobe
    .getCategories()
    .find(c => c.category === category)?.categoryid
  if (!categoryid) return

  const groups = wardrobe.getCategoryGroups(categoryid)
  const itemTemplate: Template = require("../templates/html/appearance_item.html")
  const groupTemplate: Template = require("../templates/html/appearance_items_group.html")

  document
    .querySelector<HTMLDivElement>("#appearance-items")
    ?.insertAdjacentHTML(
      "beforeend",
      groups
        .map(group =>
          groupTemplate.render({
            ...group,
            items: wardrobe
              .getItems(group.group)
              .map(item => itemTemplate.render(item))
              .join("\n"),
          })
        )
        .join("\n")
    )
}

export function loadHiddenGroup(id: number): void {
  const group = wardrobe.getGroup(id)
  if (!group) return

  const itemTemplate: Template = require("../templates/html/appearance_item.html")
  const groupTemplate: Template = require("../templates/html/appearance_items_group.html")

  document
    .querySelector<HTMLDivElement>("#appearance-items")
    ?.insertAdjacentHTML(
      "beforeend",
      groupTemplate.render({
        ...group,
        items: wardrobe
          .getItems(group.group)
          .map(item => itemTemplate.render(item))
          .join("\n"),
      })
    )
}

function categoryContainerDataSet(
  categoryContainer: HTMLDivElement
): AppearanceCategory | undefined {
  const { categoryid, category, categoryname } = categoryContainer.dataset
  if (!categoryid || !category || !categoryname) return
  return { categoryid: Number(categoryid), category, categoryname }
}

function categoryGroupDataSet(
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

function itemDataSet(
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
    icon,
  }
}
