import type { Avatar } from "../eldarya/avatar";
import type { Item } from "../eldarya/item";
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
    void file.text().then(async (value) => {
      if (!value) return;

      const outfit: ParsableItem[] = JSON.parse(value);
      const avatar = Sacha.Avatar.avatars["#appearance-preview"];
      if (!avatar) return;

      $.flavrNotif("Importing. Please wait...");

      // Get all categories and groups
      const groups = new Set<number>();
      for (const clothing of outfit) {
        groups.add(clothing.group);
      }

      // Open them all so they appear in `availableItems`
      const promises: Promise<void>[] = [];
      groups.forEach((group) => {
        promises.push(openGroup(group));
      });
      await Promise.all(promises);

      // Get the items from `availableItems`
      const wornItems: Item[] = [];
      outfit.forEach((clothing) => {
        const item = availableItems[clothing.id];
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

async function openGroup(group: number) {
  return new Promise<void>((resolve) => {
    const categoryContainer = $("#appearance-items-group-" + group.toString());

    if (categoryContainer.hasClass("active")) {
      resolve();
      return;
    }

    if (categoryContainer.length <= 0) {
      void $.get("/player/openGroup/" + group.toString(), function (view) {
        $(".appearance-items-category.active").fadeOut("fast", function () {
          $(view).hide().appendTo("#appearance-items");
          $("#appearance-items-group-" + group.toString());
        });
      }).always(() => {
        resolve();
      });
    } else {
      resolve();
    }
  });
}
