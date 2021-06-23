import type { Template } from "hogan.js"
import { LocalStorage } from "../local_storage/local_storage"
import type { BuyNowPrice } from "../marketplace/interfaces/buy_now_price"
import type { CurrentPrice } from "../marketplace/interfaces/current_price"
import type { MarketEntry } from "../marketplace/interfaces/market_entry"
import type { MarketEntryDataSet } from "../marketplace/interfaces/market_entry_data_set"

let marketObserver: MutationObserver | null

export function loadMarket(): void {
  marketObserver?.disconnect()
  marketObserver = null

  if (location.pathname !== "/marketplace") return

  // `.marketplace-search-items` is the container whose HTML content is being
  // replaced on every action.
  const searchItems = document.querySelector<HTMLUListElement>(
    ".marketplace-search-items"
  )
  if (!searchItems) return

  marketObserver = new MutationObserver(loadWishlist)
  marketObserver.observe(searchItems, {
    childList: true,
  })

  loadWishlist()
}

function loadWishlist(): void {
  for (const li of document.querySelectorAll<HTMLLIElement>(
    ".marketplace-abstract"
  )) {
    li.addEventListener("click", () => {
      new MutationObserver(
        (_: MutationRecord[], observer: MutationObserver): void => {
          const marketEntry = getItemDetails(li)
          if (!marketEntry) return

          addWishistButton(marketEntry, observer)
        }
      ).observe(<Node>document.getElementById("marketplace-zoom"), {
        childList: true,
      })
    })
  }
}

function getItemDetails(li: HTMLLIElement): MarketEntry | null {
  const name = li.querySelector<HTMLDivElement>(".abstract-name")?.innerText
  const src = li.querySelector<HTMLImageElement>(".abstract-icon img")?.src

  const currentPrice = li.querySelector<HTMLImageElement>(
    ".price-item[data-bids]"
  )?.dataset as unknown as CurrentPrice

  const buyNowPrice = li.querySelector<HTMLImageElement>(
    ".price-item:not([data-bids])"
  )?.dataset as unknown as BuyNowPrice

  if (!src || !name) return null

  return {
    ...(li.dataset as unknown as MarketEntryDataSet),
    icon: src,
    name,
    buyNowPrice,
    currentPrice,
  }
}

function addWishistButton(
  marketEntry: MarketEntry,
  observer?: MutationObserver
): void {
  const buttonsContainer = document.querySelector<HTMLDivElement>(
    "#marketplace-itemDetail"
  )
  if (!buttonsContainer) return
  observer?.disconnect()

  document.getElementById("marketplace-itemDetail-info-autobuy")?.remove()
  const buttonTemplate: Template = require("../templates/html/auto_buy_button.html")
  buttonsContainer.insertAdjacentHTML("beforeend", buttonTemplate.render({}))

  buttonsContainer
    .querySelector<HTMLDivElement>("#marketplace-itemDetail-info-autobuy")
    ?.addEventListener("click", () => {
      addToWishlistFlavr(marketEntry)
    })
}

function addToWishlistFlavr(marketEntry: MarketEntry): void {
  const template: Template = require("../templates/html/auto_buy_flavr.html")

  $.flavr({
    content: template.render({}),
    buttons: {
      close: { style: "close" },
      save: {
        action: () => {
          const price = Number(
            document
              .querySelector<HTMLInputElement>(".flavr-prompt")
              ?.value.trim()
          )
          if (!price || price <= 0) {
            $.flavrNotif("This is not a valid price.")
            return false
          }

          const wishlist = LocalStorage.wishlist.filter(
            wishlistEntry => wishlistEntry.icon !== marketEntry.icon
          )
          wishlist.push({
            ...marketEntry,
            price,
          })
          LocalStorage.wishlist = wishlist
          return true
        },
      },
    },
    dialog: "prompt",
    prompt: {
      value: "",
    },
    onBuild: $container => {
      $container.addClass("new-layout-popup")
    },
  })
}
