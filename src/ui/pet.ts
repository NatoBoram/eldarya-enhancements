import { Console } from "../console"
import { loadMarkers } from "../pet/exploration"
import { loadExplorationHistory, onClickPet } from "../pet/exploration-history"
import { loadMassMark } from "../pet/mass_mark"

let petObserver: MutationObserver | null

function loadExplorations(): void {
	petObserver?.disconnect()
	petObserver = null

	/** `.page-main-container` changes background depending on the currently selected region. */
	const mainContainer = document.querySelector<HTMLDivElement>(
		".page-main-container",
	)
	if (!mainContainer) return

	petObserver = new MutationObserver(loadExplorations)
	petObserver.observe(mainContainer, {
		attributes: true,
	})

	loadMarkers()
}

export function loadPet(): void {
	if (location.pathname !== "/pet") return
	extendRightContainer()
	createButtonRow()

	loadExplorations()
	loadExplorationHistory()
	loadMassMark()
}

function createButtonRow(): void {
	const closeExplorationButton = document.querySelector<HTMLAnchorElement>(
		"#close-treasure-hunt-interface",
	)
	if (!closeExplorationButton) {
		Console.error("Couldn't find #close-treasure-hunt-interface.")
		return
	}

	closeExplorationButton.style.display = "inline-block"
	closeExplorationButton.style.marginRight = "0.6em"
	closeExplorationButton.style.position = "relative"
	closeExplorationButton.style.right = "0"
	closeExplorationButton.style.top = "0"
	closeExplorationButton.addEventListener("click", onClickPet)

	const row = document.createElement("div")
	row.id = "ee-buttons-row"
	row.insertAdjacentElement("beforeend", closeExplorationButton)

	document
		.querySelector<HTMLDivElement>("#right-container-inner")
		?.insertAdjacentElement("afterbegin", row)
}

function extendRightContainer(): void {
	const rightContainer = document.getElementById("right-container")
	if (!rightContainer) {
		Console.warn("Couldn't find #right-container", rightContainer)
		return
	}

	rightContainer.style.height = "40em"
}
