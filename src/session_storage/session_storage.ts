import type { Meta } from "../api/meta"
import type { AutoExploreLocation } from "../local_storage/auto_explore_location"
import type { WishedItem } from "../local_storage/wished_item"
import { SessionStorageKey } from "./session_storage.enum"
import { TakeoverAction } from "./takeover_action.enum"

export class SessionStorage {
  private static readonly sessionStorage = sessionStorage

  static get action(): TakeoverAction {
    return this.getItem(SessionStorageKey.action, TakeoverAction.daily)
  }

  static set action(action: TakeoverAction | null) {
    this.setItem(SessionStorageKey.action, action)
  }

  static get debug(): boolean {
    return this.getItem<boolean>(SessionStorageKey.debug, false)
  }

  static set debug(enabled: boolean) {
    this.setItem(SessionStorageKey.debug, enabled)
  }

  static get explorationsDone(): boolean {
    return this.getItem(SessionStorageKey.explorationsDone, false)
  }

  static set explorationsDone(done: boolean) {
    this.setItem(SessionStorageKey.explorationsDone, done)
  }

  static get meta(): Meta | null {
    return this.getItem(SessionStorageKey.meta, null)
  }

  static set meta(meta: Meta | null) {
    this.setItem(SessionStorageKey.meta, meta)
  }

  static get minigamesDone(): boolean {
    return this.getItem(SessionStorageKey.minigamesDone, false)
  }

  static set minigamesDone(done: boolean) {
    this.setItem(SessionStorageKey.minigamesDone, done)
  }

  static get selectedLocation(): AutoExploreLocation | null {
    return this.getItem(SessionStorageKey.selectedLocation, null)
  }

  static set selectedLocation(selected: AutoExploreLocation | null) {
    this.setItem(SessionStorageKey.selectedLocation, selected)
  }

  static get takeover(): boolean {
    return this.getItem(SessionStorageKey.takeover, false)
  }

  static set takeover(enabled: boolean) {
    this.setItem(SessionStorageKey.takeover, enabled)
  }

  static get wishlist(): WishedItem[] {
    return this.getItem(SessionStorageKey.wishlist, [])
  }

  static set wishlist(wishlist: WishedItem[]) {
    this.setItem(SessionStorageKey.wishlist, wishlist)
  }

  private static getItem<T>(key: SessionStorageKey, fallback: T): T {
    return <T>(
      (JSON.parse(
        this.sessionStorage.getItem(key) ?? JSON.stringify(fallback)
      ) ?? fallback)
    )
  }

  private static setItem<T>(key: SessionStorageKey, value: T): void {
    this.sessionStorage.setItem(key, JSON.stringify(value))
  }
}
