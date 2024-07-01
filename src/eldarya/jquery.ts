// eslint-disable-next-line @typescript-eslint/no-unused-vars
interface JQueryStatic {
	flavr: (data: flavrParams) => void
	flavrNotif: (
		content: string | unknown,
		options?: Record<string, unknown>,
		id?: number,
		force?: boolean,
	) => void
}

interface flavrParams {
	/** Animate.css */
	animateClosing?: "fadeOut" | "fadeOutUp"
	/** Animate.css */
	animateEntrance?: "fadeIn" | "fadeInDown"
	/** Buttons are key-value pairs where the key is the  */
	buttons?: Record<
		string,
		{
			style?: "close" | "default"
			text?: string
			addClass?: string
			/** @returns whether the popup should close */
			action?: ($container: JQuery) => boolean
		}
	>
	/** HTML content of the flavr */
	content?: string
	/** Type of dialog. */
	dialog?: "alert" | "confirm" | "form" | "prompt"
	onBuild?: ($container: JQuery) => void
	onCancel?: () => void
	onConfirm?: () => void
	onShow?: () => void
	prompt?: {
		/** Default value */
		value: string
	}

	title?: string
}
