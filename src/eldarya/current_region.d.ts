declare global {
  /** MapRegion currently displayed in the interface */
  let currentRegion: MapRegion;
}

export declare interface MapRegion {
  id: string;
  name: string;
  image: MapRegionImage;
  nextRegion_id: string;
  locations: Location[];
  season: string;
}

interface MapRegionImage {
  type: string;
  image: ImageImage;
}

interface ImageImage {
  sd: HD;
  hd: HD;
  xhd: HD;
}

interface HD {
  src: string;
  lastModification: number;
}

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
  timeToExplore: number;
  MapRegion_id: string;
  playerItems: number;
  locationItems: number;
  episodeId: number;
}
