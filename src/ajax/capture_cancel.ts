import type { Packet } from "../api/packet"
import { LocalStorage } from "../local_storage/local_storage"
import { Result } from "../typedoc"

export async function captureCancel(): Promise<Packet<void>> {
	return new Promise<Packet<void>>((resolve): void => {
		void $.post("/pet/capture/cancel", (json: Packet<void>): void => {
			LocalStorage.meta = json.meta
			resolve(json)

			if (json.result !== Result.success) {
				$.flavrNotif(json.data)
				return
			}
		})
	})
}
