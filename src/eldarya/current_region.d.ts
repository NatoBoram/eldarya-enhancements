import type { ImageType } from "./image_type"

declare global {
  /** MapRegion currently displayed in the interface */
  let currentRegion: MapRegion
}

export declare interface MapRegion {
  Condition_id?: string
  eventId?: string
  id: string
  image: ImageType
  locations: Location[]
  name: string
  /**
   * ID of the next region in this season.
   * `0` and `null` means there's no next region.
   */
  nextRegion_id?: string
  /**
   * ID of the previous region in this season.
   * `0` and `null` means there's no previous region.
   */
  previousRegion_id?: string
  season?: Season
}

declare type Season = "s1" | "s2"

export declare interface Location {
  MapRegion_id: string
  description: string
  energyRequired: string
  episodeId: number
  id: string
  levelRequired: string
  locationItems: number
  name: string
  playerItems: number
  priceToExploreImmediately: number
  /** Minutes */
  timeToExplore: number
  timeToExploreText: string
  x: string
  xp: string
  y: string
}
