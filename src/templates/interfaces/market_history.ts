import type { Context } from "hogan.js"
import type { MarketEntry } from "../../marketplace/interfaces/market_entry"

export interface MarketHistory extends Context {
  purchases: MarketEntry[]
  sales: MarketEntry[]
}
