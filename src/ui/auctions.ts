import type { Template } from "hogan.js"
import { translate } from "../i18n/translate"
import { LocalStorage } from "../local_storage/local_storage"
import type { MarketHistory } from "../templates/interfaces/market_history"

export function loadAuctions(): void {
	if (location.pathname !== "/marketplace/auctions") return

	const marketplaceActiveAuctions = document.querySelector<HTMLDivElement>(
		"#marketplace-active-auctions",
	)
	if (!marketplaceActiveAuctions) return

	const layout2col = document.querySelector<HTMLDivElement>(
		".marketplace-main-container #layout-2col",
	)
	if (layout2col) layout2col.style.overflowX = "visible"

	loadHistory(marketplaceActiveAuctions)
}

function loadHistory(marketplaceActiveAuctions: HTMLDivElement): void {
	marketplaceActiveAuctions.querySelector("style")?.remove()
	marketplaceActiveAuctions.querySelector("#purchase-history")?.remove()
	marketplaceActiveAuctions.querySelector("#sale-history")?.remove()

	const template: Template = require("../templates/html/market_history.html")
	const history: MarketHistory = {
		purchases: LocalStorage.purchases.map(purchase => ({
			...purchase,
			date: translate.market.auctions.date_time_format.format(
				new Date(purchase.date),
			),
		})),
		sales: LocalStorage.sales.map(sale => ({
			...sale,
			date: translate.market.auctions.date_time_format.format(
				new Date(sale.date),
			),
		})),
	}

	marketplaceActiveAuctions.insertAdjacentHTML(
		"beforeend",
		template.render({ ...history, translate }),
	)

	for (const purchase of document.querySelectorAll<HTMLLIElement>(
		"#purchase-history .marketplace-auctions-item",
	)) {
		const itemid = purchase.dataset.itemid
		purchase.querySelector(".delete-button")?.addEventListener("click", () => {
			LocalStorage.purchases = LocalStorage.purchases.filter(
				purchase => purchase.itemid !== itemid,
			)

			loadHistory(marketplaceActiveAuctions)
		})
	}

	for (const sale of document.querySelectorAll<HTMLLIElement>(
		"#sale-history .marketplace-sales-item",
	)) {
		const icon = sale.querySelector<HTMLImageElement>(".abstract-icon img")?.src
		sale.querySelector(".delete-button")?.addEventListener("click", () => {
			LocalStorage.sales = LocalStorage.sales.filter(sale => sale.icon !== icon)

			loadHistory(marketplaceActiveAuctions)
		})
	}
}
