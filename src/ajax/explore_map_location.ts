import type { ExploreMapLocationData } from "../api/explore_map_location_data"
import type { Packet } from "../api/packet"
import { LocalStorage } from "../local_storage/local_storage"

export async function exploreMapLocation(
  mapLocationId: number
): Promise<Packet<ExploreMapLocationData>> {
  return new Promise<Packet<ExploreMapLocationData>>((resolve): void => {
    void $.post(
      "/pet/exploreMapLocation",
      { mapLocationId },
      (json: Packet<ExploreMapLocationData>): void => {
        LocalStorage.meta = json.meta
        resolve(json)

        if (json.result !== "success") {
          $.flavrNotif(json.data)
          return
        }
      }
    )
  })
}
