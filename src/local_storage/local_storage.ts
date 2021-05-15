import type { Settings } from "../templates/interfaces/settings";
import { LocalStorageKey } from "./local_storage.enum";
import type { ShareableOutfit } from "./shareable_outfit";

export class LocalStorage {
  private static readonly localStorage = localStorage;

  public static get explorations(): boolean {
    return this.getBoolean(LocalStorageKey.explorations, false);
  }

  public static set explorations(enabled: boolean) {
    this.setItem(LocalStorageKey.explorations, enabled);
  }

  public static get favorites(): ShareableOutfit[] {
    const json = this.localStorage.getItem(LocalStorageKey.favorites);
    const outfits: ShareableOutfit[] = json != null ? JSON.parse(json) : [];
    return outfits;
  }

  public static set favorites(clothes: ShareableOutfit[]) {
    this.setItem(LocalStorageKey.favorites, clothes);
  }

  public static get market(): boolean {
    return this.getBoolean(LocalStorageKey.market, false);
  }

  public static set market(enabled: boolean) {
    this.setItem(LocalStorageKey.market, enabled);
  }

  public static get minigames(): boolean {
    return this.getBoolean(LocalStorageKey.minigames, false);
  }

  public static set minigames(enabled: boolean) {
    this.setItem(LocalStorageKey.minigames, enabled);
  }

  public static get settings(): Settings {
    return {
      explorations: this.explorations,
      market: this.market,
      minigames: this.minigames,
    };
  }

  private static getBoolean(key: LocalStorageKey, fallback: boolean): boolean {
    return Boolean(
      JSON.parse(this.localStorage.getItem(key) ?? JSON.stringify(fallback))
    );
  }

  private static setItem<T>(key: LocalStorageKey, value: T) {
    this.localStorage.setItem(key, JSON.stringify(value));
  }
}
