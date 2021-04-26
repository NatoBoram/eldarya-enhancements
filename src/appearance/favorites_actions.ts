import type { Avatar } from "../eldarya/avatar";
import type { ParsableItem } from "./interfaces/parsable_item";

export function exportOutfit(): void {
  const avatar = Sacha.Avatar.avatars["#appearance-preview"];
  if (!avatar) return;

  const outfit = getItemsToSave(avatar);

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

      const outfit: ParsableItem[] = JSON.parse(value);
      const avatar = Sacha.Avatar.avatars["#appearance-preview"];
      if (!avatar) return;

      const wornItems = outfit.map(
        (item) =>
          new Sacha.Avatar.Item(
            item.id,
            item.group,
            item.name,
            item.image,
            item.type,
            item.categoryId,
            item.hiddenCategories,
            item.animationData,
            item.locked
          )
      );

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

function getItemsToSave(avatar: Avatar): ParsableItem[] {
  return avatar.children.map((child) => {
    const item = child.getItem();
    return {
      id: item._id,
      group: item._group,
      name: item._name,
      image: item._image,
      type: item._type,
      categoryId: item._categoryId,
      hiddenCategories: Object.values(item._hiddenCategories),
      animationData: item._animationData,
      locked: item._locked,
    };
  });
}
