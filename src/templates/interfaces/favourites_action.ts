import type { Context } from "hogan.js"

export interface FavouritesAction extends Context {
  readonly id: string
  readonly text: string
}
