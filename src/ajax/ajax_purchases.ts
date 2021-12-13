import type { AjaxPurchasesData } from "../api/ajax_purchases_data"
import type { Packet } from "../api/packet"
import { LocalStorage } from "../local_storage/local_storage"
import { BodyLocation } from "../marketplace/enums/body_location.enum"
import { CategoryString } from "../marketplace/enums/category.enum"
import { Type } from "../marketplace/enums/type.enum"

/**
 * Loads a page of one type of object
 * @param category Category of the object to be displayed
 * @param page Page of the object to be displayed
 */
export async function ajaxPurchases(
  type = Type.All,
  bodyLocation = BodyLocation.All,
  category = CategoryString.all,
  page = 1
): Promise<Packet<AjaxPurchasesData>> {
  const ITEMS_PER_PAGE = 4

  return new Promise<Packet<AjaxPurchasesData>>(resolve => {
    void $.ajax({
      url: "/marketplace/ajax_purchases",
      type: "post",
      data: {
        type: type,
        bodyLocation: bodyLocation,
        category: category,
        from: (page - 1) * ITEMS_PER_PAGE,
        to: page * ITEMS_PER_PAGE - 1,
      },
      dataType: "json",
      success: (json: Packet<AjaxPurchasesData>): void => {
        LocalStorage.meta = json.meta
        resolve(json)

        if (json.result !== "success") {
          $.flavrNotif(json.data)
          return
        }
      },
    })
  })
}
