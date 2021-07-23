import type { Minigame } from "./minigame"

export const hatchlings: Minigame = {
  name: "Hatchlings",
  scoreMin: 18,
  scoreMax: 20,
  delayMin: 30_000,
  delayMax: 30_000,
  buttonSelector: '.minigame-start [href="/minigames/cocooninpick"] .nl-button',
  icon: "/static/img/new-layout/minigames/icon_coconinpick.png",
}
