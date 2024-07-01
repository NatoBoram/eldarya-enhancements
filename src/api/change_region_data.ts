import type { MapRegion } from "../eldarya/current_region"
import type { PendingTreasureHuntLocation } from "../eldarya/treasure"

export interface ChangeRegionData {
	currentRegion: MapRegion
	pendingTreasureHuntLocation?: PendingTreasureHuntLocation
	timeLeftExploration?: number
}
