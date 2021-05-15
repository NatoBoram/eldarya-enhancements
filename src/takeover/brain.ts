import { LocalStorage } from "../local_storage/local_storage";
import { SessionStorage } from "../session_storage/session_storage";
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
  SessionStorage.minigamesDone = false;
}

async function takeover(): Promise<void> {
  if (!SessionStorage.takeover) return;

  if (await loadDailies()) resetTakeover();

  if (LocalStorage.minigames && !SessionStorage.minigamesDone)
    if (await loadMinigames()) return;
    else
      return document
        .querySelector<HTMLAnchorElement>(".main-menu-minigames a")
        ?.click();

  // Refresh after 1h.
  setTimeout(() => {
    location.reload();
  }, 3.6e6);
}
