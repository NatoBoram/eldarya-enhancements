import { LocalStorage } from "../local_storage/local_storage"
import type { ItemForSaleDataItem } from "../sell/item_for_sale_data_item"

export function loadSell(): void {
  if (location.pathname !== "/marketplace/sell") return
  const itemsForSale = document.querySelector<HTMLUListElement>(
    ".marketplace-itemsForSale-items"
  )
  if (!itemsForSale) return

  new MutationObserver(() => {
    handleItemsForSale(itemsForSale)
  }).observe(itemsForSale, { childList: true })
}

function handleItemsForSale(itemsForSale: HTMLUListElement): void {
  const lis = itemsForSale.querySelectorAll<HTMLLIElement>("li")

  for (const li of lis) {
    li.addEventListener("click", () => {
      const dataItem: ItemForSaleDataItem = JSON.parse(li.dataset.item ?? "{}")
      const icon = li.querySelector<HTMLImageElement>("img")?.src
      if (!icon) return

      const saleDetail = document.querySelector<HTMLDivElement>(
        "#marketplace-saleDetail"
      )
      if (!saleDetail) return

      new MutationObserver(
        (_: MutationRecord[], observer: MutationObserver) => {
          const sellButton = document.querySelector<HTMLDivElement>(
            ".marketplace-itemDetail-sell"
          )
          if (!sellButton) return
          observer.disconnect()

          handleSellButton(sellButton, dataItem, icon)
        }
      ).observe(saleDetail, { childList: true })
    })
  }
}

function handleSellButton(
  itemDetailSell: HTMLDivElement,
  dataItem: ItemForSaleDataItem,
  icon: string
): void {
  itemDetailSell.addEventListener("click", () => {
    const currentPrice = document.querySelector<HTMLInputElement>(
      "#marketplace-saleDetail-currentPrice"
    )?.value
    const buyNowPrice = document.querySelector<HTMLInputElement>(
      "#marketplace-saleDetail-buyNowPrice"
    )?.value

    if (!currentPrice || !buyNowPrice) return

    LocalStorage.sales = [
      {
        ...dataItem,
        currentPrice: Number(currentPrice),
        buyNowPrice: Number(buyNowPrice),
        icon,
        date: new Date(),
      },
      ...LocalStorage.sales,
    ]
  })
}
