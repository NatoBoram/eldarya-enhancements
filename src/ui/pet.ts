import type { Template } from "hogan.js";
import { changeRegion } from "../ajax/change_region";
import { Result } from "../api/result.enum";
import type { MapRegion } from "../eldarya/current_region";
import type { AutoExploreLocation } from "../local_storage/auto_explore_location";
import { LocalStorage } from "../local_storage/local_storage";
import type { AutoExploreButton } from "../templates/interfaces/auto_explore_button";

let petObserver: MutationObserver | null;

export function loadPet(): void {
  petObserver?.disconnect();
  petObserver = null;

  if (location.pathname !== "/pet") return;

  // `.page-main-container` changes background depending on the currently
  // selected region.
  const appearanceItems = document.querySelector<HTMLDivElement>(
    ".page-main-container"
  );
  if (!appearanceItems) return;

  petObserver = new MutationObserver(loadPet);
  petObserver.observe(appearanceItems, {
    attributes: true,
  });

  loadExplorations();
}

function loadExplorations(): void {
  const autoExploreLocations = LocalStorage.autoExploreLocations;
  for (const div of document.querySelectorAll<HTMLDivElement>(
    ".map-location[data-id]"
  )) {
    const mapLocation = Number(div.getAttribute("data-id"));
    if (!mapLocation) continue;

    loadPictoMap(autoExploreLocations, div);

    div.addEventListener("click", () => {
      new MutationObserver(
        (_: MutationRecord[], observer: MutationObserver): void => {
          addAutoExploreButton(mapLocation, observer);
        }
      ).observe(<Node>document.getElementById("map-location-preview"), {
        attributes: true,
      });
    });
  }
}

function addAutoExploreButton(
  mapLocation: number,
  observer?: MutationObserver
): void {
  const buttonsContainer =
    document.querySelector<HTMLDivElement>("#buttons-container");

  if (!buttonsContainer) return;
  observer?.disconnect();

  const exploreContext: AutoExploreButton = {
    mapLocation,
    active: LocalStorage.autoExploreLocations.some(
      (saved) => saved.location.id === mapLocation.toString()
    ),
    currentRegionId: Number(
      document
        .querySelector(".minimap.current[data-mapid]")
        ?.getAttribute("data-mapid")
    ),
  };

  buttonsContainer.querySelector("#auto-explore-button")?.remove();
  const autoExploreTemplate: Template = require("../templates/html/auto_explore_button.html");
  buttonsContainer.insertAdjacentHTML(
    "beforeend",
    autoExploreTemplate.render(exploreContext)
  );

  buttonsContainer
    .querySelector<HTMLButtonElement>("#auto-explore-button")
    ?.addEventListener("click", () => {
      void autoExplore(exploreContext).then(loadPictoMaps);
    });
}

async function autoExplore(exploreContext: AutoExploreButton): Promise<void> {
  if (exploreContext.active) {
    LocalStorage.autoExploreLocations =
      LocalStorage.autoExploreLocations.filter(
        (saved) => saved.location.id !== exploreContext.mapLocation.toString()
      );
    addAutoExploreButton(exploreContext.mapLocation);
    return;
  }

  const region = await getRegion(exploreContext);
  if (!region) return;

  const location = region.locations.find(
    (location) => location.id === exploreContext.mapLocation.toString()
  );
  if (!location) return;

  const autoExploreLocations = LocalStorage.autoExploreLocations;
  autoExploreLocations.push({
    location,
    region,
  });

  LocalStorage.autoExploreLocations = autoExploreLocations;
  addAutoExploreButton(exploreContext.mapLocation);
}

async function getRegion(
  exploreContext: AutoExploreButton
): Promise<MapRegion | null> {
  if (exploreContext.currentRegionId.toString() === currentRegion.id)
    return currentRegion;

  const json = await changeRegion(exploreContext.currentRegionId);
  if (json.result === Result.success) return json.data.currentRegion;

  return null;
}

function loadPictoMaps(): void {
  const autoExploreLocations = LocalStorage.autoExploreLocations;
  for (const div of document.querySelectorAll<HTMLDivElement>(
    ".map-location[data-id]"
  )) {
    loadPictoMap(autoExploreLocations, div);
  }
}

function loadPictoMap(
  autoExploreLocations: AutoExploreLocation[],
  div: HTMLDivElement
): void {
  const mapLocation = div.getAttribute("data-id");
  if (!mapLocation) return;

  div.style.backgroundImage = autoExploreLocations.some(
    (saved) => saved.location.id === mapLocation
  )
    ? "url(/static/img/new-layout/pet/icons/picto_map_explo.png)"
    : "url(/static/img/new-layout/pet/icons/picto_map.png)";
}
