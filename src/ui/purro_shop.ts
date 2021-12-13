import type { Template } from "hogan.js"
import { PurroshopStatus } from "../api/meta"
import { LocalStorage } from "../local_storage/local_storage"

/** Shows a Purro'Shop button in the main menu when it's available. */
export function loadPurroShop(): void {
  document.querySelector(".main-menu-purroshop")?.remove()

  // A bug in WebPack prevents using `LocalStorage.meta?.purroshop.status`.
  if (
    LocalStorage.meta === null ||
    LocalStorage.meta.purroshop.status !== PurroshopStatus.enabled
  )
    return

  const template: Template = require("../templates/html/main_menu_purroshop.html")
  document
    .getElementById("menu-inner-left")
    ?.insertAdjacentHTML("afterbegin", template.render({}))
}
