import type { Template } from "hogan.js"
import { Console } from "../console"
import { translate } from "../i18n/translate"
import { LocalStorage } from "../local_storage/local_storage"
import { listenTreasureHunt } from "./exploration-watcher"

export function loadExplorationHistory(): void {
  loadHistoryButton()
  listenTreasureHunt()
}

function loadHistoryButton(): void {
  const historyButton = document.createElement("a")
  historyButton.classList.add("nl-button", "nl-button-back")
  historyButton.style.marginRight = "0.6em"
  historyButton.textContent = translate.pet.history
  historyButton.addEventListener("click", onClickHistory)

  document
    .getElementById("buttons-container")
    ?.insertAdjacentElement("beforeend", historyButton)
}

function onClickHistory(): void {
  hidePet()
  hideExploration()
  makeHistory()
  showHistory()
}

export function onClickPet(): void {
  hideHistory()
  showPet()
}

function hidePet(): void {
  const nameContainer = document.getElementById("name-container")
  const infoContainer = document.getElementById("infos-container")
  const petImageContainer = document.getElementById("pet-image-container")

  if (!nameContainer || !infoContainer || !petImageContainer)
    return Console.error("The pet display was damaged.", {
      nameContainer,
      infoContainer,
      petImageContainer,
    })

  nameContainer.style.display = "none"
  infoContainer.style.display = "none"
  petImageContainer.style.display = "none"
}

function showPet(): void {
  const nameContainer = document.getElementById("name-container")
  const infoContainer = document.getElementById("infos-container")
  const petImageContainer = document.getElementById("pet-image-container")

  if (!nameContainer || !infoContainer || !petImageContainer)
    return Console.error("The pet display was damaged.", {
      nameContainer,
      infoContainer,
      petImageContainer,
    })

  nameContainer.style.display = ""
  infoContainer.style.display = ""
  petImageContainer.style.display = ""
}

function showHistory(): void {
  const history = document.getElementById("history-container")
  if (!history) return
  history.style.display = ""
}

function hideHistory(): void {
  const history = document.getElementById("history-container")
  if (!history) return
  history.style.display = "none"
}

function hideExploration(): void {
  document
    .getElementById("main-section")
    ?.classList.remove("treasure-hunt-interface-open")
}

function makeHistory(): void {
  document.getElementById("history-container")?.remove()
  const template: Template = require("../templates/html/exploration_history.html")

  document.getElementById("left-container")?.insertAdjacentHTML(
    "beforeend",
    template.render({
      translate,
      history: LocalStorage.explorationHistory.map(history => ({
        ...history,
        date: translate.pet.date_time_format.format(new Date(history.date)),
        web_hd: history.icon && toWebHd(history.icon),
      })),
    })
  )

  document.getElementById("delete-history")?.addEventListener("click", () => {
    LocalStorage.explorationHistory = []
    makeHistory()
  })
}

function toWebHd(icon: string): string {
  return icon.replace("icon", "web_hd")
}
