import type { ExplorationResultsData } from "../api/exploration_results_data"
import type { Packet } from "../api/packet"
import { Result } from "../api/result.enum"
import { LocalStorage } from "../local_storage/local_storage"

export async function explorationResults(): Promise<
	Packet<ExplorationResultsData>
> {
	return new Promise<Packet<ExplorationResultsData>>((resolve): void => {
		void $.post(
			"/pet/explorationResults",
			(json: Packet<ExplorationResultsData>): void => {
				LocalStorage.meta = json.meta
				resolve(json)

				if (json.result !== Result.success) {
					$.flavrNotif(json.data)
					return
				}
			},
		)
	})
}
