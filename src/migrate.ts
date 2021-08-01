import { LocalStorage } from "./local_storage/local_storage"

export function migrate(): void {
  if (LocalStorage.version === GM.info.script.version) return

  if (GM.info.script.version === "1.2.0") {
    LocalStorage.sales = []
    $.flavrNotif("Migrated to v1.2.0. Your sales history was erased.")
  } else {
    installed()
  }

  LocalStorage.version = GM.info.script.version
}

function installed(): void {
  $.flavrNotif(
    `<strong>${GM.info.script.name}</strong> v<strong>${GM.info.script.version}</strong> installed!`
  )
}
