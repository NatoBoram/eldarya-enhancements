import type { Context } from "hogan.js"
import type { AutoExploreLocation } from "../../local_storage/auto_explore_location"
import type { ExplorationResult } from "../../local_storage/exploration_result"
import type { ExportableFavourite } from "../../local_storage/exportable_favourite"
import type { WishedItem } from "../../local_storage/wished_item"

export interface Settings extends Context {
  readonly autoExploreLocations: AutoExploreLocation[]
  readonly debug: boolean
  readonly explorationHistory: ExplorationResult[]
  readonly explorations: boolean
  readonly favourites: ExportableFavourite[]
  readonly market: boolean
  readonly minigames: boolean
  readonly unlocked: boolean
  readonly wishlist: WishedItem[]
}
