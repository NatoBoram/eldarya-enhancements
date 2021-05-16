import { loadTakeover } from "./takeover/brain";
import { loadAppearance } from "./ui/appearance";
import { loadCarousel } from "./ui/carousel";
import { loadHomeContent } from "./ui/home_content";
import { loadMenu } from "./ui/menu";
import { loadPet } from "./ui/pet";
import { loadProfile } from "./ui/profile";
import { loadSettings } from "./ui/settings";

function load() {
  loadUI();
  loadTakeover();
}

function loadUI() {
  loadMenu();
  loadCarousel();
  loadHomeContent();
  loadAppearance();
  loadProfile();
  loadSettings();
  loadPet();
}

new MutationObserver(load).observe(<Node>document.getElementById("container"), {
  childList: true,
});
load();

console.log("Eldarya Enhancements loaded.");
