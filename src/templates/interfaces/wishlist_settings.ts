import type { Context } from "hogan.js"
import type { WishedItem } from "../../local_storage/wished_item"

export interface WishlistSettings extends Context {
  wishlist: WishedItem[]
}
