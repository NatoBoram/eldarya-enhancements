import type { Template } from "hogan.js"
import { carouselBeemoovAnnoyances } from "../carousel/carousel_beemoov_annoyances"
import { carouselDownloadFace } from "../carousel/carousel_download_face"
import { carouselDownloadGuardian } from "../carousel/carousel_download_guardian"
import { carouselEE } from "../carousel/carousel_eldarya_enhancements"
import { carouselTakeover } from "../carousel/carousel_takeover"
import { downloadFace, downloadGuardian } from "../download-canvas"
import { translate } from "../i18n/translate"
import { LocalStorage } from "../local_storage/local_storage"
import { SessionStorage } from "../session_storage/session_storage"
import { toggleTakeover } from "../takeover/brain"

export function loadCarousel(): void {
  const carouselInner = document.querySelector("#carousel-inner")
  if (!carouselInner || document.querySelector(".carousel-ee")) {
    return
  }

  // Import carousel template
  const template: Template = require("../templates/html/carousel_news.html")

  const contexts = [
    // Intro
    carouselEE,

    // Features
    ...((LocalStorage.minigames ||
      LocalStorage.explorations ||
      LocalStorage.market) &&
    LocalStorage.unlocked
      ? [carouselTakeover]
      : []),
    carouselDownloadGuardian,
    carouselDownloadFace,

    // Ads
    carouselBeemoovAnnoyances,
  ]

  // Add entries to the carousel
  carouselInner.insertAdjacentHTML(
    "beforeend",
    contexts.map(banner => template.render(banner)).join("\n")
  )

  // Add links
  for (const carousel of contexts) {
    if (!carousel.href) continue

    const element = carouselInner.querySelector(`#${carousel.id}`)
    if (!element) continue

    element.addEventListener("click", () => {
      if (element.classList.contains("active")) open(carousel.href, "_blank")
    })
  }

  // Add click events

  document
    .getElementById(carouselDownloadFace.id)
    ?.addEventListener("click", downloadFace)

  document
    .getElementById(carouselDownloadGuardian.id)
    ?.addEventListener("click", downloadGuardian)

  const takeoverAnchor = document.getElementById(carouselTakeover.id)
  takeoverAnchor?.addEventListener("click", () => {
    toggleTakeover()
    takeoverTitle(takeoverAnchor)
  })

  if (takeoverAnchor) takeoverTitle(takeoverAnchor)
}

function takeoverTitle(takeoverAnchor: HTMLElement): void {
  const takeoverH4 = takeoverAnchor.querySelector("h4")
  if (takeoverH4) {
    takeoverH4.innerText = SessionStorage.takeover
      ? translate.carousel.takeover.disable_takeover
      : translate.carousel.takeover.enable_takeover
  }
}
