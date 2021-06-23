import type { Context } from "hogan.js"
import type { AutoExploreLocation } from "../../local_storage/auto_explore_location"

export interface Settings extends Context {
  autoExploreLocations: AutoExploreLocation[]
  explorations: boolean
  market: boolean
  minigames: boolean
}
