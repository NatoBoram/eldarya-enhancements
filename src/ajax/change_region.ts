import type { ChangeRegionData } from "../api/change_region_data"
import type { Packet } from "../api/packet"
import { LocalStorage } from "../local_storage/local_storage"

export async function changeRegion(
  newRegionId: number
): Promise<Packet<ChangeRegionData>> {
  return new Promise<Packet<ChangeRegionData>>((resolve): void => {
    void $.post(
      "/pet/changeRegion",
      { newRegionId },
      (json: Packet<ChangeRegionData>): void => {
        LocalStorage.meta = json.meta
        resolve(json)

        if (json.result !== "success") {
          $.flavrNotif(json.data)
          return
        }

        currentRegion = json.data.currentRegion

        pendingTreasureHuntLocation =
          typeof json.data.pendingTreasureHuntLocation === "undefined"
            ? null
            : json.data.pendingTreasureHuntLocation

        timeLeftExploration =
          typeof json.data.timeLeftExploration === "undefined"
            ? null
            : json.data.timeLeftExploration
      }
    )
  })
}
