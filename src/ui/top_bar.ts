import type { Template } from "hogan.js"
import { SessionStorage } from "../session_storage/session_storage"
import { toggleTakeover } from "../takeover/brain"

export function loadTopBar(): void {
  const headerRight = document.getElementById("header-right")
  if (!headerRight) return

  const headerTakeover = headerRight.querySelector("#header-takeover")
  if (headerTakeover) headerTakeover.remove()
  else loadLinks()

  const template: Template = require("../templates/html/header_takeover.html")
  headerRight.insertAdjacentHTML(
    "afterbegin",
    template.render({ takeover: SessionStorage.takeover })
  )

  headerRight
    .querySelector("#header-takeover")
    ?.addEventListener("click", toggleTakeover)
}

function loadLinks(): void {
  for (const id of ["header-profile", "avatar-menu-container-outer"]) {
    document.getElementById(id)?.addEventListener("click", () => {
      pageLoad("/player/profile")
    })
  }
}
