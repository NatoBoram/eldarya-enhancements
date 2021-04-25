import { LocalStorageKey } from "./local_storage.enum";
import type { ShareableOutfit } from "./shareable_outfit";

export class LocalStorage {
  get favorites(): ShareableOutfit[] {
    const json = localStorage.getItem(LocalStorageKey.favorites);
    const outfits: ShareableOutfit[] = json != null ? JSON.parse(json) : [];
    return outfits;
  }

  set favorites(clothes: ShareableOutfit[]) {
    localStorage.setItem(LocalStorageKey.favorites, JSON.stringify(clothes));
  }
}
