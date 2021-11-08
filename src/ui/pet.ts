import { loadMarkers } from "../pet/exploration"
import { loadExplorationHistory } from "../pet/exploration-history"

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
  loadExplorations()
  loadExplorationHistory()
}
