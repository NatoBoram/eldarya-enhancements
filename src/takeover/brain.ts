import logger from "../logger"
import { SessionStorage } from "../session_storage/session_storage"
import { TakeoverAction } from "../session_storage/takeover_action.enum"
import type { Action } from "./classes/action"
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

  const key = SessionStorage.action
  const action = actions.find(action => action.key === key)
  if (!action) {
    logger.warn("No actions were found.", { key, action })

    await new Promise(resolve => setTimeout(resolve, 3.6e6))
    resetTakeover()
    location.reload()
    return
  }

  logger.info("Action:", action)

  if (action.condition() && (await action.perform())) return
  else {
    changeAction()
    void takeover()
    return
  }
}

const actions: Action[] = [
  dailyAction,
  minigameAction,
  explorationAction,
  waitAction,
]

function changeAction(): TakeoverAction {
  const index = actions.findIndex(
    action => action.key === SessionStorage.action
  )
  if (index === -1) return (SessionStorage.action = TakeoverAction.daily)

  const next = actions[index + 1 >= actions.length ? 0 : index + 1]
  if (!next) return (SessionStorage.action = TakeoverAction.daily)

  return (SessionStorage.action = next.key)
}
