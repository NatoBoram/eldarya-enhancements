import { LocalStorage } from "../../local_storage/local_storage"
import { SessionStorage } from "../../session_storage/session_storage"
import { TakeoverAction } from "../../session_storage/takeover_action.enum"
import { Action } from "./action"

class AuctionsAction extends Action {
  readonly key = TakeoverAction.auctions

  condition(): boolean {
    return LocalStorage.market && Boolean(LocalStorage.wishlist.length)
  }

  async perform(): Promise<boolean> {
    if (!location.pathname.startsWith("/marketplace")) {
      pageLoad("/marketplace")
      return Promise.resolve(true)
    }

    if (!SessionStorage.wishlist.length)
      SessionStorage.wishlist = LocalStorage.wishlist

    // const purchases = await ajaxPurchases()

    return Promise.resolve(false)
  }
}

export const auctionsAction = new AuctionsAction()
