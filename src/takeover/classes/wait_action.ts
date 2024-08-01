import { Console } from "../../console"
import { TakeoverAction } from "../../session_storage/takeover_action.enum"
import type { Action } from "./action"

class WaitAction implements Action {
	readonly key = TakeoverAction.wait

	condition(): boolean {
		return true
	}

	async perform(): Promise<boolean> {
		Console.log(`Waiting for 10 minutes...`)

		return new Promise<boolean>(resolve =>
			setTimeout(
				() => {
					resolve(false)
				},
				10 * 60 * 1000,
			),
		)
	}
}

export default new WaitAction()
