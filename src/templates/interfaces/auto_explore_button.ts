import type { Context } from "hogan.js"

export interface AutoExploreButton extends Context {
	readonly active: boolean
	readonly locationId: number
	readonly regionId: number
}
