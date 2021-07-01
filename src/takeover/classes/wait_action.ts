import { Console } from "../../console"
import { TakeoverAction } from "../../session_storage/takeover_action.enum"
import { Action } from "./action"

class WaitAction extends Action {
  readonly key = TakeoverAction.wait

  condition(): boolean {
    return true
  }

  async perform(): Promise<boolean> {
    Console.log(`Waiting for ${Math.ceil(3.6e6 / 1000)} seconds...`)
    return new Promise(resolve => setTimeout(resolve, 3.6e6))
  }
}

export default new WaitAction()
