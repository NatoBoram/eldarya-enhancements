import { SessionStorage } from "../session_storage/session_storage"
import { TakeoverAction } from "../session_storage/takeover_action.enum"
import type { Action } from "./classes/action"
import dailyAction from "./classes/daily_action"
import explorationAction from "./classes/exploration_action"
import minigameAction from "./classes/minigame_action"

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

  const key = SessionStorage.action ?? TakeoverAction.daily
  const action = actions.find(action => action.key === key)
  if (!action) {
    await new Promise(resolve => setTimeout(resolve, 3.6e6))
    resetTakeover()
    location.reload()
    return
  }

  if (action.condition() && (await action.perform())) return
  else {
    changeAction()
    void takeover()
    return
  }
}

const actions: Action[] = [dailyAction, minigameAction, explorationAction]

function changeAction(): TakeoverAction {
  switch (SessionStorage.action) {
    case TakeoverAction.daily:
      return (SessionStorage.action = TakeoverAction.minigames)

    case TakeoverAction.minigames:
      return (SessionStorage.action = TakeoverAction.explorations)

    case TakeoverAction.explorations:
      return (SessionStorage.action = TakeoverAction.auctions)

    case TakeoverAction.auctions:
      return (SessionStorage.action = TakeoverAction.marketplace)

    case TakeoverAction.marketplace:
      return (SessionStorage.action = TakeoverAction.wait)

    case TakeoverAction.wait:
      return (SessionStorage.action = TakeoverAction.daily)

    default:
      return (SessionStorage.action = TakeoverAction.daily)
  }
}
