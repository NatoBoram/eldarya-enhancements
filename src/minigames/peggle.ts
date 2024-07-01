import type { Minigame } from "./minigame"

export const peggle: Minigame = {
	name: "Peggle",
	scoreMin: 9,
	scoreMax: 10,
	delayMin: 10_000,
	delayMax: 20_000,
	buttonSelector: '.minigame-start [href="/minigames/gembomb"] .nl-button',
	icon: "/static/img/new-layout/minigames/icon_gembomb.png",
}
