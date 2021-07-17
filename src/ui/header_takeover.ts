import type { Template } from "hogan.js"
import { SessionStorage } from "../session_storage/session_storage"
import { toggleTakeover } from "../takeover/brain"

export function loadHeaderTakeover(): void {
  const headerRight = document.getElementById("header-right")
  if (!headerRight) return

  const headerTakeover = headerRight.querySelector("#header-takeover")
  if (SessionStorage.takeover) {
    if (!headerTakeover) {
      const template: Template = require("../templates/html/header_takeover.html")
      headerRight.insertAdjacentHTML("afterbegin", template.render({}))

      headerRight
        .querySelector("#header-takeover")
        ?.addEventListener("click", toggleTakeover)
    }
  } else {
    headerTakeover?.remove()
  }
}
