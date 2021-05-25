import type { ItemType } from "../../api/item_type.enum";

export interface MarketEntryDataSet {
  isowner?: string;
  ispremium?: string;
  /** ID of this specific entry on the market */
  itemid: string;
  type: ItemType;
  /** ID of this item+color combo. Eggs are unique though. */
  wearableitemid: string;
}
