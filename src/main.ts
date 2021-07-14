import { loadTakeover } from "./takeover/brain"
import { loadAppearance } from "./ui/appearance"
import { loadCarousel } from "./ui/carousel"
import { loadHomeContent } from "./ui/home_content"
import { loadMarket } from "./ui/market"
import { loadMenu } from "./ui/menu"
import { loadPet } from "./ui/pet"
import { loadProfile } from "./ui/profile"
import { loadSettings } from "./ui/settings"
import { loadWishlist } from "./ui/wishlist"

// loadJS("https://unpkg.com/hogan.js/dist/template-3.0.2.min.js", true);

function load(): void {
  loadUI()
  loadTakeover()
}

function loadUI(): void {
  loadMenu()
  loadCarousel()
  loadHomeContent()
  loadAppearance()
  loadProfile()
  loadSettings()
  loadPet()
  loadMarket()
  loadWishlist()

  document.querySelector<HTMLImageElement>(".music-hidden-voice")?.click()
}

new MutationObserver(load).observe(<Node>document.getElementById("container"), {
  childList: true,
})
load()

console.log("Eldarya Enhancements loaded.")
