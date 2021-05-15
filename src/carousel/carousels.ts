import type { CarouselNews } from "../templates/interfaces/carousel_news";
import { carouselBeemoovAnnoyances } from "./carousel_beemoov_annoyances";
import { carouselDownloadFace } from "./carousel_download_face";
import { carouselDownloadGuardian } from "./carousel_download_guardian";
import { carouselEE } from "./carousel_eldarya_enhancements";
import { carouselTakeover } from "./carousel_takeover";

export const carousels: CarouselNews[] = [
  // Intro
  carouselEE,

  // Features
  carouselDownloadFace,
  carouselDownloadGuardian,
  carouselTakeover,

  // Ads
  carouselBeemoovAnnoyances,
];
