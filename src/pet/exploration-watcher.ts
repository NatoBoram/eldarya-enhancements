import { Console } from "../console"
import type { ExplorationResult } from "../local_storage/exploration_result"
import { LocalStorage } from "../local_storage/local_storage"

export function listenTreasureHunt(): void {
  const resultOverlay = document.querySelector("#treasure-hunt-result-overlay")
  if (!resultOverlay)
    return void Console.error("There is no result overlay.", resultOverlay)

  new MutationObserver(() => {
    Console.log("Mutation in", resultOverlay)
    if (!resultOverlay.classList.contains("active")) return

    const results = getResults()
    if (results.length === 0) return
    Console.log("Results:", results)

    LocalStorage.explorationHistory = [
      ...results,
      ...LocalStorage.explorationHistory,
    ]
  }).observe(resultOverlay, {
    attributeFilter: ["class"],
  })
}

function getResults(): ExplorationResult[] {
  const locationName = document
    .querySelector("#th-again strong")
    ?.textContent?.trim()
  const now = new Date()

  return Array.from(document.querySelectorAll(".th-result")).map(result => ({
    count: result.querySelector(".resource-count")?.textContent?.trim(),
    date: now,
    icon: result.querySelector<HTMLImageElement>("img.th-result-img")?.src,
    locationName,
    name: result.querySelector(".tooltip-content h3")?.textContent?.trim(),
    tradable: Boolean(result.querySelector(".tradable")),
  }))
}
