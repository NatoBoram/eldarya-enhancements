import type { Season } from "../eldarya/current_region";
import type { AutoExploreLocation } from "../local_storage/auto_explore_location";
import { LocalStorage } from "../local_storage/local_storage";
import { SessionStorage } from "../session_storage/session_storage";
import { ExplorationStatus } from "./exploration_status.enum";

export async function loadExploration(): Promise<boolean> {
  if (location.pathname !== "/pet") {
    document.querySelector<HTMLAnchorElement>(".main-menu-pet a")?.click();
    return true;
  }

  const explorationStatus = getExplorationStatus();
  switch (explorationStatus) {
    case ExplorationStatus.idle:
      return startExploration();

    case ExplorationStatus.pending:
      await waitExploration();
      return loadExploration();

    case ExplorationStatus.result:
      await endExploration();
      return loadExploration();

    case ExplorationStatus.capture:
      return false;

    default:
      return false;
  }
}

async function startExploration(): Promise<boolean> {
  const selected = getSelectedLocation();
  if (!selected) {
    SessionStorage.explorationsDone = true;
    return false;
  }

  // Go to season
  if (getCurrentSeason() != selected.region.season)
    return Boolean(await clickSeason());

  // Go to region
  if (currentRegion.id != selected.region.id) clickRegion(selected);

  // Go to location
  await clickLocation(selected);
  await clickExplore();

  // Refresh at the end of the exploration.
  await waitExploration(selected);

  return loadExploration();
}

async function waitExploration(selected?: AutoExploreLocation): Promise<void> {
  let ms = 800;
  if (selected) ms = selected.location.timeToExplore * 60 * 1000;
  else if (timeLeftExploration && timeLeftExploration > 0)
    ms = timeLeftExploration * 1000;

  await new Promise<void>((resolve) => setTimeout(resolve, ms));
}

async function endExploration(): Promise<HTMLDivElement> {
  return click("#close-result");
}

// Getters

function getExplorationStatus(): ExplorationStatus {
  if (document.querySelector("#pending-map-location-data-outer.active"))
    return ExplorationStatus.pending;
  else if (document.querySelector("#treasure-hunt-result-overlay.active"))
    return ExplorationStatus.result;
  else if (document.querySelector("#capture-interface-outer.active"))
    return ExplorationStatus.capture;
  return ExplorationStatus.idle;
}

function getSelectedLocation(): AutoExploreLocation | null {
  let selected = SessionStorage.selectedLocation;
  if (!selected) {
    selected = selectLocation();
    SessionStorage.selectedLocation = selected;
  }
  return selected;
}

function selectLocation(): AutoExploreLocation | null {
  // Get a season to explore
  const affordable = LocalStorage.autoExploreLocations.filter(
    (saved) => Number(saved.location.energyRequired) <= petEnergy
  );
  if (!affordable.length) return null;
  const season =
    affordable[Math.floor(Math.random() * affordable.length)]?.region.season;
  if (!season) return null;

  // Get a region to explore
  const seasonal = affordable.filter((a) => a.region.season === season);
  if (!seasonal.length) return null;
  const region = Number(
    seasonal[Math.floor(Math.random() * seasonal.length)]?.region.id
  );
  if (!region) return null;

  // Get a location to explore
  const regional = seasonal.filter((s) => s.region.id === region.toString());
  if (!regional.length) return null;
  const selected = regional[Math.floor(Math.random() * regional.length)];
  if (!selected) return null;

  return selected;
}

function getCurrentSeason(): Season {
  return <Season>(Array.from(document.querySelector("body")?.classList ?? [])
    .find((c) => c.startsWith("season-"))
    ?.replace("season-", "") ?? null);
}

// Clickers

async function clickSeason(): Promise<HTMLImageElement> {
  return click<HTMLImageElement>("#crystal-images-container");
}

function clickRegion(selected: AutoExploreLocation): HTMLDivElement | null {
  const div = document.querySelector<HTMLDivElement>(
    `.minimap[data-mapid="${selected.region.id}"]`
  );

  if (!div) {
    // Clearing invalid regions is useful to remove finished events.
    LocalStorage.autoExploreLocations =
      LocalStorage.autoExploreLocations.filter(
        (saved) => saved.region.id !== selected.region.toString()
      );

    SessionStorage.selectedLocation = null;
    location.reload();
    return null;
  }

  div.click();
  return div;
}

async function clickLocation(
  selected: AutoExploreLocation
): Promise<HTMLDivElement> {
  return click<HTMLDivElement>(
    `.map-location[data-id="${selected.location.id}"]`
  );
}

async function clickExplore(): Promise<HTMLButtonElement> {
  return click("#explore-button");
}

async function click<T extends HTMLElement>(selector: string): Promise<T> {
  return new Promise<T>((resolve) => {
    const interval = setInterval(() => {
      const element = document.querySelector<T>(selector);
      if (!element) return;
      clearInterval(interval);

      // Some elements don't have their click handlers ready until they're
      // hovered.
      const mouseEvent = document.createEvent("MouseEvent");
      mouseEvent.initEvent("mouseover");
      element.dispatchEvent(mouseEvent);

      setTimeout(() => {
        element.click();
        resolve(element);
      }, 800);
    }, 800);
  });
}
