import type { Avatar } from "./avatar";

declare interface SachaExtension {
  Avatar: typeof Avatar;
}

declare const Sacha: SachaExtension & typeof createjs;
