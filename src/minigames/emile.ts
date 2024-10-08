import type { Template } from "hogan.js"
import type { GetPrizesData } from "../api/get_prizes_data"
import type { Packet } from "../api/packet"
import { Result } from "../api/result.enum"
import type { StartGameData } from "../api/start_game_data"
import "../eldarya/jquery"
import { translate } from "../i18n/translate"
import { flappy } from "./flappy"
import { hatchlings } from "./hatchlings"
import type { Minigame } from "./minigame"
import { peggle } from "./peggle"

export async function playPeggle(): Promise<void> {
	return play(peggle)
}

export async function playFlappy(): Promise<void> {
	return play(flappy)
}

export async function playHatchlings(): Promise<void> {
	return play(hatchlings)
}

async function play(minigame: Minigame): Promise<void> {
	// Disable buttons
	await new Promise<boolean>(resolve => {
		const interval = setInterval(() => {
			const buttons = document.querySelectorAll<HTMLButtonElement>(
				".minigames-rules .flavr-button",
			)

			if (buttons.length) {
				clearInterval(interval)

				for (const button of buttons) {
					button.classList.add("disabled")
				}

				resolve(true)
			}
		}, 250)
	})

	const json = await execute(minigame)

	const template: Template = require("../templates/html/flavr_notif/icon_message.html")
	$.flavrNotif(
		template.render({
			...minigame,
			message: translate.minigames.playing(minigame.name),
		}),
	)

	const gameToken = json.data
	const score = randomInt(minigame.scoreMin, minigame.scoreMax)
	const enc_token = xorEncode(gameToken, score.toString())
	await new Promise(resolve =>
		setTimeout(resolve, randomInt(minigame.delayMin, minigame.delayMax)),
	)

	await getPrizes(minigame, gameToken, score)
	await new Promise(resolve => setTimeout(resolve, randomInt(1000, 3000)))

	await send(enc_token, score, minigame.name.toLowerCase())
	await new Promise(resolve => setTimeout(resolve, randomInt(1000, 3000)))
}

function randomInt(min: number, max: number): number {
	return Math.floor(Math.random() * (max - min + 1) + min)
}

async function execute(minigame: Minigame): Promise<Packet<StartGameData>> {
	return new Promise<Packet<StartGameData>>((resolve, reject) => {
		if (typeof Recaptcha !== "undefined") {
			Recaptcha.execute(
				`minigameStart${minigame.name}`,
				(token): void =>
					// eslint-disable-next-line @typescript-eslint/use-unknown-in-catch-callback-variable
					void startGame(minigame, token).then(resolve).catch(reject),
			)
		} else {
			// eslint-disable-next-line @typescript-eslint/use-unknown-in-catch-callback-variable
			void startGame(minigame).then(resolve).catch(reject)
		}
	})
}

async function startGame(
	minigame: Minigame,
	recaptchaToken?: string,
): Promise<Packet<StartGameData>> {
	return new Promise<Packet<StartGameData>>(
		(resolve, reject) =>
			void $.ajax({
				url: "/minigames/ajax_startGame",
				type: "post",
				dataType: "json",
				data: recaptchaToken
					? {
							game: minigame.name.toLowerCase(),
							recaptchaToken: recaptchaToken,
						}
					: {
							game: minigame.name.toLowerCase(),
						},
				success: (json: Packet<StartGameData>): void => {
					resolve(json)
				},
				error: (): void => {
					reject(new Error("Failed to start the game."))
				},
			}),
	)
}

async function getPrizes(
	minigame: Minigame,
	gameToken: string,
	score: number,
): Promise<Packet<GetPrizesData>> {
	return new Promise<Packet<GetPrizesData>>(
		(resolve): void =>
			void $.post(
				"/minigames/ajax_getPrizes",
				{ game: minigame.name.toLowerCase(), score: score },
				(json: Packet<GetPrizesData>): void => {
					resolve(json)

					if (json.result === Result.success) {
						const template: Template = require("../templates/html/flavr_notif/icon_message.html")

						$.flavrNotif(
							template.render({
								...minigame,
								message: translate.minigames.played_for(
									minigame.name,
									json.data.maana,
								),
							}),
						)
					} else $.flavrNotif(json.data)
				},
				"json",
			).fail(() =>
				setTimeout(
					(): void => {
						resolve(getPrizes(minigame, gameToken, score))
					},
					randomInt(1000, 3000),
				),
			),
	)
}

/**
 * Sécurisation de l'envoi du score
 * Basé sur l'encodage XOR : http://en.wikipedia.org/wiki/XOR_cipher
 * Effectue un XOR bit à bit entre une chaine et une clé
 */
function xorEncode(str: string, key: string): string {
	// Assure que les deux paramètres soient des chaines de caractère
	str = str.toString()
	key = key.toString()

	/** Encodage XOR */
	let xor = ""

	// eslint-disable-next-line @typescript-eslint/prefer-for-of
	for (let i = 0; i < str.length; ++i) {
		let tmp = str[i]
		for (let j = 0; j < key.length; ++j) {
			tmp = String.fromCharCode(tmp!.charCodeAt(0) ^ key.charCodeAt(j))
		}
		xor += tmp ?? ""
	}

	// Renvoie le résultat en encodant les caractères spéciaux pouvant poser problème (\n par exemple)
	return encodeURIComponent(xor)
}

async function send(
	enc_token: string,
	score: number,
	game: string,
): Promise<void> {
	return new Promise(resolve => {
		if (typeof Recaptcha !== "undefined") {
			Recaptcha.execute(
				"minigameSave" + game,
				(recaptchaToken): void =>
					void saveScore(enc_token, score, game, recaptchaToken).then(resolve),
			)
		} else {
			void saveScore(enc_token, score, game).then(resolve)
		}
	})
}

async function saveScore(
	enc_token: string,
	score: number,
	game: string,
	recaptchaToken?: string,
): Promise<void> {
	return new Promise(resolve => {
		const token = decodeURIComponent(enc_token)

		void $.ajax({
			type: "post",
			url: "/minigames/ajax_saveScore",
			data: recaptchaToken
				? {
						token: token,
						score: score,
						game: game,
						recaptchaToken: recaptchaToken,
					}
				: {
						token: token,
						score: score,
						game: game,
					},
			success: (): void => {
				resolve()
			},
			error: () =>
				setTimeout(
					(): void => {
						resolve(saveScore(enc_token, score, game))
					},
					randomInt(1000, 3000),
				),
		})
	})
}
