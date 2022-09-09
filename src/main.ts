import { loadDressingExperience } from "./appearance/dressing_experience"
import { loadCheatCodes } from "./cheat_codes"
import { Console } from "./console"
import { translate } from "./i18n/translate"
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
  const container = document.getElementById("container")
  if (!container) {
    $.flavrNotif(translate.error.longLoading)
    Console.error("#container couldn't be found:", container)
    return void setTimeout(load, 10_000)
  }

  migrate()
  loadUI()
  observe()

  Console.log(`${GM.info.script.name} v${GM.info.script.version} loaded.`)
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
  loadCheatCodes()
  loadSettings()

  // Eldarya is crashing when opening groups.
  // TODO: Handle errors and stop the loading process.
  void loadDressingExperience()
}

function observe(): void {
  const container = document.getElementById("container")
  new MutationObserver(reload).observe(container as Node, { childList: true })
}

function reload(): void {
  loadUI()
  loadTakeover()
}

Console.log("Loading...")
if (document.readyState === "complete") load()
else window.addEventListener("load", () => load())
