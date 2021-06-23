import type { BodyLocation } from "../api/body_location.enum"
import type { ItemType } from "../api/item_type.enum"
import type { Guard } from "../marketplace/guard.enum"
import type { Rarity } from "../marketplace/rarity.enum"

export async function ajaxSearch(
  data: {
    type?: ItemType
    bodyLocation?: BodyLocation
    category?: unknown
    rarity?: Rarity
    price?: number
    guard?: Guard
    /** Page number, indexed by 1 */
    page: number
    name?: string
  } = { page: 1 }
): Promise<string> {
  const ITEMS_PER_PAGE = 8

  return new Promise<string>((resolve): void => {
    void $.get(
      "/marketplace/ajax_search",
      {
        ...data,
        from: (data.page - 1) * ITEMS_PER_PAGE,
        to: ITEMS_PER_PAGE,
      },
      resolve
    )
  })
}
