import { base64StringToBlob, blobToBase64String } from "blob-util"
import type { Meta } from "../api/meta"
import type { FavouriteOutfit } from "../appearance/interfaces/favourite_outfit"
import indexed_db from "../indexed_db/indexed_db"
import type { MarketEntry } from "../marketplace/interfaces/market_entry"
import type { Settings } from "../templates/interfaces/settings"
import type { AutoExploreLocation } from "./auto_explore_location"
import type { ExplorationResult } from "./exploration_result"
import type { ExportableFavourite } from "./exportable_favourite"
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

  static get explorationHistory(): ExplorationResult[] {
    return this.getItem<ExplorationResult[]>(
      LocalStorageKey.explorationHistory,
      []
    )
  }

  static set explorationHistory(explorationHistory: ExplorationResult[]) {
    this.setItem(LocalStorageKey.explorationHistory, explorationHistory)
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

  static get meta(): Meta | null {
    return this.getItem<Meta | null>(LocalStorageKey.meta, null)
  }

  static set meta(meta: Meta | null) {
    this.setItem(LocalStorageKey.meta, meta)
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

  static get unlocked(): boolean {
    return this.getItem<boolean>(LocalStorageKey.unlocked, false)
  }

  static set unlocked(unlocked: boolean) {
    this.setItem(LocalStorageKey.unlocked, unlocked)
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

  static async getSettings(): Promise<Settings> {
    return {
      autoExploreLocations: this.autoExploreLocations,
      debug: this.debug,
      explorationHistory: this.explorationHistory,
      explorations: this.explorations,
      favourites: await Promise.all(
        (
          await indexed_db.getFavouriteOutfits()
        ).map<Promise<ExportableFavourite>>(async favourite => ({
          name: favourite.name,
          items: favourite.items,
          base64: await blobToBase64String(favourite.blob),
        }))
      ),
      market: this.market,
      minigames: this.minigames,
      unlocked: this.unlocked,
      version: this.version,
      wishlist: this.wishlist,
    }
  }

  static async setSettings(settings: Settings): Promise<void> {
    this.autoExploreLocations = settings.autoExploreLocations
    this.debug = settings.debug
    this.explorationHistory = settings.explorationHistory
    this.explorations = settings.explorations
    this.market = settings.market
    this.minigames = settings.minigames
    this.unlocked = settings.unlocked
    this.version = settings.version
    this.wishlist = settings.wishlist

    await indexed_db.clearFavouriteOutfits()
    for (const favourite of settings.favourites.map<FavouriteOutfit>(
      favourite => ({
        blob: base64StringToBlob(favourite.base64),
        items: favourite.items,
        name: favourite.name,
      })
    )) {
      void indexed_db.addFavouriteOutfit(favourite)
    }
  }

  private static getItem<T>(key: LocalStorageKey, fallback: T): T {
    return (JSON.parse(
      this.localStorage.getItem(key) ?? JSON.stringify(fallback)
    ) ?? fallback) as T
  }

  private static setItem<T>(key: LocalStorageKey, value: T): void {
    this.localStorage.setItem(key, JSON.stringify(value))
  }
}
