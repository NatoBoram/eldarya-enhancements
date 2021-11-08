import { LocalStorage } from "./local_storage/local_storage"

export function migrate(): void {
  switch (LocalStorage.version) {
    case GM.info.script.version:
      return

    case "":
      installed()
      break

    default:
      switch (GM.info.script.version) {
        case "1.2.0":
          v1_2_0()
          break

        case "1.2.9":
          v1_2_9()
          break

        default:
          installed()
          break
      }
  }

  LocalStorage.version = GM.info.script.version
}

function installed(): void {
  $.flavrNotif(`${name()} ${version()} installed!`)
}

function name(): string {
  return `<strong>${GM.info.script.name}</strong>`
}

function version(): string {
  return `v<strong>${GM.info.script.version}</strong>`
}

function v1_2_0(): void {
  LocalStorage.sales = []
  $.flavrNotif(`Updated to ${version()}. Your sales history was erased.`)
}

function v1_2_9(): void {
  $.flavrNotif(
    `Updated to ${version()}. The wishlist has been improved to sort by category/type/name, but your wished items do not have a type. You can add types by re-adding the items via the market.`
  )
}
