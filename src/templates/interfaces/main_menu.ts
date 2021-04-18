import { Context } from "hogan.js";

export interface MainMenu extends Context {
  class: String;
  href: String;
  text: String;
}
