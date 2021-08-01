import type { Template } from "hogan.js"
import { translate } from "../i18n/translate"
import type { HomeContentSmall } from "../templates/interfaces/home_content_small"

export function loadHomeContent(): void {
  const homeContentSmalls = document.getElementById("home-content-smalls")
  if (
    !homeContentSmalls ||
    homeContentSmalls.querySelector(".home-content-small-ee")
  )
    return

  // Remove bank
  document.getElementById("home-bank")?.remove()

  // Add forum
  const smallTemplate: Template = require("../templates/html/home_content_small.html")
  const smallContent: HomeContentSmall = {
    backgroundImage:
      "/assets/img/minigames/treasurehunt/a48bbc4e4849745ebe6dbcf5313eb3f0.jpg",
    h4: translate.home.forum,
    href: "/forum",
    id: "forum",
  }

  homeContentSmalls.insertAdjacentHTML(
    "beforeend",
    smallTemplate.render(smallContent)
  )
}
