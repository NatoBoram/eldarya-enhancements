import type { ImageType } from "./image_type"

declare const treasureHuntLevels: TreasureHuntLevels[]
interface TreasureHuntLevels {
	playerPoints?: number
	retrievedDate?: Date
	reward?: Reward
	state: string
	treasureHuntEventModel: TreasureHuntEventModel
}

interface Reward {
	animated?: boolean
	bodyLocation?: string
	categoriesToHide?: unknown[]
	category: string
	categoryId: number
	categoryLimit?: null
	categoryUnique?: boolean
	description: string
	eventName?: null
	group?: number
	icon: ImageType
	id: number
	image?: ImageType
	movable?: boolean
	name: string
	previewCategoriesToHide?: string[]
	rarity: string
	rarityText: string
	tradable: boolean
	type: string
	usable?: boolean
	wearIndex?: null
}

interface TreasureHuntEventModel {
	count: string
	eventId: string
	id: string
	order: string
	rarity?: string
	rewardPreview: string
	type: string
	value?: string
}
