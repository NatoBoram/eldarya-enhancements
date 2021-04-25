import type { ShareableOutfit } from "../local_storage/shareable_outfit";
import { Format } from "./enums/format.enum";
import type { ParsableItem } from "./interfaces/parsable_item";

export function exportOutfit(): void {
  const avatar = Sacha.Avatar.avatars["#appearance-preview"];
  if (!avatar) return;

  const wornItems = Object.values(avatar.children).map<ParsableItem>(
    (child) => {
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
    }
  );

  const outfit: ShareableOutfit = { wornItems, backgroundId };

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
      const outfit: ShareableOutfit = JSON.parse(value);
      console.log("outfit:", outfit);

      backgroundId = outfit.backgroundId;
      const wornItems = outfit.wornItems.map((value) => {
        return new Sacha.Avatar.Item(
          value.id,
          value.group,
          value.name,
          value.image,
          value.type,
          value.categoryId,
          value.hiddenCategories,
          value.animationData,
          value.locked
        );
      });

      console.log("wornItems:", wornItems);
      console.log("Sacha:", Sacha);

      Sacha.Avatar.generateOn(
        "appearance-preview",
        wornItems,
        Format.FORMAT_ZOOM,
        null
      );
      Sacha.Avatar.setAnimated(true);
    });
  });
}
