import { LocalStorageKey } from "./local_storage/local_storage.enum";

export function loadFavorites() {
  const slots = document.getElementById("mCSB_4_container");
  if (!slots) {
    return;
  }

  // // Remove locked slots
  // document
  //   .querySelectorAll(".slot.locked-slot")
  //   .forEach((e) => e.parentNode?.removeChild(e));

  // const available = slots.querySelector(".slot.available-slot");

  localStorage.getItem(LocalStorageKey.favorites);
}
