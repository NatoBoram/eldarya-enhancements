import type { MapRegion } from "./current_region"

export declare class TreasureHuntInterface {
  constructor(
    petEnergy: number,
    petRaceEnergy: number,
    currentRegion: MapRegion
  )

  timeFormat(seconds: number): string
}
