import type { AjaxPurchasesData } from "../api/ajax_purchases_data";
import type { ItemType } from "../api/item_type.enum";
import type { Packet } from "../api/packet";
import { SessionStorage } from "../session_storage/session_storage";

/**
 * Loads a page of one type of object
 * @param category Category of the object to be displayed
 * @param page Page of the object to be displayed
 */
export async function ajaxPurchases(
  type: ItemType,
  bodyLocation: string,
  category: ItemType,
  page: number
): Promise<Packet<AjaxPurchasesData>> {
  const ITEMS_PER_PAGE = 4;

  return new Promise<Packet<AjaxPurchasesData>>((resolve) => {
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
        SessionStorage.meta = json.meta;
        resolve(json);

        if (json.result !== "success") {
          $.flavrNotif(json.data);
          return;
        }
      },
    });
  });
}
