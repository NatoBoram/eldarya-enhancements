import type { Packet } from "../api/packet"
import { Result } from "../api/result.enum"
import { LocalStorage } from "../local_storage/local_storage"

export async function buy(itemId: number): Promise<Packet<"">> {
	return new Promise(resolve => {
		void $.post(
			"/marketplace/buy",
			{ id: itemId },
			(json: Packet<"">): void => {
				LocalStorage.meta = json.meta
				resolve(json)

				if (json.result !== Result.success) {
					$.flavrNotif(json.data)
					return
				}
			},
			"json",
		)
	})
}
