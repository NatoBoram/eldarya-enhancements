export interface AjaxSalesData {
	count: string
	items: Item[]
}

interface Item {
	id: string
	Seller_id: string
	type: string
	itemId: string
	currentPrice: string
	buyNowPrice: string
	numberOfItems: string
	completed: string
	startDate: string
	endDate: string
	hasBids: string
	categoryId: string
	itemName: string
	rarity: string
	depositTax: string
	remainingTime: string
	icon: string
	name: string
	bodyLocation?: string
}
