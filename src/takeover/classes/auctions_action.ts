import { LocalStorage } from "../../local_storage/local_storage";
import { SessionStorage } from "../../session_storage/session_storage";
import { TakeoverAction } from "../../session_storage/takeover_action.enum";
import { click } from "../click";
import { Action } from "./action";

class AuctionsAction extends Action {
  readonly key = TakeoverAction.auctions;

  condition(): boolean {
    return LocalStorage.market && !!LocalStorage.wishlist.length;
  }

  async perform(): Promise<boolean> {
    if (!location.pathname.startsWith("/marketplace")) {
      await click<HTMLAnchorElement>(".main-menu-pet a");
      return true;
    }

    if (!SessionStorage.wishlist.length)
      SessionStorage.wishlist = LocalStorage.wishlist;

    return false;
  }
}

export default new AuctionsAction();
