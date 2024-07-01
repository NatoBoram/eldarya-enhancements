import type { Context } from "hogan.js"

export interface CarouselNews extends Context {
	readonly id: string
	readonly href?: string
	readonly backgroundImage: string
	readonly h4: string
	readonly h5?: string
	readonly p: string
}
