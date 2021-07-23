import type { MarketEntry } from "../marketplace/interfaces/market_entry"
import type { Settings } from "../templates/interfaces/settings"
import type { AutoExploreLocation } from "./auto_explore_location"
import { LocalStorageKey } from "./local_storage.enum"
import type { Sale } from "./sale"
import type { WishedItem } from "./wished_item"

export class LocalStorage {
  private static readonly localStorage = localStorage

  private constructor() {}

  static get autoExploreLocations(): AutoExploreLocation[] {
    return this.getItem<AutoExploreLocation[]>(
      LocalStorageKey.autoExploreLocations,
      []
    )
  }

  static set autoExploreLocations(locations: AutoExploreLocation[]) {
    this.setItem(LocalStorageKey.autoExploreLocations, locations)
  }

  static get debug(): boolean {
    return this.getItem<boolean>(LocalStorageKey.debug, false)
  }

  static set debug(enabled: boolean) {
    this.setItem(LocalStorageKey.debug, enabled)
  }

  static get explorations(): boolean {
    return this.getItem<boolean>(LocalStorageKey.explorations, false)
  }

  static set explorations(enabled: boolean) {
    this.setItem(LocalStorageKey.explorations, enabled)
  }

  static get market(): boolean {
    return this.getItem<boolean>(LocalStorageKey.market, false)
  }

  static set market(enabled: boolean) {
    this.setItem(LocalStorageKey.market, enabled)
  }

  static get minigames(): boolean {
    return this.getItem<boolean>(LocalStorageKey.minigames, false)
  }

  static set minigames(enabled: boolean) {
    this.setItem(LocalStorageKey.minigames, enabled)
  }

  static get purchases(): MarketEntry[] {
    return this.getItem<MarketEntry[]>(LocalStorageKey.purchases, [])
  }

  static set purchases(entry: MarketEntry[]) {
    this.setItem(LocalStorageKey.purchases, entry)
  }

  static get sales(): Sale[] {
    return this.getItem<Sale[]>(LocalStorageKey.sales, [])
  }

  static set sales(sale: Sale[]) {
    this.setItem(LocalStorageKey.sales, sale)
  }

  static get settings(): Settings {
    return {
      autoExploreLocations: this.autoExploreLocations,
      debug: this.debug,
      explorations: this.explorations,
      market: this.market,
      minigames: this.minigames,
      wishlist: this.wishlist,
    }
  }

  static set settings(settings: Settings) {
    this.autoExploreLocations = settings.autoExploreLocations
    this.debug = settings.debug
    this.explorations = settings.explorations
    this.market = settings.market
    this.minigames = settings.minigames
    this.wishlist = settings.wishlist
  }

  static get version(): string {
    return this.getItem<string>(LocalStorageKey.version, "")
  }

  static set version(version: string) {
    this.setItem(LocalStorageKey.version, version)
  }

  static get wishlist(): WishedItem[] {
    return this.getItem<WishedItem[]>(LocalStorageKey.wishlist, [])
  }

  static set wishlist(locations: WishedItem[]) {
    this.setItem(LocalStorageKey.wishlist, locations)
  }

  private static getItem<T>(key: LocalStorageKey, fallback: T): T {
    return <T>(
      (JSON.parse(this.localStorage.getItem(key) ?? JSON.stringify(fallback)) ??
        fallback)
    )
  }

  private static setItem<T>(key: LocalStorageKey, value: T): void {
    this.localStorage.setItem(key, JSON.stringify(value))
  }
}
