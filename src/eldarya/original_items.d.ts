import type { Item } from "./item"

declare interface OriginalItems {
	sorted: Item[]
	ids: Record<number, Item>
}
