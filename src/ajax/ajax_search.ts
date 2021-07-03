import { BodyLocation } from "../marketplace/enums/body_location.enum"
import type { CategoryNumber } from "../marketplace/enums/category.enum"
import type { Guard } from "../marketplace/enums/guard.enum"
import type { Rarity } from "../marketplace/enums/rarity.enum"
import { Type } from "../marketplace/enums/type.enum"

export async function ajaxSearch(
  data: {
    type?: Type
    bodyLocation?: BodyLocation
    category?: CategoryNumber
    rarity?: Rarity
    price?: number
    guard?: Guard
    /** Page number, indexed by 1 */
    page: number
    name?: string
  } = {
    type: Type.All,
    bodyLocation: BodyLocation.All,
    page: 1,
  }
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
