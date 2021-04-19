import { loadCarousel } from "./carousel";
import { loadDailies } from "./daily";
import { loadMenu } from "./menu";
import { loadMinigames } from "./minigames";

function load() {
  loadMenu();
  loadCarousel();
  // loadFavorites();
  loadMinigames();

  loadDailies();
}

new MutationObserver(load).observe(<Node>document.getElementById("container"), {
  childList: true,
});
load();

console.log("Eldarya Enhancements loaded.");
