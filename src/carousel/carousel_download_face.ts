import { translate } from "../i18n/translate"
import type { CarouselNews } from "../templates/interfaces/carousel_news"

export const carouselDownloadFace: CarouselNews = {
  backgroundImage:
    "https://gitlab.com/NatoBoram/eldarya-enhancements/-/raw/master/images/carousel_download_face.png",
  id: "carousel-download-face",
  h4: translate.carousel.download_face.title,
  p: translate.carousel.download_face.subtitle,
}
