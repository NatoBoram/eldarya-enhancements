declare global {
  const foodConsumable: FoodConsumable;
  const foodGoldPrice: number;
  const foodId: number;
  const foodMaanaPrice: number;
  const maxFoodToBuy: number;
  const ownedFootQuantity: number;
  const petFoodQuantity: number;
}

export declare interface FoodConsumable {
  item: Item;
  maxQuantity: number;
  ownedQuantity: number;
}

export interface Item {
  category: string;
  description: string;
  eventName: null;
  guardId: null;
  icon: string;
  id: number;
  name: string;
  rarity: string;
  rarityText: string;
  tradable: boolean;
  type: string;
}

export {};
