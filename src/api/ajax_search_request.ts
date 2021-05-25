import type { Rarity } from "../market/sellable_item";
import type { BodyLocation } from "./body_location.enum";
import type { ItemType } from "./item_type.enum";

export const ITEMS_PER_PAGE = 8;

export interface AjaxSearchRequest {
  type: ItemType;
  bodyLocation: BodyLocation;
  category: unknown;
  rarity: Rarity;
  price: number;
  guard: number;
  /** Will be inferred by `page` inside `ajax_search`. */
  from?: number;
  /** Will be inferred by `page` inside `ajax_search`. */
  to?: number;
  /** Page number, indexed by 1 */
  page: number;
  name: string;
}
