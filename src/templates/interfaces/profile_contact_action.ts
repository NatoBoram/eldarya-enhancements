import type { Context } from "hogan.js"

export interface ProfileContactAction extends Context {
  readonly id: string
  readonly actionDescription: string
}
