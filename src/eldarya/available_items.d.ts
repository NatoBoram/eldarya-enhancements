import type { Item } from "./item"

declare global {
  const availableItems: Record<number, Item>
}
