import type { Context } from "hogan.js";

export interface Settings extends Context {
  minigames: boolean;
  explorations: boolean;
  market: boolean;
}
