import type { Packet } from "../api/packet"
import { LocalStorage } from "../local_storage/local_storage"

export async function newBid(
	itemId: number,
	bidPrice: number,
): Promise<Packet<string>> {
	return new Promise(resolve => {
		void $.post(
			"/marketplace/newBid",
			{ id: itemId, bidPrice: bidPrice },
			(json: Packet<string>): void => {
				LocalStorage.meta = json.meta
				resolve(json)

				if (json.result !== "success") {
					$.flavrNotif(json.data)
					return
				}
			},
			"json",
		)
	})
}
