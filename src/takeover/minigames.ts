import { playFlappy, playHatchlings, playPeggle } from "../minigames/emile";
import { flappy } from "../minigames/flappy";
import { hatchlings } from "../minigames/hatchlings";
import type { Minigame } from "../minigames/minigame";
import { peggle } from "../minigames/peggle";
import { SessionStorage } from "../session_storage/session_storage";
import { click } from "./click";

/** Determines if the minigames should be played right now.
 * @returns whether the minigames are currently being played.
 */
export async function loadMinigames(): Promise<boolean> {
  switch (location.pathname) {
    case "/minigames": {
      const playing =
        openMinigame(peggle) ||
        openMinigame(flappy) ||
        openMinigame(hatchlings);

      if (!playing) {
        SessionStorage.minigamesDone = true;
        document
          .querySelector<HTMLButtonElement>(
            '.minigames-rules [rel="btn-cancel"]'
          )
          ?.click();
      }

      return playing;
    }

    case "/minigames/gembomb":
      await playPeggle();
      break;

    case "/minigames/bubbltemple":
      await playFlappy();
      break;

    case "/minigames/cocooninpick":
      await playHatchlings();
      break;

    default:
      await click<HTMLAnchorElement>(".main-menu-minigames a");
      return true;
  }

  await click<HTMLAnchorElement>(".main-menu-minigames a");
  return true;
}

/** Click on a minigame's link. @returns whether the minigame was opened. */
function openMinigame(minigame: Minigame): boolean {
  const start = document.querySelector<HTMLSpanElement>(
    minigame.buttonSelector
  );
  if (!start) {
    return false;
  }

  start.click();
  return true;
}
