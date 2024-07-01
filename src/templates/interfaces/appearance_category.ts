import type { Context } from "hogan.js"
import type { AppearanceCategoryCode } from "../../appearance/enums/appearance_category_code.enum"

export interface AppearanceCategory extends Context {
	readonly categoryid: number
	/** Category's code. */
	readonly category: AppearanceCategoryCode
	readonly categoryname: string
}
