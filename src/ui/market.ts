import type { Template } from "hogan.js"
import { translate } from "../i18n/translate"
import { LocalStorage } from "../local_storage/local_storage"
import type { WishedItem } from "../local_storage/wished_item"
import { Rarity } from "../marketplace/enums/rarity.enum"
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
    li.addEventListener("click", () =>
      new MutationObserver(
        (_: MutationRecord[], observer: MutationObserver): void => {
          const marketEntry = getItemDetails(li)
          if (!marketEntry) return

          addWishistButton(marketEntry, observer)
        }
      ).observe(document.getElementById("marketplace-zoom") as Node, {
        childList: true,
      })
    )
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
  hijackBuyButtons(marketEntry)

  document.getElementById("marketplace-itemDetail-info-autobuy")?.remove()
  const buttonTemplate: Template = require("../templates/html/auto_buy_button.html")
  buttonsContainer.insertAdjacentHTML(
    "beforeend",
    buttonTemplate.render({ translate })
  )

  buttonsContainer
    .querySelector<HTMLDivElement>("#marketplace-itemDetail-info-autobuy")
    ?.addEventListener("click", () => addToWishlistFlavr(marketEntry))
}

export function addToWishlistFlavr(marketEntry: MarketEntry): void {
  const template: Template = require("../templates/html/auto_buy_flavr.html")

  $.flavr({
    content: template.render({ translate }),
    buttons: {
      close: { style: "close" },
      save: {
        action: () => save(marketEntry),
      },
    },
    dialog: "prompt",
    prompt: {
      value: "",
    },
    onBuild: $container => {
      $container.addClass("new-layout-popup")

      document
        .querySelector<HTMLInputElement>(".flavr-prompt")
        ?.addEventListener("keyup", ({ key }) => {
          if (key !== "Enter") return
          save(marketEntry)
        })
    },
  })
}

function save(marketEntry: MarketEntry): boolean {
  const price = Number(
    document.querySelector<HTMLInputElement>(".flavr-prompt")?.value.trim()
  )
  if (!price || price <= 0) {
    $.flavrNotif(translate.market.add_to_wishlist.invalid_price)
    return false
  }

  const wishlist = LocalStorage.wishlist.filter(
    wishlistEntry => wishlistEntry.icon !== marketEntry.icon
  )
  const wished: WishedItem = { ...marketEntry, price }
  wishlist.push(wished)

  wishlist.sort((a, b) => {
    const typeCompare = a.type.localeCompare(b.type)
    if (typeCompare !== 0) return typeCompare

    const abstractTypeCompare = (a.abstractType ?? "").localeCompare(
      b.abstractType ?? ""
    )
    if (abstractTypeCompare !== 0) return abstractTypeCompare

    const rarityCompare =
      Object.keys(Rarity).indexOf(a.rarity ?? "") -
      Object.keys(Rarity).indexOf(b.rarity ?? "")
    if (rarityCompare !== 0) return rarityCompare

    return a.name.localeCompare(b.name)
  })

  LocalStorage.wishlist = wishlist

  const template: Template = require("../templates/html/flavr_notif/icon_message.html")
  $.flavrNotif(
    template.render({
      ...wished,
      message: translate.market.add_to_wishlist.added_to_wishlist(
        wished.name,
        wished.price
      ),
    })
  )
  return true
}

function hijackBuyButtons(marketEntry: MarketEntry): void {
  document
    .querySelector(".marketplace-itemDetail-buy")
    ?.addEventListener("click", () => {
      addPurchase(marketEntry)
    })
}

function addPurchase(marketEntry: MarketEntry): void {
  LocalStorage.purchases = [
    marketEntry,
    ...LocalStorage.purchases.filter(
      purchase => purchase.itemid !== marketEntry.itemid
    ),
  ]
}
