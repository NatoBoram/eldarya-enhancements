import type { Template } from "hogan.js"
import type { AppearanceCategory } from "../templates/interfaces/appearance_category"
import type { AppearanceGroup } from "../templates/interfaces/appearance_group"
import wardrobe from "./wardrobe"

export function unloadHiddenCategories(): void {
	const hidden = document.querySelectorAll<HTMLDivElement>(
		"#appearance-items .appearance-items-category:not(.active):not([data-categoryname]), #appearance-items script, body>script",
	)
	for (const div of hidden) {
		div.remove()
	}
}

/**
 * Place the saved groups on the DOM as if it was Eldarya doing it.
 * @returns the associated `AppearanceCategory` if it's found in the wardrobe.
 */
export function loadHiddenCategory(code: string): AppearanceCategory | null {
	// eslint-disable-next-line @typescript-eslint/no-unsafe-enum-comparison
	const category = wardrobe.getCategories().find(c => c.category === code)
	if (!category) return null

	const groups = wardrobe.getCategoryGroups(category.categoryid)
	const itemTemplate: Template = require("../templates/html/appearance_item.html")
	const groupTemplate: Template = require("../templates/html/appearance_items_group.html")
	document
		.querySelector<HTMLDivElement>("#appearance-items")
		?.insertAdjacentHTML(
			"beforeend",
			groups
				.map(group =>
					groupTemplate.render({
						...group,
						items: wardrobe
							.getItems(group.group)
							.map(item => itemTemplate.render(item))
							.join("\n"),
					}),
				)
				.join("\n"),
		)
	return category
}

/**
 * Load the saved group on the DOM as if it was Eldarya doing it.
 * @returns the associated `AppearanceGroup` if it's found in the wardrobe.
 */
export function loadHiddenGroup(id: number): AppearanceGroup | null {
	const group = wardrobe.getGroup(id)
	if (!group) return null

	const itemTemplate: Template = require("../templates/html/appearance_item.html")
	const groupTemplate: Template = require("../templates/html/appearance_items_group.html")
	document
		.querySelector<HTMLDivElement>("#appearance-items")
		?.insertAdjacentHTML(
			"beforeend",
			groupTemplate.render({
				...group,
				items: wardrobe
					.getItems(group.group)
					.map(item => itemTemplate.render(item))
					.join("\n"),
			}),
		)
	return group
}
