import type { Template } from "hogan.js"
import { translate } from "../i18n/translate"
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
      case "favorites":
        li.addEventListener("click", () =>
          document.getElementById("ee-category")?.remove()
        )
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
    void handleGroups(appearanceItems, oldCatContainer)
    return
  }

  new MutationObserver((_, observer) => {
    const newCatContainer = document.querySelector<HTMLDivElement>(
      `#appearance-items-category-${category}`
    )
    if (!newCatContainer) return
    observer.disconnect()

    void handleGroups(appearanceItems, newCatContainer)
  }).observe(appearanceItems, { childList: true })
}

/** Load each groups synchronously and add them to a custom container. */
async function handleGroups(
  appearanceItems: HTMLDivElement,
  categoryContainer: HTMLDivElement
): Promise<void> {
  await new Promise(resolve => setTimeout(resolve, 220))

  // Get information about the current category
  const { category, categoryid, categoryname } = categoryContainer.dataset
  if (!category || !categoryid || !categoryname) return
  wardrobe.setCategory({
    category,
    categoryid: Number(categoryid),
    categoryname,
  })
  categoryContainer.classList.remove("active")
  categoryContainer.style.display = "none"

  // Setup appearance_items_category
  const template: Template = require("../templates/html/appearance_items_category.html")
  document.getElementById("ee-category")?.remove()
  appearanceItems.insertAdjacentHTML(
    "beforeend",
    template.render({ category, categoryid, translate })
  )
  const eeItems = document.querySelector("#ee-items")
  if (!eeItems) return

  loadHiddenCategory(category)
  for (const li of categoryContainer.querySelectorAll<HTMLLIElement>(
    "li.appearance-item-group"
  )) {
    const { group } = li.dataset
    wardrobe.setGroup({
      category,
      categoryid: Number(categoryid),
      group: Number(group),
    })
    if (!group) continue

    if (
      !document.querySelector<HTMLDivElement>(
        `#appearance-items-group-${group}`
      )
    )
      await $.get("/player/openGroup/" + group, view =>
        appearanceItems.insertAdjacentHTML("beforeend", view)
      )

    const div = document.querySelector<HTMLDivElement>(
      `#appearance-items-group-${group}`
    )
    if (!div) continue
    div.classList.remove("active")

    const script = div.querySelector("script") // eslint-disable-next-line @typescript-eslint/no-implied-eval
    if (script) setTimeout(script.innerHTML, 0)

    // Check if the category is still active
    if (
      !document.querySelector(
        `#wardrobe-menu li[data-category="${category}"].active`
      )
    )
      break

    eeItems.insertAdjacentHTML(
      "beforeend",
      Array.from(div.querySelectorAll<HTMLLIElement>("li.appearance-item"))
        .map(li => {
          li.dataset.category = category
          li.dataset.categoryid = categoryid
          li.dataset.group = group

          const icon = li.querySelector("img")?.src
          if (!icon) return li.outerHTML

          wardrobe.setItem({
            group: Number(group),
            icon,
            itemid: Number(li.dataset.itemid),
            name: li.dataset.name ?? "",
            rarity: li.dataset.rarity ?? "",
            rarityname: li.dataset.rarityname ?? "",
          })

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
