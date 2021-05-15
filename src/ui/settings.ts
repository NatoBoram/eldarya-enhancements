import type { Template } from "hogan.js";
import { LocalStorage } from "../local_storage/local_storage";

export function loadSettings(): void {
  const accountRight = document.querySelector("#account-right div");
  if (!accountRight || accountRight.querySelector(".account-ee-bloc")) return;

  const settingsTemplate: Template = require("../templates/html/settings.html");

  accountRight.insertAdjacentHTML(
    "beforeend",
    settingsTemplate.render(LocalStorage.settings)
  );

  document
    .getElementById("ee-minigames-enabled")
    ?.addEventListener("click", () => {
      LocalStorage.minigames = !LocalStorage.minigames;
      reloadSettings();
    });
}

function reloadSettings(): void {
  document.querySelector<HTMLDivElement>(".account-ee-bloc")?.remove();
  loadSettings();
}
