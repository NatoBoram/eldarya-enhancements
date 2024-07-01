/** Click on an element after waiting for its selector, hovering it and waiting
 * for its potential animations.
 */
export async function click<T extends HTMLElement>(
	selector: string,
): Promise<T> {
	return new Promise<T>(resolve => {
		const interval = setInterval(() => {
			const element = document.querySelector<T>(selector)
			if (!element) return
			clearInterval(interval)
			void clickElement(element).then(() => resolve(element))
		}, 800)
	})
}

/** Click on an element after hovering it and waiting for possible
 * animations.
 */
export async function clickElement(element: HTMLElement): Promise<void> {
	return new Promise<void>(resolve => {
		// Some elements don't have their click handlers ready until they're
		// hovered.
		const mouseEvent = document.createEvent("MouseEvent")
		mouseEvent.initEvent("mouseover")
		element.dispatchEvent(mouseEvent)

		setTimeout(() => {
			element.click()
			resolve()
		}, 800)
	})
}

export async function wait<T extends HTMLElement>(
	selector: string,
): Promise<T> {
	return new Promise<T>(resolve => {
		const interval = setInterval(() => {
			const element = document.querySelector<T>(selector)
			if (!element) return

			clearInterval(interval)
			resolve(element)
		}, 800)
	})
}

/**
 * Uses a `MutationObserver` to wait for an `HTMLElement` inside another
 * `HTMLElement`. Timeouts after 2s by default, at which point there's probably
 * a deeper problem going on.
 * @param container The container to observe and find the `HTMLElement` in
 * @param selector The argument for `container.querySelector<T>(selector)`
 * @returns The first element that is a descendant of `container` that matches
 * `selector` or `null` after the `timeout` delay.
 */
export async function waitObserve<T extends HTMLElement>(
	container: Element,
	selector: string,
	ms = 2000,
): Promise<T | null> {
	const promise = new Promise<T | null>(resolve => {
		const observer = new MutationObserver(
			(_mutations: MutationRecord[], observer: MutationObserver) =>
				setTimeout(() => {
					const element = container.querySelector<T>(selector)
					if (element) {
						observer.disconnect()
						resolve(element)
					}
				}, 1),
		)

		observer.observe(container, { childList: true })

		setTimeout(() => {
			observer.disconnect()
			resolve(container.querySelector<T>(selector))
		}, ms)
	})

	return promise
}
