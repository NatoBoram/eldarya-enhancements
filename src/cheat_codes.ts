/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
import { Console } from "./console"
import { LocalStorage } from "./local_storage/local_storage"

export function loadCheatCodes(): void {
	// const cheated = window as unknown as CheatedWindow
	;(window as unknown as CheatedWindow).unlockEnhancements = unlockEnhancements
	;(window as unknown as CheatedWindow).lockEnhancements = lockEnhancements
}

async function unlockEnhancements(): Promise<void> {
	LocalStorage.unlocked = true
	Console.info("Unlocked enhancements.")
	await reload()
}

async function lockEnhancements(): Promise<void> {
	LocalStorage.unlocked = false
	Console.info("Locked enhancements.")
	await reload()
}

async function reload(): Promise<void> {
	await new Promise(resolve => setTimeout(resolve, 1000))
	Console.log("Reloading...")
	await new Promise(resolve => setTimeout(resolve, 1000))
	location.reload()
}

interface CheatedWindow extends Window {
	unlockEnhancements: () => Promise<void>
	lockEnhancements: () => Promise<void>
}
