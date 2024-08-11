import type { TakeoverAction } from "../../session_storage/takeover_action.enum"

export interface Action {
	/** Key by which the `SessionStorage` can reference this action. */
	readonly key: TakeoverAction

	/** Determines if this action can be performed during a takeover. */
	readonly condition: () => boolean

	/**
	 * Performs the action and returns `true` if it has something else to do or
	 * `false` if this action is finished executing.
	 */
	readonly perform: () => Promise<boolean>
}
