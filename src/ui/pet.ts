import { Console } from "../console"
import { loadMarkers } from "../pet/exploration"
import { loadExplorationHistory, onClickPet } from "../pet/exploration-history"
import { loadMassMark } from "../pet/mass_mark"

let petObserver: MutationObserver | null

function loadExplorations(): void {
  petObserver?.disconnect()
  petObserver = null

  /** `.page-main-container` changes background depending on the currently selected region. */
  const mainContainer = document.querySelector<HTMLDivElement>(
    ".page-main-container"
  )
  if (!mainContainer) return

  petObserver = new MutationObserver(loadExplorations)
  petObserver.observe(mainContainer, {
    attributes: true,
  })

  loadMarkers()
}

export function loadPet(): void {
  if (location.pathname !== "/pet") return
  createButtonRow()

  loadExplorations()
  loadExplorationHistory()
  loadMassMark()
}

function createButtonRow(): void {
  const closeExplorationButton = document.querySelector<HTMLAnchorElement>(
    "#close-treasure-hunt-interface"
  )
  if (!closeExplorationButton)
    return Console.error("Couldn't find #close-treasure-hunt-interface.")

  closeExplorationButton.style.display = "inline-block"
  closeExplorationButton.style.marginRight = "0.6em"
  closeExplorationButton.style.position = "relative"
  closeExplorationButton.style.right = "0"
  closeExplorationButton.style.top = "0"
  closeExplorationButton.addEventListener("click", onClickPet)

  const row = document.createElement("div")
  row.id = "ee-buttons-row"
  row.insertAdjacentElement("beforeend", closeExplorationButton)

  document
    .querySelector<HTMLDivElement>("#right-container-inner")
    ?.insertAdjacentElement("afterbegin", row)
}
