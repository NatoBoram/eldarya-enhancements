import type { Item } from "./item"

declare global {
	let availableItems: Record<number, Item>
}
