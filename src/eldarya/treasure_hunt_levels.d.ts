import type { ImageType } from "./image_type"

declare const treasureHuntLevels: TreasureHuntLevels[]
interface TreasureHuntLevels {
  reward?: Reward
  retrievedDate?: Date
  treasureHuntEventModel: TreasureHuntEventModel
  state: string
  playerPoints?: number
}

interface Reward {
  id: number
  type: string
  category: string
  name: string
  description: string
  rarity: string
  rarityText: string
  tradable: boolean
  icon: ImageType
  usable?: boolean
  categoryId: number
  eventName?: null
  bodyLocation?: string
  movable?: boolean
  categoryUnique?: boolean
  categoriesToHide?: unknown[]
  previewCategoriesToHide?: string[]
  animated?: boolean
  group?: number
  wearIndex?: null
  categoryLimit?: null
  image?: ImageType
}

interface TreasureHuntEventModel {
  rewardPreview: string
  id: string
  eventId: string
  count: string
  type: string
  value?: string
  order: string
  rarity?: string
}
