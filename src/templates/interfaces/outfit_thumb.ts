import type { Context } from "hogan.js"

export interface OutfitThumbs extends Context {
	readonly outfits: OutfitThumb[]
}

export interface OutfitThumb extends Context {
	readonly id: number
	readonly name: string
	readonly url: string
}
