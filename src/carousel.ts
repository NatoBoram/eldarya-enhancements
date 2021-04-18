import { Template } from "hogan.js";
import { downloadFace } from "./download-face";
import { CarouselNews } from "./templates/interfaces/carousel_news";

export function loadCarousel() {
  const carouselInner = document.querySelector("#carousel-inner");
  if (!carouselInner || document.querySelector(".carousel-ee")) {
    return;
  }

  // Import carousel template
  const carousel: Template = require("./templates/html/carousel_news.html");

  // Declare carousel entries
  const news: CarouselNews[] = [
    {
      backgroundImage: "",
      h4: "Eldarya Enhancements",
      p: "Enhances the user experience of Eldarya.",
    },
    {
      backgroundImage:
        "https://cdn.discordapp.com/attachments/161636856482496522/833390927569616926/CarrouselDownloadGuardian.png",
      id: "carousel-download-face",
      h4: "Download your face!",
      p: "Click here to download your guardian's face.",
    },
  ];

  // Add entries to the carousel
  carouselInner.insertAdjacentHTML(
    "beforeend",
    news.map((banner: CarouselNews) => carousel.render(banner)).join("\n")
  );

  // Add click events
  document
    .getElementById("carousel-download-face")
    ?.addEventListener("click", downloadFace);
}
