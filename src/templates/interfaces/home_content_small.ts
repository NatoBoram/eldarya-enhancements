import type { Context } from "hogan.js"

export interface HomeContentSmall extends Context {
	readonly backgroundImage: string
	readonly h4: string
	readonly href: string
	readonly id: string
}
