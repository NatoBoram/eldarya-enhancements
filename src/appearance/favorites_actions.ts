import type { Item } from "../eldarya/item";
import type { Clothing } from "../local_storage/clothing";

export function exportOutfit(): void {
  const avatar = Sacha.Avatar.avatars["#appearance-preview"];
  if (!avatar) return;

  const outfit = avatar.getItemsToSave();

  const href =
    "data:text/json;charset=utf-8," +
    encodeURIComponent(JSON.stringify(outfit));

  const a = document.createElement("a");
  a.setAttribute("href", href);
  a.setAttribute("download", "outfit.json");
  a.click();
}

export function importOutfit(): void {
  const input = document.createElement("input");
  input.setAttribute("type", "file");
  input.setAttribute("accept", "application/json");
  input.click();

  input.addEventListener("input", (event) => {
    if (!event.target) return;
    const files = (<HTMLInputElement>event.target).files;
    if (!files) return;
    const file = files[0];
    if (!file) return;
    void file.text().then((value) => {
      if (!value) return;

      const outfit: Clothing[] = JSON.parse(value);

      const avatar = Sacha.Avatar.avatars["#appearance-preview"];
      if (!avatar) return;

      const wornItems: Item[] = [];
      outfit.forEach((cloth) => {
        const item = availableItems[cloth.id];
        if (item) wornItems.push(item);
      });

      removeClothes();
      avatar.addItems(wornItems);
      initializeSelectedItems();
      initializeHiddenCategories();

      $.flavrNotif("Imported outfit!");
    });
  });
}

function removeClothes() {
  const avatar = Sacha.Avatar.avatars["#appearance-preview"];
  if (!avatar) return;

  for (let i = avatar.children.length - 1; i >= 0; i--) {
    const itemRender = avatar.children[i];
    if (!itemRender) continue;

    const item = itemRender.getItem();
    if (Sacha.Avatar.removeItemFromAllAvatars(item)) {
      $(`#appearance-item-${item._id}`).removeClass("selected");
    }
  }
}
