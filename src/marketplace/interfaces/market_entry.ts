import type { BuyNowPrice } from "./buy_now_price"
import type { CurrentPrice } from "./current_price"
import type { MarketEntryDataSet } from "./market_entry_data_set"

export interface MarketEntry extends MarketEntryDataSet {
  icon: string
  name: string
  buyNowPrice: BuyNowPrice
  currentPrice?: CurrentPrice
}
