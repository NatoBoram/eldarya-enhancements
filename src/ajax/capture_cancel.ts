import type { Packet } from "../api/packet"
import { SessionStorage } from "../session_storage/session_storage"

export async function captureCancel(): Promise<Packet<void>> {
  return new Promise<Packet<void>>((resolve): void => {
    void $.post("/pet/capture/cancel", (json: Packet<void>): void => {
      SessionStorage.meta = json.meta
      resolve(json)

      if (json.result !== "success") {
        $.flavrNotif(json.data)
        return
      }
    })
  })
}
