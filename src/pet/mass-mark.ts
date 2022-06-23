import { Console } from "../console"
import type { MapRegion } from "../eldarya/current_region"
import { translate } from "../i18n/translate"
import { LocalStorage } from "../local_storage/local_storage"
import { getMapLocationDataset } from "./map_location_dataset"
import { getMinimapDataset } from "./minimap_dataset"

export function loadMassMark(): void {
  setupMassMarkButton()
  handleClickMinimaps()
}

function setupMassMarkButton(): void {
  document.getElementById("mass-mark")?.remove()

  const marked = isAllMarked()

  const markAllButton = document.createElement("a")
  markAllButton.id = "mass-mark"
  markAllButton.classList.add("nl-button")
  markAllButton.style.marginRight = "0.6em"

  if (marked) {
    markAllButton.textContent = translate.pet.unmark_all
    markAllButton.addEventListener("click", () => unmarkRegion(currentRegion))
  } else {
    markAllButton.textContent = translate.pet.mark_all
    markAllButton.addEventListener("click", () => markRegion(currentRegion))
  }

  document
    .getElementById("buttons-container")
    ?.insertAdjacentElement("beforeend", markAllButton)
}

function handleClickMinimaps(): void {
  for (const minimap of document.querySelectorAll<HTMLDivElement>(".minimap"))
    minimap.addEventListener("click", () => handleClickMinimap(minimap))
}

/** Wait for the minimap to change then reload the mass mark button */
function handleClickMinimap(div: HTMLDivElement): void {
  const dataset = getMinimapDataset(div)
  const container = document.querySelector("#minimaps-container")
  if (!container)
    return void Console.error("Couldn't get #minimaps-container", container)

  new MutationObserver((mutations, observer) => {
    const found = mutations.find(
      mutation =>
        mutation.target instanceof HTMLDivElement &&
        mutation.target.classList.contains("minimap") &&
        mutation.target.classList.contains("current") &&
        getMinimapDataset(mutation.target).mapid === dataset.mapid
    )

    if (found) {
      observer.disconnect()
      setupMassMarkButton()
    }
  }).observe(container, {
    attributes: true,
    subtree: true,
  })
}

function isAllMarked(): boolean {
  const autoExploreLocations = LocalStorage.autoExploreLocations

  return Array.from(
    document.querySelectorAll<HTMLDivElement>(
      "#map-locations-container .map-location"
    )
  ).every(location => {
    const dataset = getMapLocationDataset(location)

    return autoExploreLocations.find(
      autoLocation => dataset.id === autoLocation.location.id
    )
  })
}

function markRegion(region: MapRegion): void {
  const autoExploreLocations = LocalStorage.autoExploreLocations
  autoExploreLocations.push(
    ...region.locations
      .filter(
        newLocation =>
          !autoExploreLocations.find(
            autoLocation => autoLocation.location.id === newLocation.id
          )
      )
      .map(newLocation => ({ location: newLocation, region: region }))
  )

  LocalStorage.autoExploreLocations = autoExploreLocations
  setupMassMarkButton()
}

function unmarkRegion(region: MapRegion): void {
  LocalStorage.autoExploreLocations = LocalStorage.autoExploreLocations.filter(
    autoLocation =>
      !region.locations.find(
        location => location.id === autoLocation.location.id
      )
  )
  setupMassMarkButton()
}
