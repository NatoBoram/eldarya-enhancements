import type { ParsableItem } from "./parsable_item"

export interface FavouriteOutfit {
  name: string
  items: ParsableItem[]

  /** Base64 representation of a `png` screenshot of the canvas. */
  preview: string
}
