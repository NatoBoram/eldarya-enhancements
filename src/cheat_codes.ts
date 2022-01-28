/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
import { LocalStorage } from "./local_storage/local_storage"

export function loadCheatCodes(): void {
  // const cheated = window as unknown as CheatedWindow
  ;(window as unknown as CheatedWindow).unlockEnhancements = unlockEnhancements
  ;(window as unknown as CheatedWindow).lockEnhancements = lockEnhancements
}

async function unlockEnhancements(): Promise<void> {
  LocalStorage.unlocked = true
  console.info("Unlocked enhancements.")
  await reload()
}

async function lockEnhancements(): Promise<void> {
  LocalStorage.unlocked = false
  console.info("Locked enhancements.")
  await reload()
}

async function reload(): Promise<void> {
  await new Promise(resolve => setTimeout(resolve, 1000))
  console.log("Reloading...")
  await new Promise(resolve => setTimeout(resolve, 1000))
  location.reload()
}

interface CheatedWindow extends Window {
  unlockEnhancements: () => Promise<void>
  lockEnhancements: () => Promise<void>
}
