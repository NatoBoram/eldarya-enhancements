import { captureEnd } from "../../ajax/capture_end"
import { changeRegion } from "../../ajax/change_region"
import { explorationResults } from "../../ajax/exploration_results"
import { Result } from "../../api/result.enum"
import { Console } from "../../console"
import type { Season } from "../../eldarya/current_region"
import type { AutoExploreLocation } from "../../local_storage/auto_explore_location"
import { LocalStorage } from "../../local_storage/local_storage"
import { SessionStorage } from "../../session_storage/session_storage"
import { TakeoverAction } from "../../session_storage/takeover_action.enum"
import { click } from "../click"
import { ExplorationStatus } from "../exploration_status.enum"
import type { StartExploration } from "../start_exploration"
import { Action } from "./action"

class ExplorationAction extends Action {
  readonly key = TakeoverAction.explorations

  condition(): boolean {
    return (
      LocalStorage.explorations &&
      !SessionStorage.explorationsDone &&
      !!LocalStorage.autoExploreLocations.length
    )
  }

  async perform(): Promise<boolean> {
    if (location.pathname !== "/pet") {
      await click<HTMLAnchorElement>(".main-menu-pet a")
      return true
    }

    switch (this.getExplorationStatus()) {
      case ExplorationStatus.idle: {
        const start = await this.startExploration()
        if (start.exploring) {
          return (await this.waitExploration(start.selected)) || this.perform()
        } else if (!start.selected) {
          SessionStorage.explorationsDone = true
        }

        return start.exploring
      }

      case ExplorationStatus.pending:
        return (await this.waitExploration()) || this.perform()

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

  private async clickExplore(): Promise<HTMLButtonElement> {
    return click("#explore-button")
  }

  private async clickLocation(
    selected: AutoExploreLocation
  ): Promise<HTMLDivElement> {
    return click<HTMLDivElement>(
      `.map-location[data-id="${selected.location.id}"]`
    )
  }

  private clickRegion(selected: AutoExploreLocation): HTMLDivElement | null {
    const div = document.querySelector<HTMLDivElement>(
      `.minimap[data-mapid="${selected.region.id}"]`
    )

    if (!div) {
      // Clearing invalid regions is useful to remove finished events.
      LocalStorage.autoExploreLocations =
        LocalStorage.autoExploreLocations.filter(
          saved => saved.region.id !== selected.region.toString()
        )

      SessionStorage.selectedLocation = null
      location.reload()
      return null
    }

    div.click()
    return div
  }

  private async clickSeason(): Promise<HTMLImageElement> {
    return click<HTMLImageElement>("#crystal-images-container")
  }

  private async endCapture(): Promise<void> {
    try {
      void new Audio(
        "/static/event/2021/music/sounds/mission-complete.mp3"
      ).play()
    } catch (e: unknown) {
      // eslint-disable-next-line no-empty
    }

    document
      .querySelector<HTMLButtonElement>("#open-capture-interface")
      ?.click()
    await click<HTMLButtonElement>("#close-result")
  }

  private async endExploration(): Promise<HTMLDivElement> {
    return click("#close-result")
  }

  private getCurrentSeason(): Season {
    return <Season>(Array.from(document.querySelector("body")?.classList ?? [])
      .find(c => c.startsWith("season-"))
      ?.replace("season-", "") ?? null)
  }

  private getExplorationStatus(): ExplorationStatus {
    if (
      document.querySelector("#open-capture-interface") ||
      document.querySelector("#capture-interface-outer.active")
    ) {
      return ExplorationStatus.capture
    } else if (
      document.querySelector("#pending-map-location-data-outer.active")
    ) {
      return ExplorationStatus.pending
    } else if (document.querySelector("#treasure-hunt-result-overlay.active"))
      return ExplorationStatus.result
    return ExplorationStatus.idle
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
      saved => Number(saved.location.energyRequired) <= petEnergy
    )

    const sameEnergy = affordable.filter(
      place => place.location.energyRequired === petEnergy.toString()
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
    this.clickRegion(selected)

    // Go to location
    await this.clickLocation(selected)
    await this.clickExplore()

    SessionStorage.selectedLocation = null
    return { exploring: true, selected }
  }

  private async waitExploration(
    selected?: AutoExploreLocation
  ): Promise<boolean> {
    document
      .querySelector<HTMLDivElement>(
        `.minimap[data-mapid="${selected?.region.id ?? currentRegion.id}"]`
      )
      ?.click()

    let ms = 800
    if (selected) ms += selected.location.timeToExplore * 60 * 1000
    else if (timeLeftExploration && timeLeftExploration > 0)
      ms += timeLeftExploration * 1000
    else if (!pendingTreasureHuntLocation) {
      const json = await explorationResults()

      // Exploration is in another region
      if (json.result === Result.success) {
        const capture = json.data.results.find(
          result => result.type === "capture"
        )

        // Capture is in another region
        if (capture?.timeRestCapture) {
          ms += capture.timeRestCapture * 1000
          Console.log(`Waiting for ${Math.ceil(ms / 1000)} seconds...`)
          await new Promise<void>(resolve => setTimeout(resolve, ms))
          await captureEnd()
        }
      }

      // Reloading is the only possible action if the exploration finished
      // in a different region.
      Console.info("Reloading because the exploration is in capture mode.", {
        timeLeftExploration,
        pendingTreasureHuntLocation,
        currentRegion,
      })
      location.reload()
      return true
    }

    Console.log(`Waiting for ${Math.ceil(ms / 1000)} seconds...`)
    await new Promise<void>(resolve => setTimeout(resolve, ms))
    await changeRegion(Number(selected?.region.id ?? currentRegion.id))

    if (
      this.getExplorationStatus() === ExplorationStatus.pending &&
      timeLeftExploration &&
      timeLeftExploration < 0
    ) {
      Console.info("Reloading because the timer is desynchronised.", {
        currentRegion,
        pendingTreasureHuntLocation,
        timeLeftExploration,
      })
      location.reload()
      return true
    }

    return false
  }
}

export default new ExplorationAction()
