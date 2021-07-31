import type { Context } from "hogan.js"

export interface OutfitThumbs extends Context {
  outfits: OutfitThumb[]
}

export interface OutfitThumb extends Context {
  id: number
  name: string
  url: string
}
