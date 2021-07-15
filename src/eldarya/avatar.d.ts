import type { Cookie } from "../appearance/enums/cookie.enum"
import type { Format } from "../appearance/enums/format.enum"
import type { Clothing } from "../local_storage/clothing"
import type { Item } from "./item"
import type { OriginalItems } from "./original_items"

interface DisplayObject extends createjs.DisplayObject {
  getItem: () => Item
}

declare class Avatar extends createjs.Container {
  static Cookie: Cookie

  // Constante de format d'avatar (correspond au format d'image)
  static FORMAT_ANIMATED: Format.FORMAT_ANIMATED
  static FORMAT_BACKGROUND: Format.FORMAT_BACKGROUND
  static FORMAT_BOMBOEUF: Format.FORMAT_BOMBOEUF
  static FORMAT_BOMBOEUF_IG: Format.FORMAT_BOMBOEUF_IG
  static FORMAT_FACE: Format.FORMAT_FACE
  static FORMAT_HOME: Format.FORMAT_HOME
  static FORMAT_NORMAL: Format.FORMAT_NORMAL
  static FORMAT_REWARDPOPUP: Format.FORMAT_REWARDPOPUP
  static FORMAT_ZOOM: Format.FORMAT_ZOOM

  static Item: typeof Item

  static avatars: Record<string, Avatar>

  /** Dimensions d'avatar classique */
  static dimensions: {
    [Avatar.FORMAT_NORMAL]: { width: 420; height: 594 }
    [Avatar.FORMAT_FACE]: { width: 102; height: 102 }
    [Avatar.FORMAT_HOME]: { width: 420; height: 600 }
    [Avatar.FORMAT_BOMBOEUF]: { width: 130; height: 300 }
    [Avatar.FORMAT_BOMBOEUF_IG]: { width: 74; height: 74 }
    [Avatar.FORMAT_ZOOM]: { width: 630; height: 891 }
    [Avatar.FORMAT_BACKGROUND]: { width: 800; height: 600 }
    [Avatar.FORMAT_REWARDPOPUP]: { width: 290; height: 500 }
  }

  _animated: boolean
  _format: Format
  _hiddenCategories: Record<string, number>
  _originalItems: OriginalItems
  _renderApplyCallback: unknown[]
  _wornItems: Record<number, Item>

  children: DisplayObject[]

  constructor(format: Format)

  static addItemPreviewToAllAvatars(item: Item): void
  static addItemToAllAvatars(item: Item): void
  static generateOn(
    containerName: string,
    items: Item[],
    format: Format,
    linkUrl: string | null
  ): Avatar
  static isAnimated(): boolean
  static loadItems(json: { items: Item[] }, format: Format): Item[]
  static moveItemBackwardOnAllAvatars(item: Item): void
  static moveItemForwardOnAllAvatars(item: Item): void
  static removeItemFromAllAvatars(item: Item): boolean
  static resetAllAvatars(): void
  static setAnimated(animated: boolean): void

  addItem(item: Item, index: number): boolean
  addItemPreview(item: Item): void
  addItems(items: Item[]): void
  checkConditions(item: Item): boolean
  checkItemUnicity(item: Item): boolean
  clone(recursive: boolean): Avatar
  displayOn(container: Element, width: number, height: number): void
  getHiddingItems(categoryId: number): void
  getItemsToSave(): Clothing[]
  getRender(item: Item): boolean
  isAnimated(): boolean
  moveItemBackward(item: Item): void
  moveItemForward(item: Item): void
  refreshHiddenItems(): void
  removeAllChildren(): void
  reset(): void
  saveOriginalItems(): void
  setAnimated(animated: boolean): void
  setOriginalItems(originalItems: OriginalItems): void
}
