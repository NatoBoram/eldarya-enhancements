import { loadCarousel } from "./carousel";
import { loadDailies } from "./daily";
import { loadMenu } from "./menu";

function load() {
  loadMenu();
  loadCarousel();
  loadDailies();
}

new MutationObserver(load).observe(<Node>document.getElementById("container"), {
  childList: true,
});
load();

console.log("Eldarya Enhancements loaded.");
