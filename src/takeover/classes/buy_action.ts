import type { Template } from "hogan.js"
import { ajaxSearch } from "../../ajax/ajax_search"
import { buy } from "../../ajax/buy"
import { Console } from "../../console"
import { translate } from "../../i18n/translate"
import { LocalStorage } from "../../local_storage/local_storage"
import type { WishedItem } from "../../local_storage/wished_item"
import type { MarketEntry } from "../../marketplace/interfaces/market_entry"
import { getItemDetails } from "../../marketplace/marketplace_handlers"
import { TakeoverAction } from "../../session_storage/takeover_action.enum"
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
    if (location.pathname !== "/marketplace") {
      pageLoad("/marketplace")
      return true
    }

    const iconMessage: Template = require("../../templates/html/flavr_notif/icon_message.html")
    for (const wished of LocalStorage.wishlist) {
      // Clothes might be a special exception. If they are, then check for
      // `wished.type === Type.PlayerWearableItem`.
      if (wished.error) {
        Console.warn(`Skipped "${wished.name}"`, wished)
        continue
      }
      Console.info(`Searching for "${wished.name}"`, wished)

      /** Search in each pages until the amount of items is less than 8 */
      let amount = 8
      forpage: for (let page = 1; amount === 8; page++) {
        let results: MarketEntry[] = []
        try {
          results = await this.search(wished, page)
        } catch (e: unknown) {
          const error = e as JQueryXHR
          Console.error(`Failed to search for "${wished.name}"`, error)
          this.setError(wished.icon, `${error.statusText}`)
          break forpage
        }

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

          LocalStorage.purchases = [
            result,
            ...LocalStorage.purchases.filter(
              purchase => purchase.itemid !== result.itemid
            ),
          ]

          Console.info(
            `Bought "${result.name}" for ${Number(
              result.buyNowPrice?.price
            )} maanas.`,
            result
          )

          $.flavrNotif(
            iconMessage.render({
              ...result,
              message: translate.takeover.bought(
                result.name,
                Number(result.buyNowPrice?.price)
              ),
            })
          )
        }
      }
    }

    return false
  }

  /**
   * Purchase an item from the market.
   * @returns whether the item was successfully purchased.
   */
  private async buy(result: MarketEntry): Promise<boolean> {
    const json = await buy(Number(result.itemid))
    Console.error(`Failed to buy "${result.name}"`, result, json)
    if (json.result !== "success") this.setError(result.icon, json.data)
    return json.result === "success"
  }

  /** Search for a wished item on a specific page using the item's name. */
  private async search(wished: WishedItem, page = 1): Promise<MarketEntry[]> {
    // Put the name of the item in the filter
    const filterItemName =
      document.querySelector<HTMLInputElement>("#filter-itemName")
    if (filterItemName) filterItemName.value = wished.name

    // Show the results of the search
    const marketplaceSearchItems = document.querySelector(
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
  private setError(icon: string, error: string): void {
    const wishlist = LocalStorage.wishlist
    const index = wishlist.findIndex(item => item.icon === icon)
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
