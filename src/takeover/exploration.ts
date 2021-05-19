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
      return false;

    case ExplorationStatus.active:
      endExploration();
      return startExploration();

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
  const currentSeason = getCurrentSeason();
  if (currentSeason != selected.region.season) {
    document
      .querySelector<HTMLImageElement>("#crystal-images-container")
      ?.click();
    return true;
  }

  // Go to region
  const regionButton = document.querySelector<HTMLDivElement>(
    `.minimap[data-mapid="${selected.region.id}"]`
  );
  if (!regionButton) {
    // Clearing invalid regions is useful to remove finished events.
    LocalStorage.autoExploreLocations =
      LocalStorage.autoExploreLocations.filter(
        (saved) => saved.region.id !== selected.region.toString()
      );
    SessionStorage.selectedLocation = null;
    location.reload();
    return true;
  }
  regionButton.click();

  // Go to location
  await clickLocation(selected);
  await clickExplore();

  // Refresh at the end of the exploration.
  setTimeout(() => {
    void loadExploration();
  }, selected.location.timeToExplore * 60 * 1000);

  return true;
}

function getCurrentSeason(): Season {
  return <Season>(Array.from(document.querySelector("body")?.classList ?? [])
    .find((c) => c.startsWith("season-"))
    ?.replace("season-", "") ?? null);
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

async function clickLocation(
  selected: AutoExploreLocation
): Promise<HTMLDivElement> {
  return new Promise<HTMLDivElement>((resolve) => {
    const interval = setInterval(() => {
      const pending = document
        .querySelector<HTMLDivElement>("#map-container")
        ?.classList.contains("pending");
      const indicator = document.querySelector<HTMLDivElement>(
        `.map-location[data-id="${selected.location.id}"]`
      );
      if (pending || !indicator) return;
      clearInterval(interval);

      const mouseEvent = document.createEvent("MouseEvent");
      mouseEvent.initEvent("mouseover");
      indicator.dispatchEvent(mouseEvent);

      indicator.click();
      resolve(indicator);
    }, 250);
  });
}

async function clickExplore(): Promise<HTMLButtonElement> {
  return new Promise<HTMLButtonElement>((resolve) => {
    const interval = setInterval(() => {
      const button =
        document.querySelector<HTMLButtonElement>("#explore-button");
      if (!button) return;
      clearInterval(interval);

      button.click();
      resolve(button);
    }, 250);
  });
}

function getExplorationStatus(): ExplorationStatus {
  if (document.querySelector("#result-content.active"))
    return ExplorationStatus.active;
  else if (document.querySelector("#map-container.pending"))
    return ExplorationStatus.pending;
  else if (document.querySelector("#capture-pre-timer"))
    return ExplorationStatus.capture;
  return ExplorationStatus.idle;
}

function endExploration() {
  document.querySelector<HTMLDivElement>("#close-result")?.click();
}
