import type { Clothing } from "../local_storage/clothing";
import { Sacha } from "./classes/sacha";

export function downloadOutfit(): void {
  const avatar = Sacha.Avatar.avatars["#appearance-preview"];
  if (!avatar) return;
  const items = avatar.getItemsToSave();
  const itemsWithBackground: Clothing[] = [{ id: backgroundId, wearIndex: 0 }];

  for (let i = 0; i < items.length; i++) {
    const item = items[i];
    if (!item) continue;
    item.wearIndex = item.wearIndex + 1;
    itemsWithBackground.push(item);
  }

  console.log({ items });
}
