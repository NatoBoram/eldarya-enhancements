import type { ItemType } from "../api/item_type.enum";

export interface ExplorationResultsData {
  results: Result[];
  levels: Level[];
}

/** Treasure chests at the bottom of the exploration page. */
interface Level {
  reward?: Reward;
  retrievedDate?: Date;
  treasureHuntEventModel: TreasureHuntEventModel;
  state: string;
  playerPoints?: number;
}

interface Reward {
  id: number;
  type: ItemType;
  category: string;
  name: string;
  description: string;
  rarity: string;
  rarityText: string;
  tradable: boolean;
  icon: Image;
  usable?: boolean;
  categoryId: number;
  eventName?: null;
  bodyLocation?: string;
  movable?: boolean;
  categoryUnique?: boolean;
  categoriesToHide?: unknown[];
  previewCategoriesToHide?: string[];
  animated?: boolean;
  group?: number;
  wearIndex?: null;
  categoryLimit?: null;
  image?: Image;
}

interface Image {
  type: string;
  image: ImageSource;
}

interface ImageSource {
  sd: Quality;
  hd: Quality;
  xhd: Quality;
}

interface Quality {
  src: string;
  lastModification: number;
}

interface TreasureHuntEventModel {
  rewardPreview: string;
  id: string;
  eventId: string;
  count: string;
  type: string;
  value?: string;
  order: string;
  rarity?: string;
}

/** Item received from exploration */
interface Result {
  id: string;
  type: ResultType;
  /** Category of item */
  arg1: ItemType;
  arg2: string;
  /** Count */
  arg3: string;
  name: string;
  description: string;
  tradable: string;
  rarity: string;
  arg4: string;
  icon: string;
  petMoodIcon: string;
  category: string;
  tameList?: Tame[];
  /** Seconds */
  timeRestCapture?: number;
}

interface Tame {
  item: Item;
  ownedQuantity: number;
}

interface Item {
  icon: string;
  id: number;
  name: string;
}

type ResultType = "capture" | "captureCrylasm" | "object";
