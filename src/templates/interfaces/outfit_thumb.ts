import type { Context } from "hogan.js"

export interface OutfitThumbs extends Context {
  outfits: OutfitThumb[]
}

export interface OutfitThumb extends Context {
  index?: number
  name: string
  preview: string
}
