import { en } from "./en"
import { fr } from "./fr"
import type { Translation } from "./translation"

function translation(): Translation {
	if (location.hostname.endsWith(".com.br")) return en
	if (location.hostname.endsWith(".de")) return en
	if (location.hostname.endsWith(".es")) return en
	if (location.hostname.endsWith(".hu")) return en
	if (location.hostname.endsWith(".it")) return en
	if (location.hostname.endsWith(".pl")) return en
	if (location.hostname.endsWith(".ru")) return en
	if (location.hostname.endsWith(".com")) return en
	if (location.hostname.endsWith(".fr")) return fr
	else return en
}

export const translate = translation()
