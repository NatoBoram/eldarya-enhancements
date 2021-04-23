import type { Context } from "hogan.js";

export interface MainMenu extends Context {
  class: string;
  href: string;
  text: string;
}
