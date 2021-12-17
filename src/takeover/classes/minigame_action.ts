import { LocalStorage } from "../../local_storage/local_storage"
import { playFlappy, playHatchlings, playPeggle } from "../../minigames/emile"
import { flappy } from "../../minigames/flappy"
import { hatchlings } from "../../minigames/hatchlings"
import type { Minigame } from "../../minigames/minigame"
import { peggle } from "../../minigames/peggle"
import { SessionStorage } from "../../session_storage/session_storage"
import { TakeoverAction } from "../../session_storage/takeover_action.enum"
import type { Action } from "./action"

class MinigameAction implements Action {
  readonly key = TakeoverAction.minigames

  condition(): boolean {
    return LocalStorage.minigames && !SessionStorage.minigamesDone
  }

  /** Determines if the minigames should be played right now.
   * @returns whether the minigames are currently being played.
   */
  async perform(): Promise<boolean> {
    switch (location.pathname) {
      case "/minigames": {
        const playing =
          this.openMinigame(peggle) ||
          this.openMinigame(flappy) ||
          this.openMinigame(hatchlings)

        if (!playing) {
          SessionStorage.minigamesDone = true
          document
            .querySelector<HTMLButtonElement>(
              '.minigames-rules [rel="btn-cancel"]'
            )
            ?.click()
        }

        return playing
      }

      case "/minigames/gembomb":
        await playPeggle()
        break

      case "/minigames/bubbltemple":
        await playFlappy()
        break

      case "/minigames/cocooninpick":
        await playHatchlings()
        break

      default:
        pageLoad("/minigames")
        return true
    }

    pageLoad("/minigames")
    return true
  }

  /** Click on a minigame's link. @returns whether the minigame was opened. */
  private openMinigame(minigame: Minigame): boolean {
    const start = document.querySelector<HTMLSpanElement>(
      minigame.buttonSelector
    )
    if (!start) {
      return false
    }

    start.click()
    return true
  }
}

export default new MinigameAction()
