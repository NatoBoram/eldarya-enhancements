import type { Context } from "hogan.js"

export interface MainMenu extends Context {
  readonly class: string
  readonly href: string
  readonly text: string
}
