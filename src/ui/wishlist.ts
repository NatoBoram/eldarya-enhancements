import type { Template } from "hogan.js"
import { translate } from "../i18n/translate"
import { LocalStorage } from "../local_storage/local_storage"
import type { WishlistSettings } from "../templates/interfaces/wishlist_settings"

export function loadWishlist(): void {
  const marketplaceMenu = document.getElementById("marketplace-menu")
  if (!marketplaceMenu) return

  if (!marketplaceMenu.querySelector("#wishlist-button")) {
    for (const a of marketplaceMenu.querySelectorAll("a")) {
      a.addEventListener("click", () =>
        pageLoad(a.href, undefined, undefined, undefined, true)
      )
    }
  }

  marketplaceMenu.querySelector("#wishlist-button")?.remove()
  const wishlistButtonTemplate: Template = require("../templates/html/wishlist_button.html")
  marketplaceMenu.insertAdjacentHTML(
    "beforeend",
    wishlistButtonTemplate.render({ translate })
  )

  const wishlistButton =
    marketplaceMenu.querySelector<HTMLAnchorElement>("#wishlist-button")
  wishlistButton?.addEventListener("click", () =>
    insertWishlist(wishlistButton)
  )
}

function insertWishlist(button: HTMLAnchorElement): void {
  // Assistance
  const assistance = document.querySelector(".marketplace-assistance")
  if (assistance) assistance.innerHTML = translate.market.wishlist.assistance

  // Menu
  document
    .querySelector("#marketplace-menu .active")
    ?.classList.remove("active")
  button.classList.add("active")

  // Filters
  const filters = document.getElementById("marketplace-filters")
  if (filters) filters.innerHTML = ""

  // Content
  const wishlistTemplate: Template = require("../templates/html/wishlist_settings.html")
  const container =
    document.querySelector(".marketplace-container") ??
    document.getElementById("marketplace-active-auctions") ??
    document.getElementById("marketplace-itemsForSale")
  if (!container) return

  const wishlistContext: WishlistSettings = {
    wishlist: LocalStorage.wishlist,
  }
  container.innerHTML = wishlistTemplate.render({
    ...wishlistContext,
    translate,
  })

  // Buttons
  for (const tr of container.querySelectorAll("tr")) {
    const icon = tr.dataset.icon
    if (!icon) continue

    // Reset status
    const reset = tr.querySelector(".reset-item-status")
    if (reset)
      reset.addEventListener("click", () => {
        resetStatus(icon)
        insertWishlist(button)
      })

    // Delete item from wishlist
    const deleteButton = tr.querySelector(".delete-wishlist-item")
    if (deleteButton)
      deleteButton.addEventListener("click", () => {
        deleteItem(icon)
        insertWishlist(button)
      })

    // Change price
    const editPrice = tr.querySelector(".edit-price")
    if (editPrice)
      editPrice.addEventListener(
        "click",
        () => void changePrice(icon).then(() => insertWishlist(button))
      )
  }
}

function resetStatus(icon: string): void {
  const wishlist = LocalStorage.wishlist
  const index = wishlist.findIndex(item => item.icon === icon)
  const entry = wishlist[index]
  if (!entry) return

  delete entry.error
  LocalStorage.wishlist = [
    ...wishlist.slice(undefined, index),
    entry,
    ...wishlist.slice(index + 1, undefined),
  ]
}

function deleteItem(icon: string): void {
  LocalStorage.wishlist = LocalStorage.wishlist.filter(
    item => item.icon !== icon
  )
}

async function changePrice(icon: string): Promise<void> {
  const template: Template = require("../templates/html/change_price_flavr.html")

  const wishlist = LocalStorage.wishlist
  const index = wishlist.findIndex(item => item.icon === icon)
  const entry = wishlist[index]
  if (!entry) return

  return new Promise(resolve => {
    $.flavr({
      content: template.render({ translate }),
      dialog: "prompt",
      prompt: {
        value: entry.price.toString(),
      },
      buttons: {
        close: {
          style: "close",
          action: () => {
            resolve()
            return true
          },
        },
        save: {
          action: () => save(icon, resolve),
        },
      },
      onBuild: $container => {
        $container.addClass("new-layout-popup")

        document
          .querySelector<HTMLInputElement>(".flavr-prompt")
          ?.addEventListener("keyup", ({ key }) => {
            if (key !== "Enter") return
            save(icon, resolve)
          })
      },
    })
  })
}

function save(icon: string, resolve: () => void): boolean {
  const wishlist = LocalStorage.wishlist
  const index = wishlist.findIndex(item => item.icon === icon)
  const entry = wishlist[index]
  if (!entry) return false

  const price = Number(
    document.querySelector<HTMLInputElement>(".flavr-prompt")?.value.trim()
  )
  if (!price || price <= 0) {
    $.flavrNotif(translate.market.change_price.invalid_price)
    return false
  }

  entry.price = price
  LocalStorage.wishlist = [
    ...wishlist.slice(undefined, index),
    entry,
    ...wishlist.slice(index + 1, undefined),
  ]

  const template: Template = require("../templates/html/flavr_notif/icon_message.html")
  $.flavrNotif(
    template.render({
      ...entry,
      message: translate.market.change_price.changed_price(
        entry.name,
        entry.price
      ),
    })
  )

  resolve()
  return true
}
