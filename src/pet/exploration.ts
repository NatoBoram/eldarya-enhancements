import type { Template } from "hogan.js"
import { changeRegion } from "../ajax/change_region"
import { Result } from "../api/result.enum"
import { Console } from "../console"
import type { MapRegion } from "../eldarya/current_region"
import { translate } from "../i18n/translate"
import type { AutoExploreLocation } from "../local_storage/auto_explore_location"
import { LocalStorage } from "../local_storage/local_storage"
import type { AutoExploreButton } from "../templates/interfaces/auto_explore_button"

export function loadMarkers(): void {
	const autoExploreLocations = LocalStorage.autoExploreLocations

	for (const div of document.querySelectorAll<HTMLDivElement>(
		".map-location[data-id]",
	)) {
		const locationId = Number(div.getAttribute("data-id"))
		if (!locationId) continue

		loadPictoMap(autoExploreLocations, div)

		div.addEventListener("click", () =>
			new MutationObserver(
				(_: MutationRecord[], observer: MutationObserver): void => {
					addAutoExploreButton(locationId, observer)
				},
			).observe(document.getElementById("map-location-preview") as Node, {
				attributes: true,
			}),
		)
	}
}

export function reloadMarkers(): void {
	const autoExploreLocations = LocalStorage.autoExploreLocations

	for (const div of document.querySelectorAll<HTMLDivElement>(
		".map-location[data-id]",
	)) {
		const locationId = Number(div.getAttribute("data-id"))
		if (!locationId) continue

		loadPictoMap(autoExploreLocations, div)
	}
}

function addAutoExploreButton(
	locationId: number,
	observer?: MutationObserver,
): void {
	const buttonsContainer =
		document.querySelector<HTMLDivElement>("#buttons-container")
	if (!buttonsContainer) return
	observer?.disconnect()

	// Parameters to be injected into the template
	const context: AutoExploreButton = {
		locationId,
		active: LocalStorage.autoExploreLocations.some(
			saved => saved.location.id === locationId,
		),
		regionId: Number(
			document
				.querySelector(".minimap.current[data-mapid]")
				?.getAttribute("data-mapid"),
		),
	}

	// Add the auto explore button
	buttonsContainer.querySelector("#auto-explore-button")?.remove()
	const autoExploreTemplate: Template = require("../templates/html/auto_explore_button.html")
	buttonsContainer.insertAdjacentHTML(
		"beforeend",
		autoExploreTemplate.render({ ...context, translate }),
	)

	// Bind `autoExplore` and `loadPictoMaps`
	buttonsContainer
		.querySelector<HTMLButtonElement>("#auto-explore-button")
		?.addEventListener("click", () => {
			Console.debug("Clicked on #auto-explore-button.", context)
			void markLocation(context).then(loadPictoMaps)
		})

	void disableExplore(context)
}

async function disableExplore(context: AutoExploreButton): Promise<void> {
	const entry = await getAutoExploreEntry(context.regionId, context.locationId)
	if (!entry) return

	if (petEnergy < Number(entry.location.energyRequired))
		document.getElementById("explore-button")?.classList.add("disabled")
}

async function markLocation(context: AutoExploreButton): Promise<void> {
	if (context.active) {
		const filteredLocations = LocalStorage.autoExploreLocations.filter(
			saved => saved.location.id !== context.locationId,
		)
		LocalStorage.autoExploreLocations = filteredLocations
		addAutoExploreButton(context.locationId)
		return
	}

	const newAutoExplore = await getAutoExploreEntry(
		context.regionId,
		context.locationId,
	)
	if (!newAutoExplore) {
		Console.error(
			`Could not generate an auto explore entry for location #${context.locationId}.`,
			context,
		)
		return
	}

	const newLocations = LocalStorage.autoExploreLocations
	newLocations.push(newAutoExplore)
	LocalStorage.autoExploreLocations = newLocations
	addAutoExploreButton(context.locationId)
}

async function getAutoExploreEntry(
	regionId: number,
	locationId: number,
): Promise<AutoExploreLocation | null> {
	const region = await getRegion(regionId)
	if (!region) {
		Console.error(`Could not get region #${regionId}.`)
		return null
	}

	const location = region.locations.find(location => location.id === locationId)
	if (!location) {
		Console.error(
			`Could not get location #${locationId} in ${region.name}.`,
			region,
		)
		return null
	}

	return {
		location,
		region,
	}
}

export async function getRegion(id: number): Promise<MapRegion | null> {
	if (id.toString() === currentRegion.id) return currentRegion

	const json = await changeRegion(id)
	if (json.result === Result.success) return json.data.currentRegion

	return null
}

function loadPictoMaps(): void {
	const autoExploreLocations = LocalStorage.autoExploreLocations
	for (const div of document.querySelectorAll<HTMLDivElement>(
		".map-location[data-id]",
	)) {
		loadPictoMap(autoExploreLocations, div)
	}
}

function loadPictoMap(
	autoExploreLocations: AutoExploreLocation[],
	div: HTMLDivElement,
): void {
	const mapLocation = div.getAttribute("data-id")
	if (!mapLocation) return

	div.style.backgroundImage = autoExploreLocations.some(
		saved => saved.location.id === Number(mapLocation),
	)
		? "url(/static/img/new-layout/pet/icons/picto_map_explo.png)"
		: "url(/static/img/new-layout/pet/icons/picto_map.png)"
}
