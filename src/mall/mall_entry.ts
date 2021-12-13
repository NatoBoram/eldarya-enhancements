import type { Rarity } from "../marketplace/enums/rarity.enum"
import type { DataProduct } from "./data_product"

export interface MallEntry {
  product: DataProduct
  rarity: Rarity
  icon: string
  maxQuantity?: number
  /** Tooltip of the mall menu entry */
  abstractType: string
}
