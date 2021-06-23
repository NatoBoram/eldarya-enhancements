import { SessionStorage } from "./session_storage/session_storage"

class Logger {
  private readonly console = console

  private get debugging(): boolean {
    return SessionStorage.debug
  }

  debug(message: string, ...optionalParams: unknown[]): void {
    if (!this.debugging) return
    this.console.debug(message, ...optionalParams)
  }

  log(message: string, ...optionalParams: unknown[]): void {
    if (!this.debugging) return
    this.console.log(message, ...optionalParams)
  }

  info(message: string, ...optionalParams: unknown[]): void {
    if (!this.debugging) return
    this.console.info(message, ...optionalParams)
  }

  warn(message: string, ...optionalParams: unknown[]): void {
    if (!this.debugging) return
    this.console.warn(message, ...optionalParams)
  }

  error(message: string, ...optionalParams: unknown[]): void {
    if (!this.debugging) return
    this.console.error(message, ...optionalParams)
  }
}

export default new Logger()
