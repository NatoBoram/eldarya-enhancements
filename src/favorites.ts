import type { Template } from "hogan.js";
import { exportOutfit, importOutfit } from "./appearance/favorites_actions";
import type { FavoritesAction } from "./templates/interfaces/favorites_action";

export function loadFavoritesActions(): void {
  const actions = document.getElementById("favorites-actions");
  if (!actions || document.querySelector(".favorites-action-ee")) return;

  const actionTemplate: Template = require("./templates/html/favorites_action.html");
  const exportAction: FavoritesAction = {
    id: "export-outfit",
    text: "Export",
  };
  const importAction: FavoritesAction = {
    id: "import-outfit",
    text: "Import",
  };

  actions.insertAdjacentHTML("beforeend", actionTemplate.render(exportAction));
  actions.insertAdjacentHTML("beforeend", actionTemplate.render(importAction));

  document
    .getElementById(exportAction.id)
    ?.addEventListener("click", exportOutfit);

  document
    .getElementById(importAction.id)
    ?.addEventListener("click", importOutfit);
}
