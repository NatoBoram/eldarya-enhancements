import { loadFavoritesActions } from "./favorites";

let observer: MutationObserver | null;

export function loadAppearance(): void {
  observer?.disconnect();
  observer = null;

  const appearanceRight = document.getElementById("appearance-items");
  if (!appearanceRight) return;

  observer = new MutationObserver(load);
  observer.observe(appearanceRight, {
    childList: true,
  });
  load();
}

function load() {
  loadFavoritesActions();
}
