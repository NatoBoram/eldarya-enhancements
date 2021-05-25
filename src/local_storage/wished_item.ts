import type { ItemType } from "../api/item_type.enum";

export interface WishedItem {
  icon: string;
  name: string;
  price: number;
  type: ItemType;
  /** ID of this item+color combo. Eggs are unique though. */
  wearableitemid: string;
}
