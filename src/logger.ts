import { SessionStorage } from "./session_storage/session_storage"

class Logger {
  private readonly console = console
  private readonly debug = SessionStorage.debug

  log(message: string, ...optionalParams: unknown[]): void {
    if (!this.debug) return
    this.console.log(message, ...optionalParams)
  }

  info(message: string, ...optionalParams: unknown[]): void {
    if (!this.debug) return
    this.console.info(message, ...optionalParams)
  }

  warn(message: string, ...optionalParams: unknown[]): void {
    if (!this.debug) return
    this.console.warn(message, ...optionalParams)
  }

  error(message: string, ...optionalParams: unknown[]): void {
    if (!this.debug) return
    this.console.error(message, ...optionalParams)
  }
}

export default new Logger()
