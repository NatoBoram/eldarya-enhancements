import { ajaxSearch } from "../../ajax/ajax_search"
import { Console } from "../../console"
import { LocalStorage } from "../../local_storage/local_storage"
import type { WishedItem } from "../../local_storage/wished_item"
import { Type } from "../../marketplace/enums/type.enum"
import { TakeoverAction } from "../../session_storage/takeover_action.enum"
import { click } from "../click"
import { Action } from "./action"

class BuyAction extends Action {
  readonly key = TakeoverAction.buy

  condition(): boolean {
    return LocalStorage.market && Boolean(LocalStorage.wishlist.length)
  }

  async perform(): Promise<boolean> {
    if (!location.pathname.startsWith("/marketplace")) {
      await click<HTMLAnchorElement>(".main-menu-marketplace a")
      return true
    }

    for (const wished of LocalStorage.wishlist) {
      if (wished.type === Type.PlayerWearableItem && wished.error) {
        Console.warn(`Skipped "${wished.name}"`, wished)
        continue
      }
      Console.info(`Searching "${wished.name}"`, wished)
      await this.search(wished)
    }

    return false
  }

  private async search(wished: WishedItem): Promise<void> {
    const filterItemName =
      document.querySelector<HTMLInputElement>("#filter-itemName")
    if (filterItemName) filterItemName.value = wished.name

    const searchedHtml = await ajaxSearch({ name: wished.name, page: 1 })

    const marketplaceSearchItems = document.querySelector(
      ".marketplace-search-items"
    )
    if (!marketplaceSearchItems) return

    marketplaceSearchItems.innerHTML = searchedHtml
    const lis = marketplaceSearchItems.querySelectorAll<HTMLLIElement>(
      ".marketplace-search-item"
    )
    console.log(lis)
  }

  // private getItem(): void {}
}

export default new BuyAction()
