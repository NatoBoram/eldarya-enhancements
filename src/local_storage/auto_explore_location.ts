import type { Location, MapRegion } from "../eldarya/current_region";

export interface AutoExploreLocation {
  id: number;
  location: Location;
  region: MapRegion;
}
