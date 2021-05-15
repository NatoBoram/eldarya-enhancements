import { playFlappy, playHatchlings, playPeggle } from "../minigames/emile";
import { flappy } from "../minigames/flappy";
import { hatchlings } from "../minigames/hatchlings";
import type { Minigame } from "../minigames/minigame";
import { peggle } from "../minigames/peggle";
import { SessionStorage } from "../session_storage/session_storage";

export async function loadMinigames(): Promise<boolean> {
  switch (location.pathname) {
    case "/minigames": {
      const playing =
        loadMinigame(peggle) ||
        loadMinigame(flappy) ||
        loadMinigame(hatchlings);

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
      return false;
  }

  document.querySelector<HTMLAnchorElement>(".main-menu-minigames a")?.click();
  return true;
}

function loadMinigame(minigame: Minigame): boolean {
  const start = document.querySelector<HTMLSpanElement>(
    minigame.buttonSelector
  );
  if (!start) {
    return false;
  }

  start.click();
  return true;
}
