import type { MapRegion } from "./current_region"

declare class TreasureHuntInterface {
  constructor(
    petEnergy: number,
    petRaceEnergy: number,
    currentRegion: MapRegion
  )

  timeFormat(seconds: number): string
}

export {}
