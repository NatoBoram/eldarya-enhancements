import { Console } from "../console"
import { trimIcon } from "../eldarya_util"
import { Rarity } from "./enums/rarity.enum"
import type { BuyNowPrice } from "./interfaces/buy_now_price"
import type { CurrentPrice } from "./interfaces/current_price"
import type { MarketEntry } from "./interfaces/market_entry"
import type { MarketEntryDataSet } from "./interfaces/market_entry_data_set"

export function getItemDetails(li: HTMLLIElement): MarketEntry | null {
	const dataset = li.dataset as unknown as MarketEntryDataSet
	const name = li.querySelector<HTMLDivElement>(".abstract-name")?.innerText
	const abstractType =
		li.querySelector<HTMLDivElement>(".abstract-type")?.innerText
	const src = li.querySelector<HTMLImageElement>(".abstract-icon img")?.src

	const rarity: Rarity =
		Rarity[
			(li
				.querySelector(
					".rarity-marker-common, .rarity-marker-rare, .rarity-marker-epic, .rarity-marker-legendary, .rarity-marker-event",
				)
				?.className.split("rarity-marker-")[1] ?? "") as keyof typeof Rarity
		]

	const currentPrice = li.querySelector<HTMLImageElement>(
		".price-item[data-bids]",
	)?.dataset as unknown as CurrentPrice

	const buyNowPrice = li.querySelector<HTMLImageElement>(
		".price-item:not([data-bids])",
	)?.dataset as unknown as BuyNowPrice

	if (!src || !name) {
		Console.warn("Incomplete market entry", li)
		return null
	}

	return {
		...dataset,
		icon: trimIcon(src),
		rarity,
		name,
		abstractType,
		buyNowPrice,
		currentPrice,
		date: new Date(),
	}
}
