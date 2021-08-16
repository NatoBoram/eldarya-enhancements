import type { Template } from "hogan.js"
import { translate } from "../i18n/translate"
import { loadBackground } from "./dressing_experience"
import wardrobe from "./wardrobe"

export function loadAppearanceUI(): void {
  setupBackground()
  setupLeftPanel()
  setupRightPanel()
  loadAvatarPictoActions(0, undefined)

  if (wardrobe.availableItems) availableItems = wardrobe.availableItems
  else wardrobe.availableItems = availableItems
}

function setupBackground(): void {
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
}

function setupRightPanel(): void {
  const rightPanel = document.getElementById("appearance-right")
  if (rightPanel) rightPanel.style.paddingTop = "80px"
}

function setupLeftPanel(): void {
  const previewOuter = document.getElementById("appearance-preview-outer")
  if (previewOuter) {
    previewOuter.style.padding = "0px"
  }

  const preview = document.getElementById("appearance-preview")
  if (preview) {
    preview.style.left = "0"
    preview.style.position = "fixed"
    preview.style.top = "calc(50% - var(--topbar-height))"
    preview.style.transform = "translateY(-50%)"
  }

  const canvas = document.querySelector<HTMLCanvasElement>(
    "#appearance-preview canvas"
  )
  if (canvas) {
    canvas.style.maxHeight = "100vh"
    canvas.style.maxWidth = "50vw"
  }
}

/** Picto action for loading in the background */
export function loadAvatarPictoActions(
  percentage: number,
  categoryname?: string
): void {
  const avatarPictoActions = document.getElementById("avatar-picto-actions")
  const template: Template = require("../templates/html/avatar_picto_action_load.html")

  let tooltip: string
  if (!percentage) {
    tooltip = translate.appearance.buttons.load_tooltip
  } else if (categoryname && percentage !== 1) {
    tooltip = translate.appearance.buttons.loadin_category_tooltip(categoryname)
  } else {
    tooltip = translate.appearance.buttons.loaded_tooltip
  }

  const red = -186
  const green = -66

  const rendered = template.render({
    translate,
    deg: (red + percentage * (green - red)).toFixed(0),
    tooltip,
  })
  document.getElementById("appearance-load-container")?.remove()
  avatarPictoActions?.insertAdjacentHTML("afterbegin", rendered)

  if (!percentage) {
    document
      .querySelector<HTMLDivElement>("#appearance-load-container")
      ?.addEventListener("click", () => void loadBackground())
  }
}
