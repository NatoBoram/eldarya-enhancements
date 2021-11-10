import type { Rarity } from "../enums/rarity.enum"
import type { BuyNowPrice } from "./buy_now_price"
import type { CurrentPrice } from "./current_price"
import type { MarketEntryDataSet } from "./market_entry_data_set"

export interface MarketEntry extends MarketEntryDataSet {
  icon: string
  rarity: Rarity
  name: string
  /** Subtitle of a market item under its name */
  abstractType?: string
  currentPrice: CurrentPrice
  buyNowPrice?: BuyNowPrice
  date: Date | string
}
