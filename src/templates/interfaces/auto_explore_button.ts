import type { Context } from "hogan.js";

export interface AutoExploreButton extends Context {
  active: boolean;
  locationId: number;
  regionId: number;
}
