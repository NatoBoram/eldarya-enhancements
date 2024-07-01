import { translate } from "../i18n/translate"
import type { CarouselNews } from "../templates/interfaces/carousel_news"

export const carouselTakeover: CarouselNews = {
	backgroundImage:
		"https://gitlab.com/NatoBoram/eldarya-enhancements/-/raw/master/images/carousel_takeover.png",
	id: "carousel-takeover",
	h4: translate.carousel.takeover.title,
	p: translate.carousel.takeover.subtitle,
}
