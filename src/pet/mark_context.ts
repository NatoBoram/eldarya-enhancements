import { translate } from "../i18n/translate"

interface MarkContext {
	src: string
	textContent: string
}

export const markAllContext: MarkContext = {
	src: "https://gitlab.com/NatoBoram/eldarya-enhancements/-/raw/master/images/picto_map_explo.png",
	textContent: translate.pet.mark_all,
}

export const unmarkAllContext: MarkContext = {
	src: "https://gitlab.com/NatoBoram/eldarya-enhancements/-/raw/master/images/picto_map.png",
	textContent: translate.pet.unmark_all,
}
