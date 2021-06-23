import type { ExplorationResultsData } from "../api/exploration_results_data"
import type { Packet } from "../api/packet"
import { SessionStorage } from "../session_storage/session_storage"

export async function captureEnd(): Promise<Packet<ExplorationResultsData>> {
  return new Promise(resolve => {
    void $.post(
      "/pet/capture/end",
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
