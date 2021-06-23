import type { Context } from "hogan.js"

export interface FavoritesAction extends Context {
  id: string
  text: string
}
