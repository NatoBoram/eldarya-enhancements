import type { Minigame } from "./minigame"

export const flappy: Minigame = {
  name: "Flappy",
  scoreMin: 180,
  scoreMax: 200,
  delayMin: 60_000,
  delayMax: 70_000,
  buttonSelector: '.minigame-start [href="/minigames/bubbltemple"] .nl-button',
}
