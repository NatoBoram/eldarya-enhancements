import type { CarouselNews } from "../templates/interfaces/carousel_news"

export const carouselEE: CarouselNews = {
  backgroundImage:
    "https://gitlab.com/NatoBoram/eldarya-enhancements/-/raw/master/images/carousel_eldarya_enhancements.png",
  h4: `${GM.info.script.name} v${GM.info.script.version}`,
  href: GM.info.script.namespace,
  id: "carousel-eldarya-enhancements",
  p: GM.info.script.description,
}
