import { loadDressingExperience } from "./appearance/dressing_experience"
import { DurationUnit } from "./duration"
import { migrate } from "./migrate"
import { loadTakeover } from "./takeover/brain"
import { loadAppearance } from "./ui/appearance"
import { loadAuctions } from "./ui/auctions"
import { loadCarousel } from "./ui/carousel"
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
  loadAppearance()
  loadProfile()
  loadSettings()
  loadPet()
  loadMarket()
  loadWishlist()
  loadTopBar()
  loadAuctions()
  loadSell()
  loadDressingExperience()

  setTimeout(() => {
    document.querySelector<HTMLImageElement>(".music-hidden-voice")?.click()
  }, DurationUnit.second)
}

window.addEventListener("load", () => {
  document.querySelector<HTMLImageElement>(".music-hidden-voice")?.click()
})

new MutationObserver(load).observe(<Node>document.getElementById("container"), {
  childList: true,
})

migrate()

loadUI()
console.log(`${GM.info.script.name} v${GM.info.script.version} loaded.`)
loadTakeover()
