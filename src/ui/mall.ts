import type { DataProduct } from "../mall/data_product"
import { Rarity } from "../marketplace/enums/rarity.enum"
import { addToWishlistFlavr } from "./market"

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

  const dataProduct = JSON.parse(li.dataset.product!) as DataProduct
  console.log("dataProduct", dataProduct)
  const icon = li.querySelector<HTMLImageElement>("img.mall-product-icon")?.src
  const rarity: Rarity =
    Rarity[
      (li
        .querySelector(
          ".rarity-marker-common, .rarity-marker-rare, .rarity-marker-epic, .rarity-marker-legendary, .rarity-marker-event"
        )
        ?.className.split("rarity-marker-")[1] ?? "") as keyof typeof Rarity
    ]

  document.querySelector("#add-to-wishlist")?.addEventListener("click", () =>
    addToWishlistFlavr({
      currentPrice: { bids: "0", price: dataProduct.maana },
      ...dataProduct,
      itemid: "",
      name: dataProduct.name,
      icon: icon!,
      rarity: rarity,
      date: new Date(),
      wearableitemid: dataProduct.id.toString(),
    })
  )
}
