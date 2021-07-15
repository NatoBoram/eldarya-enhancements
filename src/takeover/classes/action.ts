import type { TakeoverAction } from "../../session_storage/takeover_action.enum"

export abstract class Action {
  /** Key by which the `SessionStorage` can reference this action. */
  abstract readonly key: TakeoverAction

  /** Determines if this action can be performed during a takeover. */
  abstract condition(): boolean

  /**
   * Performs the action and returns `true` the brain can continue with another
   * action or `false` if this action isn't finished executing.
   */
  abstract perform(): Promise<boolean>
}
