import type { Type } from "../marketplace/enums/type.enum"

export interface WishedItem {
  icon: string
  name: string
  price: number
  type: Type
  /** ID of this item+color combo. Eggs are unique though. */
  wearableitemid: string

  /** Latest error received from Eldarya. */
  error?: string
}
