export function loadAppearanceUI(): void {
  setupBackground()
  setupLeftPanel()
  setupRightPanel()
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
