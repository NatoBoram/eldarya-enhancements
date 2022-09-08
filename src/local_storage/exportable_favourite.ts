import type { ParsableItem } from "../appearance/interfaces/parsable_item"

export interface ExportableFavourite {
  readonly id: number
  readonly name: string
  readonly items: ParsableItem[]
  readonly base64: string
}
