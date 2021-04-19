import { CarouselNews } from "../templates/interfaces/carousel_news";
import { carouselDownloadFace } from "./carousel_download_face";
import { carouselDownloadGuardian } from "./carousel_download_guardian";
import { carouselEE } from "./carousel_eldarya_enhancements";

export const carousels: CarouselNews[] = [
  carouselEE,
  carouselDownloadFace,
  carouselDownloadGuardian,
];
