import type { Template } from "hogan.js";
import { carousels } from "../carousel/carousels";
import { carouselDownloadFace } from "../carousel/carousel_download_face";
import { carouselDownloadGuardian } from "../carousel/carousel_download_guardian";
import { carouselTakeover } from "../carousel/carousel_takeover";
import { downloadFace, downloadGuardian } from "../download-canvas";
import { toggleTakeover } from "../takeover/brain";
import type { CarouselNews } from "../templates/interfaces/carousel_news";

export function loadCarousel(): void {
  const carouselInner = document.querySelector("#carousel-inner");
  if (!carouselInner || document.querySelector(".carousel-ee")) {
    return;
  }

  // Import carousel template
  const template: Template = require("../templates/html/carousel_news.html");

  // Add entries to the carousel
  carouselInner.insertAdjacentHTML(
    "beforeend",
    carousels.map((banner: CarouselNews) => template.render(banner)).join("\n")
  );

  // Add click events

  document
    .getElementById(carouselDownloadFace.id)
    ?.addEventListener("click", downloadFace);

  document
    .getElementById(carouselDownloadGuardian.id)
    ?.addEventListener("click", downloadGuardian);

  document
    .getElementById(carouselTakeover.id)
    ?.addEventListener("click", toggleTakeover);
}
