import { LocalStorage } from "../local_storage/local_storage";
import { SessionStorage } from "../session_storage/session_storage";
import { loadExploration } from "../takeover/exploration";
import { loadDailies } from "./daily";
import { loadMinigames } from "./minigames";

/** Automated entry point of the takeover. */
export function loadTakeover(): void {
  if (SessionStorage.takeover) void takeover();
}

/** Manual entry point of the takeover. */
export function toggleTakeover(): void {
  resetTakeover();

  SessionStorage.takeover = !SessionStorage.takeover;
  if (SessionStorage.takeover)
    $.flavrNotif(
      "Takeover mode enabled. Please do not interact with this tab."
    );
  else $.flavrNotif("Takeover mode disabled.");

  void takeover();
}

function resetTakeover(): void {
  SessionStorage.explorationsDone = false;
  SessionStorage.minigamesDone = false;
  SessionStorage.selectedLocation = null;
}

async function takeover(): Promise<void> {
  if (!SessionStorage.takeover) return;

  if (await loadDailies()) resetTakeover();

  if (LocalStorage.minigames && !SessionStorage.minigamesDone)
    if (await loadMinigames()) return;

  if (
    LocalStorage.explorations &&
    !SessionStorage.explorationsDone &&
    LocalStorage.autoExploreLocations.length
  ) {
    if (await loadExploration()) return;
  }

  // Refresh after 1h.
  setTimeout(() => {
    location.reload();
  }, 3.6e6);
}
