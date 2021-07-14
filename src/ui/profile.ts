import type { Template } from "hogan.js"
import { exportOutfit } from "../outfit"
import type { ProfileContactAction } from "../templates/interfaces/profile_contact_action"

export function loadProfile(): void {
  const profileContactActions = document.getElementById(
    "profile-contact-actions"
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
    actionDescription: "Export outfit",
  }

  // Add entries
  profileContactActions.insertAdjacentHTML(
    "beforeend",
    template.render(profileActionExport)
  )

  // Add click events
  document
    .getElementById(profileActionExport.id)
    ?.addEventListener("click", exportProfile)
}

function exportProfile(): void {
  const title = document.querySelector<HTMLHeadingElement>(
    "#main-section .section-title"
  )

  const keys = Object.keys(Sacha.Avatar.avatars).filter(key =>
    key.startsWith("#playerProfileAvatar")
  )

  for (const key of keys) {
    exportOutfit(key, title?.textContent?.trim())
  }
}
