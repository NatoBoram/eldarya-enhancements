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
  document
    .getElementById("avatar-menu-container-outer")
    ?.addEventListener("click", () => pageLoad("/player/profile"))

  const headerProfile = document.getElementById("header-profile")?.firstChild
  if (headerProfile?.textContent) {
    const a = document.createElement("a")
    a.href = "/player/profile"
    a.style.color = "var(--text-color)"
    a.style.fontFamily = '"Alegreya Sans", sans-serif'
    a.style.fontWeight = "unset"
    a.textContent = headerProfile.textContent.trim()

    const p = document.createElement("p")
    p.insertAdjacentElement("beforeend", a)

    headerProfile.replaceWith(p)
  }
}
