import type { Template } from "hogan.js"
import { captureEnd } from "../../ajax/capture_end"
import { changeRegion } from "../../ajax/change_region"
import { explorationResults } from "../../ajax/exploration_results"
import { Result } from "../../api/result.enum"
import { Console } from "../../console"
import { DurationUnit } from "../../duration"
import type { MapRegion, Season } from "../../eldarya/current_region"
import type { PendingTreasureHuntLocation } from "../../eldarya/treasure"
import { translate } from "../../i18n/translate"
import type { AutoExploreLocation } from "../../local_storage/auto_explore_location"
import { LocalStorage } from "../../local_storage/local_storage"
import { SessionStorage } from "../../session_storage/session_storage"
import { TakeoverAction } from "../../session_storage/takeover_action.enum"
import { click, clickElement, waitObserve } from "../click"
import { ExplorationStatus } from "../exploration_status.enum"
import type { StartExploration } from "../start_exploration"
import type { Action } from "./action"

class ExplorationAction implements Action {
	readonly key = TakeoverAction.explorations

	private get globals(): {
		currentRegion: MapRegion
		pendingTreasureHuntLocation: PendingTreasureHuntLocation | null
		timeLeftExploration: number | null
	} {
		return { currentRegion, pendingTreasureHuntLocation, timeLeftExploration }
	}

	condition(): boolean {
		return (
			LocalStorage.explorations &&
			!SessionStorage.explorationsDone &&
			!!LocalStorage.autoExploreLocations.length
		)
	}

	async perform(): Promise<boolean> {
		if (location.pathname !== "/pet") {
			pageLoad("/pet")
			return true
		}

		await this.openCurrentRegion()
		const status = this.getExplorationStatus()
		Console.log("Exploration status:", ExplorationStatus[status])
		switch (status) {
			case ExplorationStatus.idle:
				if (!(await this.startExploration()).selected)
					SessionStorage.explorationsDone = true
				return false

			case ExplorationStatus.pending:
				return (await this.waitExploration()) && this.perform()

			case ExplorationStatus.result:
				await this.endExploration()
				return this.perform()

			case ExplorationStatus.capture:
				await this.endCapture()
				return this.perform()

			default:
				return false
		}
	}

	private async openCurrentRegion(): Promise<HTMLDivElement | null> {
		if (!pendingTreasureHuntLocation) return null
		return click<HTMLDivElement>(
			`.minimap[data-mapid="${pendingTreasureHuntLocation.MapRegion_id}"]`,
		)
	}

	private async clickExplore(): Promise<HTMLButtonElement> {
		return click("#explore-button")
	}

	private async clickLocation(
		selected: AutoExploreLocation,
	): Promise<HTMLDivElement> {
		return click<HTMLDivElement>(
			`.map-location[data-id="${selected.location.id}"]`,
		)
	}

	private async clickRegion(
		selected: AutoExploreLocation,
	): Promise<HTMLDivElement | null> {
		const container = document.querySelector("#minimaps-container")
		if (!container) {
			Console.log("Couldn't find #minimaps-container:", container)
			return null
		}

		const div = await waitObserve<HTMLDivElement>(
			container,
			`.minimap[data-mapid="${selected.region.id}"]`,
		)
		if (!div) {
			// Clearing invalid regions is useful to remove finished events.
			const template: Template = require("../../templates/html/flavr_notif/icon_message.html")
			$.flavrNotif(
				template.render({
					icon: "/static/img/new-layout/pet/icons/picto_map.png",
					message: translate.pet.deleting_markers,
				}),
			)

			LocalStorage.autoExploreLocations =
				LocalStorage.autoExploreLocations.filter(
					saved => saved.region.id !== selected.region.id,
				)

			Console.warn("Could not find region", selected.region)
			pageLoad("/pet")
			return null
		}

		Console.debug("Clicking on region", div)
		await clickElement(div)
		return div
	}

	private async clickSeason(): Promise<HTMLImageElement> {
		return click<HTMLImageElement>("#crystal-images-container")
	}

	private async endCapture(): Promise<void> {
		try {
			void new Audio(
				"/static/event/2021/music/sounds/mission-complete.mp3",
			).play()
		} catch (e: unknown) {
			Console.log("Failed to play mission complete sound:", e)
		}

		await click<HTMLButtonElement>("#open-capture-interface")
		await click<HTMLButtonElement>("#capture-button")
		await click<HTMLButtonElement>("#close-result")
	}

	private async endExploration(): Promise<HTMLDivElement> {
		return click("#close-result")
	}

	private getCurrentSeason(): Season | null {
		const season = Array.from(document.querySelector("body")?.classList ?? [])
			.find(c => c.startsWith("season-"))
			?.replace("season-", "")

		if (this.isSeason(season)) return season
		else return null
	}

