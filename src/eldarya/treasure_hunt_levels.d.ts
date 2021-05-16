declare const treasureHuntLevels: TreasureHuntLevels[];
interface TreasureHuntLevels {
  reward?: Reward;
  retrievedDate?: Date;
  treasureHuntEventModel: TreasureHuntEventModel;
  state: string;
  playerPoints?: number;
}

interface Reward {
  id: number;
  type: string;
  category: string;
  name: string;
  description: string;
  rarity: string;
  rarityText: string;
  tradable: boolean;
  icon: Icon;
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
  image?: Icon;
}

interface Icon {
  type: string;
  image: Image;
}

interface Image {
  sd: HD;
  hd: HD;
  xhd: HD;
}

interface HD {
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
