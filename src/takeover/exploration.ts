import { captureEnd } from "../ajax/capture_end";
import { explorationResults } from "../ajax/exploration_results";
import { Result } from "../api/result.enum";
import type { Season } from "../eldarya/current_region";
import type { AutoExploreLocation } from "../local_storage/auto_explore_location";
import { LocalStorage } from "../local_storage/local_storage";
import { SessionStorage } from "../session_storage/session_storage";
import { click } from "./click";
import { ExplorationStatus } from "./exploration_status.enum";

export async function loadExploration(): Promise<boolean> {
  if (location.pathname !== "/pet") {
    await click<HTMLAnchorElement>(".main-menu-pet a");
    return true;
  }

  switch (getExplorationStatus()) {
    case ExplorationStatus.idle: {
      const selected = await startExploration();
      if (selected) {
        await waitExploration(selected);
        return loadExploration();
      }

      return false;
    }

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

async function startExploration(): Promise<AutoExploreLocation | null> {
  const selected = getSelectedLocation();
  if (!selected) {
    SessionStorage.explorationsDone = true;
    return selected;
  }

  // Go to season
  if (selected.region.season && getCurrentSeason() != selected.region.season) {
    await clickSeason();
    return selected;
  }

  // Go to region
  clickRegion(selected);

  // Go to location
  await clickLocation(selected);
  await clickExplore();

  SessionStorage.selectedLocation = null;
  return selected;
}

async function waitExploration(selected?: AutoExploreLocation): Promise<void> {
  let ms = 800;
  if (selected) ms = selected.location.timeToExplore * 60 * 1000;
  else if (timeLeftExploration && timeLeftExploration > 0)
    ms = timeLeftExploration * 1000;
  else if (!pendingTreasureHuntLocation) {
    const json = await explorationResults();
    if (json.result === Result.success) {
      const capture = json.data.results.find(
        (result) => result.type === "capture"
      );

      if (capture?.timeRestCapture) {
        ms = capture.timeRestCapture * 1000;
        await new Promise<void>((resolve) => setTimeout(resolve, ms));
        await captureEnd();
      }
    }

    location.reload();
  }

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
  const affordable = LocalStorage.autoExploreLocations.filter(
    (saved) => Number(saved.location.energyRequired) <= petEnergy
  );

  return affordable[Math.floor(Math.random() * affordable.length)] ?? null;
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
