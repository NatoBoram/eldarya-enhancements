import type { Template } from "hogan.js"
import { SessionStorage } from "../session_storage/session_storage"
import { toggleTakeover } from "../takeover/brain"

export function loadTopBar(): void {
  const headerRight = document.getElementById("header-right")
  if (!headerRight) return

  const headerTakeover = headerRight.querySelector("#header-takeover")
  headerTakeover?.remove()

  const template: Template = require("../templates/html/header_takeover.html")
  headerRight.insertAdjacentHTML(
    "afterbegin",
    template.render({ takeover: SessionStorage.takeover })
  )

  headerRight
    .querySelector("#header-takeover")
    ?.addEventListener("click", toggleTakeover)
}
