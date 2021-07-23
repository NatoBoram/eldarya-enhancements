import type { ItemForSaleDataItem } from "../sell/item_for_sale_data_item"

export interface Sale extends ItemForSaleDataItem {
  icon: string
  currentPrice: number
  buyNowPrice: number
  date: Date | string
}
