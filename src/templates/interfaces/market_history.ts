import type { Context } from "hogan.js"
import type { Sale } from "../../local_storage/sale"
import type { MarketEntry } from "../../marketplace/interfaces/market_entry"

export interface MarketHistory extends Context {
  readonly purchases: MarketEntry[]
  readonly sales: Sale[]
}
