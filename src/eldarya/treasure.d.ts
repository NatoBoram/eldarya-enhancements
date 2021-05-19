declare global {
  let pendingTreasureHuntLocation: PendingTreasureHuntLocation | null;
}

export declare interface PendingTreasureHuntLocation {
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
  priceToExploreImmediately: number;
  timeToExploreText: string;
}
