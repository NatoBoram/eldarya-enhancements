import type { Template } from "hogan.js"
import { downloadProfile } from "../download-canvas"
import { translate } from "../i18n/translate"
import { exportOutfit } from "../outfit"
import type { ProfileContactAction } from "../templates/interfaces/profile_contact_action"

export function loadProfile(): void {
	const profileContactActions = document.getElementById(
		"profile-contact-actions",
	)
	if (
		!profileContactActions ||
		document.querySelector(".profile-contact-action-ee")
	) {
		return
	}

	const template: Template = require("../templates/html/profile_contact_action.html")

	const profileActionExport: ProfileContactAction = {
		id: "profile-contact-action-export",
		actionDescription: translate.profile.export_outfit,
	}
	const profileActionDownload: ProfileContactAction = {
		id: "profile-contact-action-download",
		actionDescription: translate.profile.download_outfit,
	}

	// Add entries
	profileContactActions.insertAdjacentHTML(
		"beforeend",
		template.render(profileActionExport),
	)
	profileContactActions.insertAdjacentHTML(
		"beforeend",
		template.render(profileActionDownload),
	)

	// Add click events
	document
		.getElementById(profileActionExport.id)
		?.addEventListener("click", exportProfile)
	document
		.getElementById(profileActionDownload.id)
		?.addEventListener("click", downloadProfile)
}

function exportProfile(): void {
	const title = document.querySelector<HTMLHeadingElement>(
		"#main-section .section-title",
	)

	const keys = Object.keys(Sacha.Avatar.avatars).filter(key =>
		key.startsWith("#playerProfileAvatar"),
	)

	for (const key of keys) {
		exportOutfit(key, title?.textContent?.trim())
	}
}
