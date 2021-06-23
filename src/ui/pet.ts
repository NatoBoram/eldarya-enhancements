import type { Template } from "hogan.js"
import { changeRegion } from "../ajax/change_region"
import { Result } from "../api/result.enum"
import type { MapRegion } from "../eldarya/current_region"
import type { AutoExploreLocation } from "../local_storage/auto_explore_location"
import { LocalStorage } from "../local_storage/local_storage"
import type { AutoExploreButton } from "../templates/interfaces/auto_explore_button"

let petObserver: MutationObserver | null

export function loadPet(): void {
  petObserver?.disconnect()
  petObserver = null

  if (location.pathname !== "/pet") return

  // `.page-main-container` changes background depending on the currently
  // selected region.
  const mainContainer = document.querySelector<HTMLDivElement>(
    ".page-main-container"
  )
  if (!mainContainer) return

  petObserver = new MutationObserver(loadPet)
  petObserver.observe(mainContainer, {
    attributes: true,
  })

  loadExplorations()
}

function loadExplorations(): void {
  const autoExploreLocations = LocalStorage.autoExploreLocations

  for (const div of document.querySelectorAll<HTMLDivElement>(
    ".map-location[data-id]"
  )) {
    const locationId = Number(div.getAttribute("data-id"))
    if (!locationId) continue

    loadPictoMap(autoExploreLocations, div)

    div.addEventListener("click", () => {
      new MutationObserver(
        (_: MutationRecord[], observer: MutationObserver): void => {
          addAutoExploreButton(locationId, observer)
        }
      ).observe(<Node>document.getElementById("map-location-preview"), {
        attributes: true,
      })
    })
  }
}

function addAutoExploreButton(
  locationId: number,
  observer?: MutationObserver
): void {
  const buttonsContainer =
    document.querySelector<HTMLDivElement>("#buttons-container")
  if (!buttonsContainer) return
  observer?.disconnect()

  // Parameters to be injected into the template
  const context: AutoExploreButton = {
    locationId,
    active: LocalStorage.autoExploreLocations.some(
      saved => saved.location.id === locationId.toString()
    ),
    regionId: Number(
      document
        .querySelector(".minimap.current[data-mapid]")
        ?.getAttribute("data-mapid")
    ),
  }

  // Add the auto explore button
  buttonsContainer.querySelector("#auto-explore-button")?.remove()
  const autoExploreTemplate: Template = require("../templates/html/auto_explore_button.html")
  buttonsContainer.insertAdjacentHTML(
    "beforeend",
    autoExploreTemplate.render(context)
  )

  // Bind `autoExplore` and `loadPictoMaps`
  buttonsContainer
    .querySelector<HTMLButtonElement>("#auto-explore-button")
    ?.addEventListener("click", () => {
      void autoExplore(context).then(loadPictoMaps)
    })

  void disableExplore(context)
}

async function disableExplore(context: AutoExploreButton): Promise<void> {
  const entry = await getAutoExploreEntry(context.regionId, context.locationId)
  if (!entry) return

  if (petEnergy < Number(entry.location.energyRequired))
    document.getElementById("explore-button")?.classList.add("disabled")
}

async function autoExplore(context: AutoExploreButton): Promise<void> {
  if (context.active) {
    const filteredLocations = LocalStorage.autoExploreLocations.filter(
      saved => saved.location.id !== context.locationId.toString()
    )
    LocalStorage.autoExploreLocations = filteredLocations
    addAutoExploreButton(context.locationId)
    return
  }

  const newAutoExplore = await getAutoExploreEntry(
    context.regionId,
    context.locationId
  )
  if (!newAutoExplore) return

  const newLocations = LocalStorage.autoExploreLocations
  newLocations.push(newAutoExplore)
  LocalStorage.autoExploreLocations = newLocations
  addAutoExploreButton(context.locationId)
}

async function getAutoExploreEntry(
  regionId: number,
  locationId: number
): Promise<AutoExploreLocation | null> {
  const region = await getRegion(regionId)
  if (!region) return null

  const location = region.locations.find(
    location => location.id === locationId.toString()
  )
  if (!location) return null

  return {
    location,
    region,
  }
}

async function getRegion(id: number): Promise<MapRegion | null> {
  if (id.toString() === currentRegion.id) return currentRegion

  const json = await changeRegion(id)
  if (json.result === Result.success) return json.data.currentRegion

  return null
}

// Picto map

function loadPictoMaps(): void {
  const autoExploreLocations = LocalStorage.autoExploreLocations
  for (const div of document.querySelectorAll<HTMLDivElement>(
    ".map-location[data-id]"
  )) {
    loadPictoMap(autoExploreLocations, div)
  }
}

function loadPictoMap(
  autoExploreLocations: AutoExploreLocation[],
  div: HTMLDivElement
): void {
  const mapLocation = div.getAttribute("data-id")
  if (!mapLocation) return

  div.style.backgroundImage = autoExploreLocations.some(
    saved => saved.location.id === mapLocation
  )
    ? "url(/static/img/new-layout/pet/icons/picto_map_explo.png)"
    : "url(/static/img/new-layout/pet/icons/picto_map.png)"
}
