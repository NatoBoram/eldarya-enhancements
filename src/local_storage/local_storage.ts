import type { Settings } from "../templates/interfaces/settings";
import type { AutoExploreLocation } from "./auto_explore_location";
import { LocalStorageKey } from "./local_storage.enum";
import type { WishedItem } from "./wished_item";

export class LocalStorage {
  private static readonly localStorage = localStorage;

  public static get autoExploreLocations(): AutoExploreLocation[] {
    return this.getItem<AutoExploreLocation[]>(
      LocalStorageKey.autoExploreLocations,
      []
    );
  }

  public static set autoExploreLocations(locations: AutoExploreLocation[]) {
    this.setItem(LocalStorageKey.autoExploreLocations, locations);
  }

  public static get explorations(): boolean {
    return this.getItem<boolean>(LocalStorageKey.explorations, false);
  }

  public static set explorations(enabled: boolean) {
    this.setItem(LocalStorageKey.explorations, enabled);
  }

  public static get market(): boolean {
    return this.getItem<boolean>(LocalStorageKey.market, false);
  }

  public static set market(enabled: boolean) {
    this.setItem(LocalStorageKey.market, enabled);
  }

  public static get minigames(): boolean {
    return this.getItem<boolean>(LocalStorageKey.minigames, false);
  }

  public static set minigames(enabled: boolean) {
    this.setItem(LocalStorageKey.minigames, enabled);
  }

  public static get settings(): Settings {
    return {
      autoExploreLocations: this.autoExploreLocations,
      explorations: this.explorations,
      market: this.market,
      minigames: this.minigames,
    };
  }

  public static set settings(settings: Settings) {
    this.autoExploreLocations = settings.autoExploreLocations;
    this.explorations = settings.explorations;
    this.market = settings.market;
    this.minigames = settings.minigames;
  }

  public static get wishlist(): WishedItem[] {
    return this.getItem<WishedItem[]>(LocalStorageKey.wishlist, []);
  }

  public static set wishlist(locations: WishedItem[]) {
    this.setItem(LocalStorageKey.wishlist, locations);
  }

  private static getItem<T>(key: LocalStorageKey, fallback: T): T {
    return <T>(
      JSON.parse(this.localStorage.getItem(key) ?? JSON.stringify(fallback))
    );
  }

  private static setItem<T>(key: LocalStorageKey, value: T): void {
    this.localStorage.setItem(key, JSON.stringify(value));
  }
}
