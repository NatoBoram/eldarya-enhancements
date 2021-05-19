import type { ChangeRegionData } from "../api/change_region_data";
import type { Packet } from "../api/packet";

export async function changeRegion(
  newRegionId: number
): Promise<Packet<ChangeRegionData>> {
  return new Promise<Packet<ChangeRegionData>>((resolve, reject) => {
    void $.post(
      "/pet/changeRegion",
      { newRegionId },
      function (json: Packet<ChangeRegionData>) {
        // eslint-disable-next-line @typescript-eslint/no-unnecessary-condition
        if (json.result === "success") {
          currentRegion = json.data.currentRegion;

          pendingTreasureHuntLocation =
            typeof json.data.pendingTreasureHuntLocation == "undefined"
              ? null
              : json.data.pendingTreasureHuntLocation;

          timeLeftExploration =
            typeof json.data.timeLeftExploration == "undefined"
              ? null
              : json.data.timeLeftExploration;

          resolve(json);
        } else {
          $.flavrNotif(json.data);
          reject(json.data);
        }
      }
    );
  });
}
