import { loadCarousel } from "./carousel";
import { loadDailies } from "./daily";
import { loadHomeContent } from "./home_content";
import { loadMenu } from "./menu";
import { loadMinigames } from "./minigames";

function load() {
  loadMenu();
  loadCarousel();
  loadHomeContent();

  // loadFavorites();

  loadMinigames();

  loadDailies();
}

new MutationObserver(load).observe(<Node>document.getElementById("container"), {
  childList: true,
});
load();

console.log("Eldarya Enhancements loaded.");
