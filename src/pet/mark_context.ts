import { translate } from "../i18n/translate"

interface MarkContext {
  src: string
  textContent: string
}

export const markAllContext: MarkContext = {
  // src: "https://gitlab.com/NatoBoram/eldarya-enhancements/-/raw/master/images/picto_map_explo.png",
  src: "https://gitlab.com/NatoBoram/eldarya-enhancements/uploads/769f70a785f076b59752e1fee2297e6b/picto_map_explo.png",
  textContent: translate.pet.mark_all,
}

export const unmarkAllContext: MarkContext = {
  // src: "https://gitlab.com/NatoBoram/eldarya-enhancements/-/raw/master/images/picto_map.png",
  src: "https://gitlab.com/NatoBoram/eldarya-enhancements/uploads/a438a801bf760b8415c11745ad868a61/picto_map.png",
  textContent: translate.pet.unmark_all,
}
