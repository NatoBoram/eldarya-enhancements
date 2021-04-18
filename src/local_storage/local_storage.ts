import { LocalStorageKey } from "./local_storage.enum";
import { Outfit } from "./outfit";

export class LocalStorage {
  get favorites(): Outfit[] {
    const json = localStorage.getItem(LocalStorageKey.favorites);
    return json ? JSON.parse(json) : [];
  }

  set favorites(clothes: Outfit[]) {
    localStorage.setItem(
      LocalStorageKey.favorites,
      JSON.stringify(clothes ?? [])
    );
  }
}
