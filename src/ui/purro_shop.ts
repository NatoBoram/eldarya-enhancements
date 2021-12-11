import type { Template } from "hogan.js"
import { PurroshopStatus } from "../api/meta"
import { LocalStorage } from "../local_storage/local_storage"

export function loadPurroShop(): void {
  document.querySelector(".main-menu-purroshop")?.remove()
  if (LocalStorage.meta?.purroshop.status !== PurroshopStatus.enabled) return

  const template: Template = require("../templates/html/main_menu_purroshop.html")
  document
    .getElementById("menu-inner-left")
    ?.insertAdjacentHTML("afterbegin", template.render({}))
}
