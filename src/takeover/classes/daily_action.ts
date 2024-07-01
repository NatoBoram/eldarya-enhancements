import { TakeoverAction } from "../../session_storage/takeover_action.enum"
import { resetTakeover } from "../brain"
import { click } from "../click"
import type { Action } from "./action"

class DailyAction implements Action {
	readonly key = TakeoverAction.daily

	/** Checks if the daily maana gift if there. */
	condition(): boolean {
		const dailyGiftContainer = document.getElementById("daily-gift-container")
		return (
			!!dailyGiftContainer &&
			getComputedStyle(dailyGiftContainer).display !== "none"
		)
	}

	/**
	 * Click on the daily maana gift.
	 * @returns `false`. This action does not perform meaningful actions on the
	 * page.
	 */
	async perform(): Promise<boolean> {
		const dailyGiftContainer = document.getElementById("daily-gift-container")
		if (
			!dailyGiftContainer ||
			getComputedStyle(dailyGiftContainer).display === "none"
		) {
			return false
		}

		dailyGiftContainer.click()
		await click<HTMLButtonElement>(".first-connexion .flavr-button.default")

		resetTakeover()
		return false
	}
}

export default new DailyAction()
