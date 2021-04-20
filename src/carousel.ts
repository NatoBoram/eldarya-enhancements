import { Template } from "hogan.js";
import { carousels } from "./carousel/carousels";
import { downloadFace, downloadGuardian } from "./download-canvas";
import { CarouselNews } from "./templates/interfaces/carousel_news";

export function loadCarousel(): void {
  const carouselInner = document.querySelector("#carousel-inner");
  if (!carouselInner || document.querySelector(".carousel-ee")) {
    return;
  }

  // Import carousel template
  const template: Template = require("./templates/html/carousel_news.html");

  // Add entries to the carousel
  carouselInner.insertAdjacentHTML(
    "beforeend",
    carousels.map((banner: CarouselNews) => template.render(banner)).join("\n")
  );

  // Add click events

  document
    .getElementById("carousel-download-face")
    ?.addEventListener("click", downloadFace);

  document
    .getElementById("carousel-download-guardian")
    ?.addEventListener("click", downloadGuardian);
}
