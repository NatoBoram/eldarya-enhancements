import { LocalStorage } from "./local_storage/local_storage"

export class Console {
	private static readonly console = console

	private constructor() {}

	private static get debugging(): boolean {
		return LocalStorage.debug
	}

	private static get time(): string {
		return new Date().toLocaleTimeString()
	}

	static assert(
		value: unknown,
		message: string,
		...optionalParams: unknown[]
	): void {
		if (!this.debugging) return
		this.console.assert(value, ...this.format(message), ...optionalParams)
	}

	static debug(message: string, ...optionalParams: unknown[]): void {
		if (!this.debugging) return
		this.console.debug(...this.format(message), ...optionalParams)
	}

	static error(message: string, ...optionalParams: unknown[]): void {
		this.console.error(...this.format(message), ...optionalParams)
	}

	static info(message: string, ...optionalParams: unknown[]): void {
		if (!this.debugging) return
		this.console.info(...this.format(message), ...optionalParams)
	}

	static log(message: string, ...optionalParams: unknown[]): void {
		if (!this.debugging) return
		this.console.log(...this.format(message), ...optionalParams)
	}

	static warn(message: string, ...optionalParams: unknown[]): void {
		this.console.warn(...this.format(message), ...optionalParams)
	}

	private static format(message: string): string[] {
		return [
			`%c[%c${this.time}%c]`,
			"color:#9742c2",
			"color:none",
			"color:#9742c2",
			message,
		]
	}
}
