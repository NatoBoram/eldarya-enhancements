declare const Recaptcha:
	| {
			execute: (
				action:
					| string
					| "minigameSaveFlappy"
					| "minigameSaveHatchlings"
					| "minigameSavePeggle"
					| "minigameStartFlappy"
					| "minigameStartHatchlings"
					| "minigameStartPeggle",
				callback: (token: string) => void,
			) => void
	  }
	| undefined
