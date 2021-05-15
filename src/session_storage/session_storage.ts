import { SessionStorageKey } from "./session_storage.enum";

export class SessionStorage {
  private static readonly sessionStorage = sessionStorage;

  public static get minigamesDone(): boolean {
    return this.getBoolean(SessionStorageKey.minigamesDone, false);
  }

  public static set minigamesDone(done: boolean) {
    this.setItem(SessionStorageKey.minigamesDone, done);
  }

  public static get takeover(): boolean {
    return this.getBoolean(SessionStorageKey.takeover, false);
  }

  public static set takeover(enabled: boolean) {
    this.setItem(SessionStorageKey.takeover, enabled);
  }

  private static getBoolean(
    key: SessionStorageKey,
    fallback: boolean
  ): boolean {
    return Boolean(
      JSON.parse(this.sessionStorage.getItem(key) ?? JSON.stringify(fallback))
    );
  }

  private static setItem<T>(key: SessionStorageKey, value: T) {
    this.sessionStorage.setItem(key, JSON.stringify(value));
  }
}
