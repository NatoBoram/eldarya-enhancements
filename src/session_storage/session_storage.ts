import type { Meta } from "../api/meta";
import type { AutoExploreLocation } from "../local_storage/auto_explore_location";
import { SessionStorageKey } from "./session_storage.enum";

export class SessionStorage {
  private static readonly sessionStorage = sessionStorage;

  public static get explorationsDone(): boolean {
    return this.getItem(SessionStorageKey.explorationsDone, false);
  }

  public static set explorationsDone(done: boolean) {
    this.setItem(SessionStorageKey.explorationsDone, done);
  }

  public static get meta(): Meta | null {
    return this.getItem(SessionStorageKey.meta, null);
  }

  public static set meta(meta: Meta | null) {
    this.setItem(SessionStorageKey.meta, meta);
  }

  public static get minigamesDone(): boolean {
    return this.getItem(SessionStorageKey.minigamesDone, false);
  }

  public static set minigamesDone(done: boolean) {
    this.setItem(SessionStorageKey.minigamesDone, done);
  }

  public static get selectedLocation(): AutoExploreLocation | null {
    return this.getItem(SessionStorageKey.selectedLocation, null);
  }

  public static set selectedLocation(selected: AutoExploreLocation | null) {
    this.setItem(SessionStorageKey.selectedLocation, selected);
  }

  public static get takeover(): boolean {
    return this.getItem(SessionStorageKey.takeover, false);
  }

  public static set takeover(enabled: boolean) {
    this.setItem(SessionStorageKey.takeover, enabled);
  }

  private static getItem<T>(key: SessionStorageKey, fallback: T): T {
    return <T>(
      JSON.parse(this.sessionStorage.getItem(key) ?? JSON.stringify(fallback))
    );
  }

  private static setItem<T>(key: SessionStorageKey, value: T): void {
    this.sessionStorage.setItem(key, JSON.stringify(value));
  }
}
