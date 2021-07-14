import type { Packet } from "../api/packet"
import { SessionStorage } from "../session_storage/session_storage"

export async function buy(itemId: number): Promise<Packet<"">> {
  return new Promise(resolve => {
    void $.post(
      "/marketplace/buy",
      { id: itemId },
      (json: Packet<"">): void => {
        SessionStorage.meta = json.meta
        resolve(json)

        if (json.result !== "success") {
          $.flavrNotif(json.data)
          return
        }
      },
      "json"
    )
  })
}
