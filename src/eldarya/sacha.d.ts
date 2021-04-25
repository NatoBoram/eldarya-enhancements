import type { Avatar } from "./avatar";

declare interface SachaExtension {
  Avatar: typeof Avatar;
}

declare global {
  const Sacha: SachaExtension & typeof createjs;
}
