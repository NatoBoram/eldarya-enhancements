import { Template } from "hogan.js";
import { downloadFace, downloadGuardian } from "./download-canvas";
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
    // Eldarya Enhancements
    {
      backgroundImage: "",
      h4: "Eldarya Enhancements",
      p: "Enhances the user experience of Eldarya.",
    },
    // Download your face
    {
      backgroundImage:
        "https://gitlab.com/NatoBoram/eldarya-enhancements/-/raw/master/images/carousel_download_face.png",
      id: "carousel-download-face",
      h4: "Download your face!",
      p: "Click here to download your guardian's face.",
    },
    // Download your guardian
    {
      backgroundImage:
        "https://gitlab.com/NatoBoram/eldarya-enhancements/-/raw/master/images/carousel_download_guardian.png",
      id: "carousel-download-guardian",
      h4: "Download your guardian!",
      p: "Click here to download your guardian.",
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

  document
    .getElementById("carousel-download-guardian")
    ?.addEventListener("click", downloadGuardian);
}
