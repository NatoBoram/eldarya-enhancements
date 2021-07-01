import type { Context } from "hogan.js"
import type { AutoExploreLocation } from "../../local_storage/auto_explore_location"
import type { WishedItem } from "../../local_storage/wished_item"

export interface Settings extends Context {
  autoExploreLocations: AutoExploreLocation[]
  debug: boolean
  explorations: boolean
  market: boolean
  minigames: boolean
  wishlist: WishedItem[]
}
