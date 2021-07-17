import type { Template } from "hogan.js"
import { LocalStorage } from "../local_storage/local_storage"
import type { WishlistSettings } from "../templates/interfaces/wishlist_settings"

export function loadWishlist(): void {
  const marketplaceMenu = document.getElementById("marketplace-menu")
  if (!marketplaceMenu) return

  if (!marketplaceMenu.querySelector("#wishlist-button")) {
    for (const a of marketplaceMenu.querySelectorAll("a")) {
      a.addEventListener("click", () => {
        pageLoad(a.href, undefined, undefined, undefined, true)
      })
    }
  }

  marketplaceMenu.querySelector("#wishlist-button")?.remove()
  const wishlistButtonTemplate: Template = require("../templates/html/wishlist_button.html")
  marketplaceMenu.insertAdjacentHTML(
    "beforeend",
    wishlistButtonTemplate.render({})
  )

  const wishlistButton =
    marketplaceMenu.querySelector<HTMLAnchorElement>("#wishlist-button")
  wishlistButton?.addEventListener("click", () => {
    insertWishlist(wishlistButton)
  })
}

function insertWishlist(button: HTMLAnchorElement): void {
  // Assistance
  const assistance = document.querySelector(".marketplace-assistance")
  if (assistance)
    assistance.textContent =
      "On this page, you can organize your wishlist and check the status of your wished items."

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
  container.innerHTML = wishlistTemplate.render(wishlistContext)

  // Buttons
  for (const tr of container.querySelectorAll("tr")) {
    const wearableitemid = tr.dataset.wearableitemid
    if (!wearableitemid) continue

    // Reset status
    const reset = tr.querySelector(".reset-item-status")
    if (reset)
      reset.addEventListener("click", () => {
        resetStatus(wearableitemid)
        insertWishlist(button)
      })

    // Delete item from wishlist
    const deleteButton = tr.querySelector(".delete-wishlist-item")
    if (deleteButton)
      deleteButton.addEventListener("click", () => {
        deleteItem(wearableitemid)
        insertWishlist(button)
      })

    // Change price
    const editPrice = tr.querySelector(".edit-price")
    if (editPrice)
      editPrice.addEventListener("click", () => {
        void changePrice(wearableitemid).then(() => {
          insertWishlist(button)
        })
      })
  }
}

function resetStatus(wearableitemid: string): void {
  const wishlist = LocalStorage.wishlist
  const index = wishlist.findIndex(
    item => item.wearableitemid === wearableitemid
  )
  const entry = wishlist[index]
  if (!entry) return

  delete entry.error
  LocalStorage.wishlist = [
    ...wishlist.slice(undefined, index),
    entry,
    ...wishlist.slice(index + 1, undefined),
  ]
}

function deleteItem(wearableitemid: string): void {
  LocalStorage.wishlist = LocalStorage.wishlist.filter(
    item => item.wearableitemid !== wearableitemid
  )
}

async function changePrice(wearableitemid: string): Promise<void> {
  const template: Template = require("../templates/html/change_price_flavr.html")

  const wishlist = LocalStorage.wishlist
  const index = wishlist.findIndex(
    item => item.wearableitemid === wearableitemid
  )
  const entry = wishlist[index]
  if (!entry) return

  return new Promise(resolve => {
    $.flavr({
      content: template.render({}),
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
          action: () => save(wearableitemid, resolve),
        },
      },
      onBuild: $container => {
        $container.addClass("new-layout-popup")

        document
          .querySelector<HTMLInputElement>(".flavr-prompt")
          ?.addEventListener("keyup", ({ key }) => {
            if (key !== "Enter") return
            save(wearableitemid, resolve)
          })
      },
    })
  })
}

function save(wearableitemid: string, resolve: () => void): boolean {
  const wishlist = LocalStorage.wishlist
  const index = wishlist.findIndex(
    item => item.wearableitemid === wearableitemid
  )
  const entry = wishlist[index]
  if (!entry) return false

  const price = Number(
    document.querySelector<HTMLInputElement>(".flavr-prompt")?.value.trim()
  )
  if (!price || price <= 0) {
    $.flavrNotif("This is not a valid price.")
    return false
  }

  entry.price = price
  LocalStorage.wishlist = [
    ...wishlist.slice(undefined, index),
    entry,
    ...wishlist.slice(index + 1, undefined),
  ]

  const template: Template = require("../templates/html/flavr_notif/changed_wishlist_price.html")
  $.flavrNotif(template.render(entry))

  resolve()
  return true
}
