import { LocalStorage } from "./local_storage/local_storage"

export class Console {
  private static readonly console = console

  private constructor() {}

  private static get debugging(): boolean {
    return LocalStorage.debug
  }

  static debug(message: string, ...optionalParams: unknown[]): void {
    if (!this.debugging) return
    this.console.debug(message, ...optionalParams)
  }

  static error(message: string, ...optionalParams: unknown[]): void {
    if (!this.debugging) return
    this.console.error(message, ...optionalParams)
  }

  static info(message: string, ...optionalParams: unknown[]): void {
    if (!this.debugging) return
    this.console.info(message, ...optionalParams)
  }

  static log(message: string, ...optionalParams: unknown[]): void {
    if (!this.debugging) return
    this.console.log(message, ...optionalParams)
  }

  static warn(message: string, ...optionalParams: unknown[]): void {
    if (!this.debugging) return
    this.console.warn(message, ...optionalParams)
  }
}
