import { BodyLocation } from "../marketplace/enums/body_location.enum"
import { CategoryNumber } from "../marketplace/enums/category.enum"
import { Guard } from "../marketplace/enums/guard.enum"
import { Rarity } from "../marketplace/enums/rarity.enum"
import { Type } from "../marketplace/enums/type.enum"

export async function ajaxSearch(data: {
	type?: Type
	bodyLocation?: BodyLocation
	category?: CategoryNumber
	rarity?: Rarity
	price?: number | ""
	guard?: Guard
	/** Page number, indexed by 1 */
	page: number
	name?: string
}): Promise<string> {
	data = {
		...{
			type: Type.All,
			bodyLocation: BodyLocation.All,
			category: CategoryNumber.all,
			rarity: Rarity.all,
			price: "",
			guard: Guard.any,
			page: 1,
			name: "",
		},
		...data,
	}

	const ITEMS_PER_PAGE = 8
	return (await $.get("/marketplace/ajax_search", {
		...data,
		from: (data.page - 1) * ITEMS_PER_PAGE,
		to: ITEMS_PER_PAGE,
	})) as string
}
