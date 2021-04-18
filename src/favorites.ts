import { LocalStorageKey } from "./local_storage/local_storage.enum";

export function loadFavorites() {
  // Remove locked slots
  document
    .querySelectorAll(".slot.locked-slot")
    .forEach((e) => e.parentNode!.removeChild(e));

  localStorage.getItem(LocalStorageKey.favorites);
}
