import type { Template } from "hogan.js"
import type { MainMenu } from "../templates/interfaces/main_menu"

export function loadMenu(): void {
  const menuInnerRight = document.getElementById("menu-inner-right")
  if (!menuInnerRight || menuInnerRight.querySelector(".main-menu-ee")) return

  // Remove bank
  menuInnerRight.querySelector(".main-menu-bank")?.remove()

  // Add Forum
  const menuTemplate: Template = require("../templates/html/main_menu.html")
  const mainMenuForum: MainMenu = {
    class: "forum",
    href: "/forum",
    text: "Forum",
  }

  menuInnerRight.insertAdjacentHTML(
    "beforeend",
    menuTemplate.render(mainMenuForum)
  )
}
