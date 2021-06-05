import { TakeoverAction } from "../../session_storage/takeover_action.enum";
import { resetTakeover } from "../brain";
import type { Action } from "./action";
import { click } from "../click";

class DailyAction implements Action {
  readonly key = TakeoverAction.daily;

  /** Checks if the daily maana gift if there. */
  condition(): boolean {
    const dailyGiftContainer = document.getElementById("daily-gift-container");
    return (
      !!dailyGiftContainer &&
      getComputedStyle(dailyGiftContainer).display !== "none"
    );
  }

  /**
   * Click on the daily maana gift.
   * @returns `true` if the gift was available and clicked or `false` if it was
   * unavailable.
   */
  async perform(): Promise<boolean> {
    const dailyGiftContainer = document.getElementById("daily-gift-container");
    if (
      !dailyGiftContainer ||
      getComputedStyle(dailyGiftContainer).display === "none"
    ) {
      return false;
    }

    dailyGiftContainer.click();
    await click<HTMLButtonElement>(".first-connexion .flavr-button.default");

    resetTakeover();
    return true;
  }
}

export default new DailyAction();
