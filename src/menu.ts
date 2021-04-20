import { Template } from "hogan.js";
import { MainMenu } from "./templates/interfaces/main_menu";

export function loadMenu(): void {
  const menuInnerRight = document.getElementById("menu-inner-right");
  if (!menuInnerRight || document.querySelector(".main-menu-ee")) {
    return;
  }

  const menuTemplate: Template = require("./templates/html/main_menu.html");
  const mainMenuForum: MainMenu = {
    class: "forum",
    href: "/forum",
    text: "Forum",
  };

  menuInnerRight.insertAdjacentHTML(
    "beforeend",
    menuTemplate.render(mainMenuForum)
  );
}
