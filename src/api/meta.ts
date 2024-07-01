export interface Meta {
	event: MetaEvent
	message: Message
	notifications: Notifications
	pet: Pet
	player: Player
	purroshop: Purroshop
}

type MetaEvent = "easter" | null

interface Message {
	unread: string
}

interface Pet {
	/** Exploration is finished */
	exploration: boolean
	portrait: string
}

interface Player {
	dailyMaana: boolean
	gold: Currency
	legacyCurrency: Currency
	maana: Currency
	purropass: Purropass
	unreadNews: null
	xp: XP
}

export interface Currency {
	change: Change
	text: string
	value: number
}

interface Change {
	text: string
	value: number
}

interface Purropass {
	change: Change
	text: string
	value: string
}

interface XP {
	goal: number
	level: number
	value: number
}

interface Purroshop {
	status: PurroshopStatus
}

interface Notifications {
	displayTime: number
	message: string
	type: string
}

export enum PurroshopStatus {
	disabled = "disabled",
	enabled = "enabled",
}
