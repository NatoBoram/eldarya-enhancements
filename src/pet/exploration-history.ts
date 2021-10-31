import { Console } from "../console"

export function loadExplorationHistory(): void {
  Console.log("Loading exploration history...")

  const closeExplorationButton = document.querySelector<HTMLAnchorElement>(
    "#close-treasure-hunt-interface"
  )
  if (!closeExplorationButton)
    return void Console.error("Couldn't find #close-treasure-hunt-interface.")

  closeExplorationButton.style.position = "relative"
  closeExplorationButton.style.top = "0"
  closeExplorationButton.style.right = "0"
  closeExplorationButton.style.display = "inline-block"
  closeExplorationButton.addEventListener("click", onClickPet)

  const historyButton = document.createElement("a")
  historyButton.classList.add("nl-button", "nl-button-back")
  historyButton.textContent = "History"
  historyButton.addEventListener("click", onClickHistory)

  const row = document.createElement("div")
  row.insertAdjacentElement("beforeend", historyButton)
  row.insertAdjacentElement("beforeend", closeExplorationButton)

  Console.debug("#close-treasure-hunt-interface:", closeExplorationButton)
  Console.debug("row", row)

  document
    .querySelector<HTMLDivElement>("#right-container-inner")
    ?.insertAdjacentElement("afterbegin", row)
}

function onClickHistory(): void {
  hidePet()
  hideExploration()
  makeHistory()
  showHistory()
}

function onClickPet(): void {
  hideHistory()
  showPet()
}

function hidePet(): void {
  const nameContainer = document.getElementById("name-container")
  const infoContainer = document.getElementById("infos-container")
  const petImageContainer = document.getElementById("pet-image-container")

  if (!nameContainer || !infoContainer || !petImageContainer)
    return void Console.error("The pet display was damaged.", {
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
    return void Console.error("The pet display was damaged.", {
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

function makeHistory(): HTMLDivElement | undefined {
  if (document.getElementById("history-container")) return

  const history = document.createElement("div")
  history.id = "history-container"
  history.textContent = "Hello world!"
  document
    .getElementById("left-container")
    ?.insertAdjacentElement("beforeend", history)

  return history
}
