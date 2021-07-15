import { Console } from "../console"
import { SessionStorage } from "../session_storage/session_storage"
import type { TakeoverAction } from "../session_storage/takeover_action.enum"
import type { Action } from "./classes/action"
import buyAction from "./classes/buy_action"
import dailyAction from "./classes/daily_action"
import explorationAction from "./classes/exploration_action"
import minigameAction from "./classes/minigame_action"
import waitAction from "./classes/wait_action"

/** Automated entry point of the takeover. */
export function loadTakeover(): void {
  if (SessionStorage.takeover) void takeover()
}

/** Manual entry point of the takeover. */
export function toggleTakeover(): void {
  resetTakeover()

  SessionStorage.takeover = !SessionStorage.takeover
  if (SessionStorage.takeover)
    $.flavrNotif("Takeover mode enabled. Please do not interact with this tab.")
  else $.flavrNotif("Takeover mode disabled.")

  void takeover()
}

export function resetTakeover(): void {
  SessionStorage.action = null
  SessionStorage.explorationsDone = false
  SessionStorage.minigamesDone = false
  SessionStorage.selectedLocation = null
  SessionStorage.wishlist = []
}

async function takeover(): Promise<void> {
  if (!SessionStorage.takeover) return
  if (dailyAction.condition()) await dailyAction.perform()

  const action = actions.find(action => action.key === SessionStorage.action)
  if (!action) {
    changeAction()
    void takeover()
    return
  }

  Console.info("Action:", action.key)

  if (action.condition() && (await action.perform())) return
  else {
    changeAction()
    void takeover()
    return
  }
}

const actions: Action[] = [
  minigameAction,
  explorationAction,
  buyAction,
  waitAction,
]

function changeAction(): TakeoverAction {
  const next =
    actions.findIndex(action => action.key === SessionStorage.action) + 1

  return (SessionStorage.action =
    actions[next >= actions.length ? 0 : next]!.key)
}
