import { Type } from "./type.enum"

export enum CategoryString {
	all = "",
	food = "food",
	alchemy = "alchemy",
	utility = "utility",
	tame = "tame",
}

export enum CategoryNumber {
	all = CategoryString.all,
	food = 1,
	alchemy = Type.Consumable,
	utility = 3,
	tame = 4,
}
