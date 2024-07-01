import { translate } from "../i18n/translate"
import type { CarouselNews } from "../templates/interfaces/carousel_news"

export const carouselEE: CarouselNews = {
	backgroundImage:
		"https://gitlab.com/NatoBoram/eldarya-enhancements/-/raw/master/images/carousel_eldarya_enhancements.png",
	h4: translate.carousel.eldarya_enhancements.title,
	href: GM.info.script.namespace,
	id: "carousel-eldarya-enhancements",
	p: translate.carousel.eldarya_enhancements.subtitle,
}
