import wardrobe from "./wardrobe"

/** Applies a few UI fixes to the dresser and setups the wardrobe */
export function loadAppearanceUI(): void {
  setupBackground()
  setupLeftPanel()
  setupRightPanel()

  if (wardrobe.availableItems) availableItems = wardrobe.availableItems
  else wardrobe.availableItems = availableItems
}

/** Unblurs the background image and pins it under the guardian */
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

/** Shifts the right UI a bit above to give more space for the item picker */
function setupRightPanel(): void {
  const rightPanel = document.getElementById("appearance-right")
  if (rightPanel) rightPanel.style.paddingTop = "80px"
}

/** Stretches the guardian's box and pins her to the screen so she's always in
 * sight when scrolling
 */
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
