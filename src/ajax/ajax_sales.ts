import type { AjaxSalesData } from "../api/ajax_sales_data"
import type { Packet } from "../api/packet"
import { LocalStorage } from "../local_storage/local_storage"
import { BodyLocation } from "../marketplace/enums/body_location.enum"
import { CategoryString } from "../marketplace/enums/category.enum"
import { Type } from "../marketplace/enums/type.enum"
import { Result } from "../typedoc"

/**
 * Load a page of one type of object
 * @param category Category of the object to be displayed
 * @param page Page of the object to be displayed
 */
export async function ajaxSales(
	type = Type.All,
	bodyLocation = BodyLocation.All,
	category = CategoryString.all,
	page = 1,
): Promise<Packet<AjaxSalesData>> {
	const ITEMS_PER_PAGE = 4

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
				LocalStorage.meta = json.meta
				resolve(json)

				if (json.result !== Result.success) {
					$.flavrNotif(json.data)
					return
				}
			},
		})
	})
}
