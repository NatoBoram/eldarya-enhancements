import { translate } from "../i18n/translate"
import type { CarouselNews } from "../templates/interfaces/carousel_news"

export const carouselDownloadGuardian: CarouselNews = {
	backgroundImage:
		"https://gitlab.com/NatoBoram/eldarya-enhancements/-/raw/master/images/carousel_download_guardian.png",
	id: "carousel-download-guardian",
	h4: translate.carousel.download_guardian.title,
	p: translate.carousel.download_guardian.subtitle,
}
