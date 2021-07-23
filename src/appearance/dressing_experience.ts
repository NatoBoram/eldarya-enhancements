import type { Template } from "hogan.js"

export function loadDressingExperience(): void {
  if (!location.pathname.startsWith("/player/appearance")) return

  // Setup background
  const background = document.querySelector<HTMLImageElement>(
    "#avatar-background img"
  )
  if (background) {
    background.style.filter = "unset"
    background.style.height = "unset"
    background.style.mask =
      "linear-gradient(to right, black 50%, transparent 100%)"
    background.style.minHeight = "100vh"
    background.style.minWidth = "50vw"
    background.style.position = "fixed"
    background.style.transform = "unset"
    background.style.width = "unset"
  }

  // Setup preview outer
  const previewOuter = document.getElementById("appearance-preview-outer")
  if (previewOuter) {
    previewOuter.style.padding = "0px"
  }

  // Setup preview
  const preview = document.getElementById("appearance-preview")
  if (preview) {
    preview.style.left = "0"
    preview.style.position = "fixed"
    preview.style.top = "calc(50% - var(--topbar-height))"
    preview.style.transform = "translateY(-50%)"
  }

  // Setup canvas
  const canvas = document.querySelector<HTMLCanvasElement>(
    "#appearance-preview canvas"
  )
  if (canvas) {
    canvas.style.maxHeight = "100vh"
    canvas.style.maxWidth = "50vw"
  }

  // Setup right panel
  const rightPanel = document.getElementById("appearance-right")
  if (rightPanel) rightPanel.style.paddingTop = "80px"

  // Setup categories
  for (const li of document.querySelectorAll<HTMLLIElement>(
    "#wardrobe-menu>li, #appearance-items-categories li"
  )) {
    const { category } = li.dataset
    if (!category) continue

    switch (category) {
      case "background":
      case "favorites":
        document.getElementById("ee-category")?.remove()
        continue
      case "attic":
        continue
      default:
        li.addEventListener("click", () => handleCategory(category))
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
  const { category, categoryid } = categoryContainer.dataset
  if (!category || !categoryid) return
  categoryContainer.classList.remove("active")
  categoryContainer.style.display = "none"

  // Setup appearance_items_category
  const template: Template = require("../templates/html/appearance_items_category.html")
  document.getElementById("ee-category")?.remove()
  appearanceItems.insertAdjacentHTML(
    "beforeend",
    template.render({ category, categoryid })
  )

  const eeItems = document.querySelector("#ee-items")
  if (!eeItems) return

  for (const li of categoryContainer.querySelectorAll<HTMLLIElement>(
    "li.appearance-item-group"
  )) {
    const { group } = li.dataset
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

    const script = div.querySelector("script")
    // eslint-disable-next-line @typescript-eslint/no-implied-eval
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
          return li.outerHTML
        })
        .join("\n")
    )
  }

  initializeSelectedItems()
  initializeHiddenCategories()
}
