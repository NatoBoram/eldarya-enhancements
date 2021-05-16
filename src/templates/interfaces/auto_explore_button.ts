import type { Context } from "hogan.js";

export interface AutoExploreButton extends Context {
  active: boolean;
  mapLocation: number;
  currentRegionId: number;
}