	private isSeason(season: unknown): season is Season {
		return ["s1", "s2"].some(s => s === season)
	}

	private getExplorationStatus(): ExplorationStatus {
		if (
			document.querySelector(
				"#treasure-hunt-result-overlay.active #open-capture-interface",
			) ||
			document.querySelector("#capture-interface-outer.active")
		) {
			return ExplorationStatus.capture
		} else if (
			document.querySelector("#pending-map-location-data-outer.active") ||
			document.querySelector("#map-container.pending")
		) {
			return ExplorationStatus.pending
		} else if (document.querySelector("#treasure-hunt-result-overlay.active"))
			return ExplorationStatus.result
		return ExplorationStatus.idle
	}

	private getLowestEnergyLocation(): AutoExploreLocation {
		return LocalStorage.autoExploreLocations.reduce((lowest, place) =>
			Number(place.location.energyRequired) <
			Number(lowest.location.energyRequired)
				? place
				: lowest,
		)
	}

	private getSelectedLocation(): AutoExploreLocation | null {
		let selected = SessionStorage.selectedLocation
		if (!selected) {
			selected = this.selectLocation()
			SessionStorage.selectedLocation = selected
		}

		return selected
	}

	private selectLocation(): AutoExploreLocation | null {
		const affordable = LocalStorage.autoExploreLocations.filter(
			saved => Number(saved.location.energyRequired) <= petEnergy,
		)

		const minimumEnergy = this.getLowestEnergyLocation()
		const notDeadEnd = affordable.filter(
			place =>
				petEnergy - Number(place.location.energyRequired) >=
				Number(minimumEnergy.location.energyRequired),
		)
		if (notDeadEnd.length)
			return notDeadEnd[Math.floor(Math.random() * notDeadEnd.length)] ?? null

		const sameEnergy = affordable.filter(
			place => Number(place.location.energyRequired) === petEnergy,
		)
		if (sameEnergy.length)
			return sameEnergy[Math.floor(Math.random() * sameEnergy.length)] ?? null

		return affordable[Math.floor(Math.random() * affordable.length)] ?? null
	}

	private async startExploration(): Promise<StartExploration> {
		const selected = this.getSelectedLocation()
		if (!selected) return { exploring: false, selected }
		Console.info("Exploring", selected)

		// Go to season
		if (
			selected.region.season &&
			this.getCurrentSeason() !== selected.region.season
		) {
			await this.clickSeason()
			return { exploring: false, selected }
		}

		// Go to region
		await this.clickRegion(selected)

		// Go to location
		await this.clickLocation(selected)
		await this.clickExplore()

		SessionStorage.selectedLocation = null
		return { exploring: true, selected }
	}

	/**
	 * Wait for up to 10 minutes.
	 * @returns whether the exploration is finished.
	 */
	private async waitExploration(
		selected?: AutoExploreLocation,
	): Promise<boolean> {
		document
			.querySelector<HTMLDivElement>(
				`.minimap[data-mapid="${selected?.region.id ?? currentRegion.id}"]`,
			)
			?.click()

		let ms = 3 * DurationUnit.second
		if (selected) ms += selected.location.timeToExplore * DurationUnit.minute
		else if (timeLeftExploration && timeLeftExploration > 0)
			ms += timeLeftExploration * DurationUnit.second
		else if (
			!pendingTreasureHuntLocation &&
			document.querySelector("#map-container.pending")
		) {
			const json = await explorationResults()
			if (json.result !== Result.success) return false

			const capture = json.data.results.find(
				result => result.type === "capture",
			)
			if (!capture) return false
			await captureEnd()

			// Reloading is the only possible action if the exploration finished in a
			// different region.
			Console.error(
				"Reloading because the exploration is in another region.",
				this.globals,
			)
			await new Promise(resolve => setTimeout(resolve, DurationUnit.minute))
			pageLoad("/pet")
			return true
		}

		if (ms > 10 * DurationUnit.minute) return false

		Console.log(
			`Waiting for the exploration to end in ${Math.ceil(
				ms / DurationUnit.second,
			)} seconds...`,
			this.globals,
		)
		await new Promise(resolve => setTimeout(resolve, ms))
		await changeRegion(Number(selected?.region.id ?? currentRegion.id))

		if (
			this.getExplorationStatus() === ExplorationStatus.pending &&
			timeLeftExploration &&
			timeLeftExploration < 0
		) {
			Console.info(
				"Reloading because the timer is desynchronised.",
				this.globals,
			)
			await new Promise(resolve => setTimeout(resolve, DurationUnit.second))
			pageLoad("/pet")
		}

		return true
	}
}

export default new ExplorationAction()
