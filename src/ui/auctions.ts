import type { Template } from "hogan.js"
import { LocalStorage } from "../local_storage/local_storage"
import type { MarketHistory } from "../templates/interfaces/market_history"

export function loadAuctions(): void {
  if (location.pathname !== "/marketplace/auctions") return

  const marketplaceActiveAuctions = document.querySelector<HTMLDivElement>(
    "#marketplace-active-auctions"
  )
  if (!marketplaceActiveAuctions) return

  const layout2col = document.querySelector<HTMLDivElement>(
    ".marketplace-main-container #layout-2col"
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
      date: new Intl.DateTimeFormat("en-GB", {
        day: "numeric",
        month: "long",
        year: "numeric",
        hour: "2-digit",
        minute: "2-digit",
      }).format(new Date(purchase.date)),
    })),
    sales: [],
  }

  marketplaceActiveAuctions.insertAdjacentHTML(
    "beforeend",
    template.render(history)
  )

  for (const purchase of document.querySelectorAll<HTMLLIElement>(
    "#purchase-history .marketplace-auctions-item"
  )) {
    const itemid = purchase.dataset.itemid
    purchase.querySelector(".delete-button")?.addEventListener("click", () => {
      LocalStorage.purchases = LocalStorage.purchases.filter(
        purchase => purchase.itemid !== itemid
      )

      loadHistory(marketplaceActiveAuctions)
    })
  }
}
