import type { Template } from "hogan.js"
import { trimIcon } from "../eldarya_util"
import { translate } from "../i18n/translate"
import { LocalStorage } from "../local_storage/local_storage"
import type { WishedItem } from "../local_storage/wished_item"
import type { DataProduct } from "../mall/data_product"
import type { MallEntry } from "../mall/mall_entry"
import { Rarity } from "../marketplace/enums/rarity.enum"

export function loadMall(): void {
  if (!location.pathname.startsWith("/mall")) return

  for (const li of document.querySelectorAll<HTMLLIElement>("[data-product]"))
    li.addEventListener("click", () => addWishlistButton(li))
}

function addWishlistButton(li: HTMLLIElement): void {
  document.querySelector("#add-to-wishlist")?.remove()

  document
    .querySelector("#mall-productDetail-info")
    ?.insertAdjacentHTML(
      "beforeend",
      "<button id='add-to-wishlist' class='nl-button' style='margin: 20px auto 0; min-width: 200px;'>Add to market wishlist</button>"
    )

  const maxQuantity = li.querySelector<HTMLSpanElement>(".item-maxQuantity")

  const mallEntry: MallEntry = {
    product: JSON.parse(li.dataset.product!) as DataProduct,
    icon: trimIcon(
      li.querySelector<HTMLImageElement>("img.mall-product-icon")!.src
    ),
    rarity:
      Rarity[
        (li
          .querySelector(
            ".rarity-marker-common, .rarity-marker-rare, .rarity-marker-epic, .rarity-marker-legendary, .rarity-marker-event"
          )
          ?.className.split("rarity-marker-")[1] ?? "") as keyof typeof Rarity
      ],
    maxQuantity: maxQuantity ? Number(maxQuantity.innerText) : undefined,
    abstractType:
      document.querySelector<HTMLDivElement>(
        "#mall-menu .tooltip.active .tooltip-content"
      )?.innerText ?? "",
  }

  document
    .querySelector("#add-to-wishlist")
    ?.addEventListener("click", () => addToWishlistFlavr(mallEntry))
}

export function addToWishlistFlavr(mallEntry: MallEntry): void {
  const template: Template = require("../templates/html/auto_buy_flavr_mall.html")

  $.flavr({
    content: template.render({ translate }),
    buttons: {
      close: { style: "close" },
      save: {
        action: () => save(mallEntry),
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
          save(mallEntry)
        })
    },
  })
}

function save(mallEntry: MallEntry): boolean {
  const price = Number(
    document.querySelector<HTMLInputElement>(".flavr-prompt")?.value.trim()
  )
  if (!price || price <= 0) {
    $.flavrNotif(translate.market.add_to_wishlist.invalid_price)
    return false
  }

  const wishlist = LocalStorage.wishlist.filter(
    wishlistEntry => wishlistEntry.icon !== mallEntry.icon
  )
  const wished: WishedItem = {
    ...mallEntry,
    ...mallEntry.product,
    price,
  }
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
