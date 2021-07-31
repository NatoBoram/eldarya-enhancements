import type { ParsableItem } from "./parsable_item"

export interface FavouriteOutfit {
  /** Key used as a reference to the IndexedDB */
  readonly id?: number

  readonly name: string
  readonly items: ParsableItem[]

  readonly blob: Blob
  readonly url?: string
}
