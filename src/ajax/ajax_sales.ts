import type { AjaxSalesData } from "../api/ajax_sales_data";
import type { ItemType } from "../api/item_type.enum";
import type { Packet } from "../api/packet";
import { SessionStorage } from "../session_storage/session_storage";

/**
 * Load a page of one type of object
 * @param category Category of the object to be displayed
 * @param page Page of the object to be displayed
 */
export async function ajaxSales(
  type: ItemType,
  bodyLocation: string,
  category: ItemType,
  page: number
): Promise<Packet<AjaxSalesData>> {
  const ITEMS_PER_PAGE = 4;

  return new Promise<Packet<AjaxSalesData>>((resolve): void => {
    void $.ajax({
      url: "/marketplace/ajax_sales",
      type: "post",
      data: {
        type: type,
        bodyLocation: bodyLocation,
        category: category,
        from: (page - 1) * ITEMS_PER_PAGE,
        to: page * ITEMS_PER_PAGE - 1,
      },
      dataType: "json",
      success: (json: Packet<AjaxSalesData>): void => {
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
