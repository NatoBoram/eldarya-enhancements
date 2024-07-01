import { Console } from "./console"
import { translate } from "./i18n/translate"

function downloadCanvas(canvas: HTMLCanvasElement, name: string): void {
	canvas.toBlob(
		blob => {
			if (!blob) {
				Console.error("Canvas is empty")
				$.flavrNotif(translate.error.downloadCanvas)
				return
			}

			const url = URL.createObjectURL(blob)

			const a = document.createElement("a")
			a.setAttribute("href", url)
			a.setAttribute("download", `${name}.png`)
			a.style.display = "none"

			document.body.appendChild(a)
			a.click()
			document.body.removeChild(a)

			URL.revokeObjectURL(url)
		},
		"image/png",
		1,
	)
}

export function downloadFace(): void {
	const canvas = document.querySelector<HTMLCanvasElement>(
		"#avatar-menu-container canvas",
	)
	if (!canvas) {
		Console.warn("Couldn't find the guardian's face.")
		return
	}

	const name = getName() ?? "guardian"
	downloadCanvas(canvas, `${name}-face`)
}

export function downloadGuardian(): void {
	const canvas = document.querySelector<HTMLCanvasElement>(
		"#home-avatar-player canvas",
	)
	if (!canvas) {
		Console.warn("Couldn't find the guardian.")
		return
	}

	downloadCanvas(canvas, getName() ?? "guardian")
}

export function downloadAppearance(): void {
	const canvas = document.querySelector<HTMLCanvasElement>(
		"#appearance-preview canvas",
	)
	if (!canvas) {
		Console.warn("Couldn't find the guardian.")
		return
	}

	downloadCanvas(canvas, "outfit")
}

export function downloadProfile(): void {
	const canvas = document.querySelector<HTMLCanvasElement>(
		".playerProfileAvatar canvas",
	)
	const title = document.querySelector<HTMLHeadingElement>(
		"#main-section .section-title",
	)
	if (!canvas || !title) return

	downloadCanvas(canvas, title.textContent?.trim() ?? "guardian")
}

export function getName(): string | null {
	return (
		document.querySelector("#avatar-menu-container-outer>p")?.textContent ??
		null
	)
}
