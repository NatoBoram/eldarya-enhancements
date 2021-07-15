import { ajaxSearch } from "../../ajax/ajax_search"
import { buy } from "../../ajax/buy"
import { Console } from "../../console"
import { LocalStorage } from "../../local_storage/local_storage"
import type { WishedItem } from "../../local_storage/wished_item"
import type { MarketEntry } from "../../marketplace/interfaces/market_entry"
import { getItemDetails } from "../../marketplace/marketplace_handlers"
import { TakeoverAction } from "../../session_storage/takeover_action.enum"
import { click } from "../click"
import { Action } from "./action"

class BuyAction extends Action {
  readonly key = TakeoverAction.buy

  private get currentMaana(): number {
    return Number(
      document.querySelector<HTMLAnchorElement>("#currency-maana")?.dataset
        .maana
    )
  }

  condition(): boolean {
    return LocalStorage.market && Boolean(LocalStorage.wishlist.length)
  }

  async perform(): Promise<boolean> {
    if (!location.pathname.startsWith("/marketplace")) {
      await click<HTMLAnchorElement>(".main-menu-marketplace a")
      return true
    }

    for (const wished of LocalStorage.wishlist) {
      // Clothes might be a special exception. If they are, then check for
      // `wished.type === Type.PlayerWearableItem`.
      if (wished.error) {
        Console.warn(`Skipped "${wished.name}"`, wished)
        continue
      }
      Console.info(`Searching for "${wished.name}"`, wished)

      let amount = 8
      forpage: for (let page = 1; amount === 8; page++) {
        const results = await this.search(wished, page)
        amount = results.length
        Console.log(`Found ${amount} results`, results)

        const wanted = results.filter(
          result =>
            result.icon === wished.icon &&
            result.buyNowPrice &&
            Number(result.buyNowPrice.price) <= wished.price &&
            Number(result.buyNowPrice.price) <= this.currentMaana
        )
        for (const result of wanted) {
          if (!(await this.buy(result))) break forpage

          Console.info(
            `Bought "${result.name}" for ${Number(
              result.buyNowPrice?.price
            )} maanas.`,
            result
          )

          $.flavrNotif(
            `Bought <strong>${
              result.name
            }</strong> for <strong class="price-item">${Number(
              result.buyNowPrice?.price
            )}</strong> <span class="maana-icon" alt="maanas"></span>.`
          )
        }
      }
    }

    return false
  }

  private async buy(result: MarketEntry): Promise<boolean> {
    const json = await buy(Number(result.itemid))
    if (json.result !== "success")
      this.setError(result.wearableitemid, json.data)
    return json.result === "success"
  }

  /** Search for a wished item on a specific page using the item's name. */
  private async search(wished: WishedItem, page = 1): Promise<MarketEntry[]> {
    const filterItemName =
      document.querySelector<HTMLInputElement>("#filter-itemName")
    if (filterItemName) filterItemName.value = wished.name

    const marketplaceSearchItems = document.querySelector<HTMLUListElement>(
      ".marketplace-search-items"
    )
    if (!marketplaceSearchItems) return []
    marketplaceSearchItems.innerHTML = await ajaxSearch({
      name: wished.name,
      page,
    })

    return Array.from(
      marketplaceSearchItems.querySelectorAll<HTMLLIElement>(
        ".marketplace-search-item"
      )
    )
      .map(getItemDetails)
      .filter<MarketEntry>((item): item is MarketEntry => item !== null)
  }

  /** Set the `WishedItem.error` property without reordering the wishlist. */
  private setError(wearableitemid: string, error: string): void {
    const wishlist = LocalStorage.wishlist
    const index = wishlist.findIndex(
      item => item.wearableitemid === wearableitemid
    )
    const entry = wishlist[index]
    if (!entry) return

    entry.error = error
    LocalStorage.wishlist = [
      ...wishlist.slice(undefined, index),
      entry,
      ...wishlist.slice(index + 1, undefined),
    ]
  }
}

export default new BuyAction()
