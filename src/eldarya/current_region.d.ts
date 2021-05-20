import type { ImageType } from "./image_type";

declare global {
  /** MapRegion currently displayed in the interface */
  let currentRegion: MapRegion;
}

export declare interface MapRegion {
  id: string;
  name: string;
  image: ImageType;
  /**
   * ID of the next region in this season.
   * `0` and `null` means there's no next region.
   */
  nextRegion_id?: string;
  /**
   * ID of the previous region in this season.
   * `0` and `null` means there's no previous region.
   */
  previousRegion_id?: string;
  eventId?: string;
  Condition_id?: string;
  locations: Location[];
  season?: Season;
}

declare type Season = "s1" | "s2";

export declare interface Location {
  priceToExploreImmediately: number;
  timeToExploreText: string;
  id: string;
  name: string;
  x: string;
  y: string;
  levelRequired: string;
  energyRequired: string;
  xp: string;
  description: string;
  /** Minutes */
  timeToExplore: number;
  MapRegion_id: string;
  playerItems: number;
  locationItems: number;
  episodeId: number;
}
