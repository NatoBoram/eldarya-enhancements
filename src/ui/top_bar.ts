import type { Template } from "hogan.js"
import { translate } from "../i18n/translate"
import { LocalStorage } from "../local_storage/local_storage"
import { SessionStorage } from "../session_storage/session_storage"
import { toggleTakeover } from "../takeover/brain"

export function loadTopBar(): void {
	const headerRight = document.getElementById("header-right")
	if (!headerRight) return

	const headerTakeover = headerRight.querySelector("#header-takeover")
	if (headerTakeover) headerTakeover.remove()
	else loadLinks()

	if (
		(LocalStorage.minigames ||
			LocalStorage.explorations ||
			LocalStorage.market) &&
		LocalStorage.unlocked
	) {
		const template: Template = require("../templates/html/header_takeover.html")
		headerRight.insertAdjacentHTML(
			"afterbegin",
			template.render({ takeover: SessionStorage.takeover, translate }),
		)

		headerRight
			.querySelector("#header-takeover")
			?.addEventListener("click", toggleTakeover)
	}
}

function loadLinks(): void {
	const headerProfile = document.getElementById("header-profile")?.firstChild
	if (headerProfile?.textContent) {
		const a = document.createElement("a")
		a.href = "/player/profile"
		a.style.color = "var(--text-color)"
		a.style.fontFamily = '"Alegreya Sans", sans-serif'
		a.style.fontWeight = "unset"
		a.textContent = headerProfile.textContent.trim()

		const p = document.createElement("p")
		p.insertAdjacentElement("beforeend", a)

		headerProfile.replaceWith(p)
	}

	const avatarTitle = document.querySelector("#avatar-menu-container-outer>p")
	if (avatarTitle?.textContent)
		avatarTitle.innerHTML = `<a href="/player/profile" style="color: #FFFFFF; font-size: 23px; font-weight: 900; text-transform: uppercase;">${avatarTitle.textContent.trim()}</a>`

	document
		.querySelector("#avatar-menu-container>canvas")
		?.addEventListener("click", () => {
			pageLoad("/player/appearance")
		})
}
