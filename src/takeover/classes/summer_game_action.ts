import type { Template } from "hogan.js"
import type { Packet } from "../../api/packet"
import { Console } from "../../console"
import { translate } from "../../i18n/translate"
import { LocalStorage } from "../../local_storage/local_storage"
import { MathUtil } from "../../math_util"
import { SessionStorage } from "../../session_storage/session_storage"
import { TakeoverAction } from "../../session_storage/takeover_action.enum"
import { Action } from "./action"

class SummerGameAction extends Action {
  readonly key: TakeoverAction = TakeoverAction.summerGame

  condition(): boolean {
    return (
      LocalStorage.minigames &&
      !SessionStorage.summerGameDone &&
      !!document.querySelector('a[href="/event/summer"]')
    )
  }

  async perform(): Promise<boolean> {
    if (location.pathname !== "/event/summer/game") {
      pageLoad("/event/summer/game")
      return true
    }

    await new Promise(resolve => setTimeout(resolve, 3000))

    const play = document.querySelector<HTMLButtonElement>(
      'button.summer2021-button.event-coin-button.active[data-currency="token"]'
    )
    Console.log("Looking for play button:", play)
    if (!play) {
      SessionStorage.summerGameDone = true
      return false
    }

    const started = await summerGameStart()
    if (started.result !== "success") {
      SessionStorage.summerGameDone = true
      return false
    }

    const template: Template = require("../../templates/html/flavr_notif/icon_message.html")
    $.flavrNotif(
      template.render({
        icon: "/static/event/minigames/snake/img/head.png",
        message: translate.minigames.playing("Snake"),
      })
    )

    await new Promise<boolean>(resolve =>
      setTimeout(
        () => resolve(true),
        MathUtil.randomBetween(60_000 * 0.8, 60_000)
      )
    )

    const saved = await summerGameSave()
    if (saved.result !== "success") {
      SessionStorage.summerGameDone = true
      return false
    }

    $.flavrNotif(
      template.render({
        icon: "/static/event/minigames/snake/img/head.png",
        message: translate.minigames.played("Snake"),
      })
    )

    pageLoad("/event/summer/game")
    return true
  }
}

async function summerGameStart(): Promise<Packet<"">> {
  const currency = "token"

  return new Promise(resolve => {
    void $.post(
      "/event/summer/game/start",
      { currency: currency },
      function (json: Packet<"">) {
        if (json.result !== "success") $.flavrNotif(json.data)

        resolve(json)
      }
    )
  })
}

async function summerGameSave(): Promise<Packet<SummerGameSaveData>> {
  const win = true

  return new Promise(resolve => {
    void $.post(
      "/event/summer/game/save",
      { win: win },
      function (json: Packet<SummerGameSaveData>) {
        if (json.result !== "success") $.flavrNotif(json.data)

        resolve(json)
      }
    )
  })
}

export interface SummerGameSaveData {
  fragment: boolean | number
  lastFragment: boolean
  view: View
}

export interface View {
  activeGame: boolean
  endEvent: boolean
  fragmentsOwned: number
  fragmentsTotal: number
  petUnlocked: boolean
  remainingTime: number
  serverRewardCurrent: number
  serverRewardPercentage: number
  serverRewardTotal: number
  shouldChooseBankOutfit: boolean
  tokens: number
  trainingAvailable: boolean
}

export const summerGameAction = new SummerGameAction()
