import { translate } from "../i18n/translate"

interface MarkContext {
  src: string
  textContent: string
}

export const markAllContext: MarkContext = {
  src: "/static/img/new-layout/pet/icons/picto_map_explo.png",
  textContent: translate.pet.mark_all,
}

export const unmarkAllContext: MarkContext = {
  src: "/static/img/new-layout/pet/icons/picto_map.png",
  textContent: translate.pet.unmark_all,
}
