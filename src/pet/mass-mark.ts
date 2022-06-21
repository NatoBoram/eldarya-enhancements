import { Console } from "../console"
import type { MapRegion } from "../eldarya/current_region"
import { translate } from "../i18n/translate"
import { LocalStorage } from "../local_storage/local_storage"

export async function loadMassMark(): Promise<void> {
  Console.debug("loadMassMark")

  document.getElementById("mass-mark")?.remove()

  const marked = isAllMarked(await waitForCurrentRegion())

  Console.debug("marked", marked)

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

  Console.debug("markAllButton", markAllButton)

  document
    .getElementById("buttons-container")
    ?.insertAdjacentElement("beforeend", markAllButton)
}

async function waitForCurrentRegion(): Promise<MapRegion> {
  return new Promise<MapRegion>(resolve => {
    const interval = setInterval(() => {
      try {
        if (typeof currentRegion !== "undefined") {
          clearInterval(interval)
          resolve(currentRegion)
        } else {
          Console.debug("currentRegion is undefined")
        }
      } catch (error: unknown) {
        Console.error("Couldn't access currentRegion", error)
      }
    }, 1_000)
  })
}

function isAllMarked(region: MapRegion): boolean {
  Console.debug("isAllMarked")

  const autoExploreLocations = LocalStorage.autoExploreLocations

  Console.debug("autoExploreLocations", autoExploreLocations)

  return !region.locations.find(
    location =>
      !autoExploreLocations.find(
        autoLocation => location.id === autoLocation.location.id
      )
  )
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
  void loadMassMark()
}

function unmarkRegion(region: MapRegion): void {
  LocalStorage.autoExploreLocations = LocalStorage.autoExploreLocations.filter(
    autoLocation =>
      !region.locations.find(
        location => location.id === autoLocation.location.id
      )
  )
  void loadMassMark()
}
