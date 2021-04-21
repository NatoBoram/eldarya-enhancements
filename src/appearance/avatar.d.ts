import { Clothing } from "../local_storage/clothing";
import { AnimationData } from "./animation_data";
import { Cookie } from "./cookie.enum";
import { Format } from "./format.enum";
import { Item } from "./item";

declare class Avatar {
  constructor(format: string);

  _format: string;
  _animated: boolean;

  // Constante de format d'avatar (correspond au format d'image)
  static FORMAT_NORMAL: Format.FORMAT_NORMAL;
  static FORMAT_ZOOM: Format.FORMAT_ZOOM;
  static FORMAT_ANIMATED: Format.FORMAT_ANIMATED;
  static FORMAT_BOMBOEUF: Format.FORMAT_BOMBOEUF;
  static FORMAT_BOMBOEUF_IG: Format.FORMAT_BOMBOEUF_IG;
  static FORMAT_FACE: Format.FORMAT_FACE;
  static FORMAT_HOME: Format.FORMAT_HOME;
  static FORMAT_BACKGROUND: Format.FORMAT_BACKGROUND;
  static FORMAT_REWARDPOPUP: Format.FORMAT_REWARDPOPUP;

  // Dimensions d'avatar classique
  static dimensions: {
    [Avatar.FORMAT_NORMAL]: { width: 420; height: 594 };
    [Avatar.FORMAT_FACE]: { width: 102; height: 102 };
    [Avatar.FORMAT_HOME]: { width: 420; height: 600 };
    [Avatar.FORMAT_BOMBOEUF]: { width: 130; height: 300 };
    [Avatar.FORMAT_BOMBOEUF_IG]: { width: 74; height: 74 };
    [Avatar.FORMAT_ZOOM]: { width: 630; height: 891 };
    [Avatar.FORMAT_BACKGROUND]: { width: 800; height: 600 };
    [Avatar.FORMAT_REWARDPOPUP]: { width: 290; height: 500 };
  };

  refreshHiddenItems(): void;
  getHiddingItems(categoryId: number): void;
  addItem(item: Item, index: number): boolean;
  checkConditions(item: Item): boolean;
  addItemPreview(item: Item): void;
  checkItemUnicity(item: Item): boolean;
  moveItemForward(item: Item): void;
  moveItemBackward(item: Item): void;
  getItemsToSave(): Clothing[];
  addItems(items: Item[]): void;
  getRender(item: Item): boolean;
  isAnimated(): boolean;
  setAnimated(animated: boolean): void;
  displayOn(container: Element, width: number, height: number): void;
  removeAllChildren(): void;
  reset(): void;
  saveOriginalItems(): void;
  clone(recursive: boolean): Avatar;

  static addItemToAllAvatars(item: Item): void;
  static addItemPreviewToAllAvatars(item: Item): void;
  static removeItemFromAllAvatars(item: Item): boolean;
  static moveItemForwardOnAllAvatars(item: Item): void;
  static moveItemBackwardOnAllAvatars(item: Item): void;
  static resetAllAvatars(): void;
  static loadItems(json: { items: Item[] }, format: Format): Item[];
  static generateOn(
    containerName: string,
    items: Item[],
    format: string,
    linkUrl: string
  ): Avatar;

  static Cookie: Cookie;
  static isAnimated(): boolean;
  static setAnimated(animated: boolean): void;

  static Item: (
    id: number,
    group: number,
    name: string,
    image: string,
    type: string,
    categoryId: number,
    hiddenCategories: { [key: string]: number },
    animationData: AnimationData | null,
    locked: number
  ) => Item;
}