import { LocalStorageKey } from "./local_storage.enum";
import type { Outfit } from "./outfit";

export class LocalStorage {
  get favorites(): Outfit[] {
    const json = localStorage.getItem(LocalStorageKey.favorites);
    const outfits: Outfit[] = json != null ? JSON.parse(json) : [];
    return outfits;
  }

  set favorites(clothes: Outfit[]) {
    localStorage.setItem(LocalStorageKey.favorites, JSON.stringify(clothes));
  }
}
