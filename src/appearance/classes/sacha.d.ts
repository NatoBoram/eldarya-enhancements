import { Avatar } from "./avatar";

declare interface SachaExtension {
  Avatar: typeof Avatar;
}

declare const Sacha: typeof createjs & SachaExtension;
