import type { ExplorationResultsData } from "../api/exploration_results_data"
import type { Packet } from "../api/packet"
import { SessionStorage } from "../session_storage/session_storage"

export async function explorationResults(): Promise<
  Packet<ExplorationResultsData>
> {
  return new Promise<Packet<ExplorationResultsData>>((resolve): void => {
    void $.post(
      "/pet/explorationResults",
      (json: Packet<ExplorationResultsData>): void => {
        SessionStorage.meta = json.meta
        resolve(json)

        if (json.result !== "success") {
          $.flavrNotif(json.data)
          return
        }
      }
    )
  })
}
