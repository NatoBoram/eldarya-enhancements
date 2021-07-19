import { LocalStorage } from "./local_storage/local_storage"

export function migrate(): void {
  if (LocalStorage.version && LocalStorage.version !== GM.info.script.version) {
    if (GM.info.script.version === "1.2.0") {
      LocalStorage.sales = []
      $.flavrNotif("Migrated to v1.2.0. Your sales history was erased.")
    }
  }

  LocalStorage.version = GM.info.script.version
}
