import type { Type } from "../marketplace/enums/type.enum"
import type { MarketEntry } from "../marketplace/interfaces/market_entry"

export interface WishedItem extends Partial<MarketEntry> {
  icon: string
  name: string
  price: number
  type: Type
  /** ID of this item+color combo. Eggs are unique though. */
  wearableitemid: string

  /** Latest error received from Eldarya. */
  error?: string
}
