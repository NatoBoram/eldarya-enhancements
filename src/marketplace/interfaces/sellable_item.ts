import type { Guard } from "../enums/guard.enum"
import type { Rarity } from "../enums/rarity.enum"

export interface SellableItem {
	animationSacha: null
	wearIndex: null
	categoriesToHide: unknown[]
	previewCategoriesToHide: unknown[]
	categoryName: null
	id: string
	name: string
	description: string
	icon: string
	image: null
	versionnedIcon: null
	tradable: string
	stockable: string
	maana: null
	gold: null
	bodyLocation: string
	maxQuantity: string
	group: string
	rarity: Rarity
	Guard_id: Guard
	eventId: null
	PlayerWearableItemCategory_Id: string
	purroprice: null
	movable: boolean
	categoryLimit: null
	categoryUnique: boolean
	animated: boolean
	animationData: null
	availableMaanaAfterFirstVariation: string
	quantity: string
	boughtOnStore: string
	defaultPrice: string
}
