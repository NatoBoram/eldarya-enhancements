import { loadDressingExperience } from "./appearance/dressing_experience"
import { translate } from "./i18n/translate"
import { migrate } from "./migrate"
import { loadTakeover } from "./takeover/brain"
import { loadAuctions } from "./ui/auctions"
import { loadCarousel } from "./ui/carousel"
import { loadFavourites } from "./ui/favourites"
import { loadHomeContent } from "./ui/home_content"
import { loadMarket } from "./ui/market"
import { loadMenu } from "./ui/menu"
import { loadPet } from "./ui/pet"
import { loadProfile } from "./ui/profile"
import { loadSell } from "./ui/sell"
import { loadSettings } from "./ui/settings"
import { loadTopBar } from "./ui/top_bar"
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
  loadFavourites()
  loadProfile()
  loadPet()
  loadMarket()
  loadWishlist()
  loadTopBar()
  loadAuctions()
  loadSell()
  loadDressingExperience()

  if (document.readyState === "complete") void loadIndexedDb()
  else window.addEventListener("load", () => loadIndexedDb())
}

function loadIndexedDb(): void {
  void loadSettings()
}

new MutationObserver(load).observe(<Node>document.getElementById("container"), {
  childList: true,
})

migrate()

loadUI()
console.log(translate.home.script_loaded)
loadTakeover()
