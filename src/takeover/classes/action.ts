import type { TakeoverAction } from "../../session_storage/takeover_action.enum";

export abstract class Action {
  /** Key by which the `SessionStorage` can reference this action. */
  abstract readonly key: TakeoverAction;

  /** Determines if this action can be performed during a takeover. */
  abstract condition(): boolean;
  /**
   * Performs an action and returns `true` if it did something or `false` if it
   * did not.
   */
  abstract perform(): Promise<boolean>;
}
