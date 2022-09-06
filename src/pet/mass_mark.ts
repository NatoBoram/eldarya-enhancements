import type { Template } from "hogan.js"
import { Console } from "../console"
import type { MapRegion } from "../eldarya/current_region"
import { LocalStorage } from "../local_storage/local_storage"
import { getRegion, reloadMarkers } from "./exploration"
import { getMapLocationDataset } from "./map_location_dataset"
import { markAllContext, unmarkAllContext } from "./mark_context"
import { getMinimapDataset } from "./minimap_dataset"

export function loadMassMark(): void {
  void setupMassMarkButton()
  handleClickMinimaps()
}

async function setupMassMarkButton(): Promise<void> {
  document.getElementById("mass-mark")?.remove()

  const marked = isAllMarked()
  const template: Template = require("../templates/html/mass_mark_button.html")
  const rendered = template.render(marked ? unmarkAllContext : markAllContext)

  document
    .getElementById("buttons-container")
    ?.insertAdjacentHTML("beforeend", rendered)

  const id = getCurrentRegionId()
  if (!id) return
  const region = await getRegion(id)
  if (!region) return

  const inserted = document.getElementById("mass-mark")
  inserted?.addEventListener("click", () =>
    marked ? void unmarkRegion(region) : void markRegion(region)
  )
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
    return Console.error("Couldn't get #minimaps-container", container)

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
      void setupMassMarkButton()
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

    return autoExploreLocations.some(
      autoLocation => dataset.id === autoLocation.location.id
    )
  })
}

async function markRegion(region: MapRegion): Promise<void> {
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
  await setupMassMarkButton()
  reloadMarkers()
}

async function unmarkRegion(region: MapRegion): Promise<void> {
  LocalStorage.autoExploreLocations = LocalStorage.autoExploreLocations.filter(
    autoLocation =>
      !region.locations.find(
        location => location.id === autoLocation.location.id
      )
  )

  await setupMassMarkButton()
  reloadMarkers()
}

function getCurrentRegionId(): number | null {
  const div = document.querySelector<HTMLDivElement>(".minimap.current")
  if (!div) return Number(currentRegion.id)
  return Number(getMinimapDataset(div).mapid)
}
