import { loadDressingExperience } from "./appearance/dressing_experience"
import { migrate } from "./migrate"
import { loadTakeover } from "./takeover/brain"
import { loadAuctions } from "./ui/auctions"
import { loadCarousel } from "./ui/carousel"
import { loadFavourites } from "./ui/favourites"
import { loadHomeContent } from "./ui/home_content"
import { loadMall } from "./ui/mall"
import { loadMarket } from "./ui/market"
import { loadMenu } from "./ui/menu"
import { loadPet } from "./ui/pet"
import { loadProfile } from "./ui/profile"
import { loadPurroShop } from "./ui/purro_shop"
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
  loadPurroShop()
  loadMall()

  // Eldarya is crashing when opening groups.
  // TODO: decode the worn outfit and send them to the server.
  // TODO: Handle errors and stop the loading process.
  void loadDressingExperience()

  if (document.readyState === "complete") void loadIndexedDb()
  else window.addEventListener("load", () => loadIndexedDb())
}

function loadIndexedDb(): void {
  void loadSettings()
}

new MutationObserver(load).observe(
  document.getElementById("container") as Node,
  {
    childList: true,
  }
)

migrate()

loadUI()
console.log(`${GM.info.script.name} v${GM.info.script.version} loaded.`)
loadTakeover()
