import type { Template } from "hogan.js"
import { LocalStorage } from "../local_storage/local_storage"
import type { WishedItem } from "../local_storage/wished_item"
import type { MarketEntry } from "../marketplace/interfaces/market_entry"
import { getItemDetails } from "../marketplace/marketplace_handlers"

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
          const wished: WishedItem = { ...marketEntry, price }
          wishlist.push(wished)
          LocalStorage.wishlist = wishlist

          const template: Template = require("../templates/html/flavr_notif/added_to_wishlist.html")
          $.flavrNotif(template.render(wished))
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
