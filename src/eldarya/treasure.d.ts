declare global {
  let pendingTreasureHuntLocation: PendingTreasureHuntLocation | null
}

export declare interface PendingTreasureHuntLocation {
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
