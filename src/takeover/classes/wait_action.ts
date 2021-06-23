import { TakeoverAction } from "../../session_storage/takeover_action.enum"
import { Action } from "./action"

class WaitAction extends Action {
  readonly key = TakeoverAction.wait

  condition(): boolean {
    return true
  }

  async perform(): Promise<boolean> {
    return new Promise(resolve => setTimeout(resolve, 3.6e6))
  }
}

export default new WaitAction()
