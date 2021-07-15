import type { AnimationData } from "./animation_data"

export interface ParsableItem {
  id: number
  group: number
  name: string
  image: string
  type: string
  categoryId: number
  hiddenCategories: number[]
  animationData: AnimationData | null
  locked: number
}
