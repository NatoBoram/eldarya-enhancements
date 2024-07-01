import type { Type } from "../marketplace/enums/type.enum"

export interface DataProduct {
	id: number
	name: string
	maana: string
	gold: string
	type: Type
	maanaLocked?: boolean
	multibuy?: boolean
	playerOwnVariation?: number
	playerQuantity: string
}
