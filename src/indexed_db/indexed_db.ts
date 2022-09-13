import type {
  FavouriteOutfit,
  NewFavouriteOutfit,
} from "../appearance/interfaces/favourite_outfit"
import { Console } from "../console"
import { Databases } from "./databases.enum"
import { FavouriteOutfitFields } from "./fields.enum"
import type { ItemPalette } from "./item_palette"
import { ItemPalettesFields } from "./item_palette"
import { Tables } from "./tables.enum"

class IndexedDB {
  private db?: IDBDatabase
  private readonly version = 1

  constructor() {
    const request = indexedDB.open(Databases.eldarya_enhancements, this.version)
    request.onsuccess = (): IDBDatabase => (this.db = request.result)
    request.onupgradeneeded = function (this: IDBOpenDBRequest): void {
      const db: IDBDatabase = this.result

      // Favourite outfits

      const favouriteStore = db.createObjectStore(Tables.favourite_outfits, {
        keyPath: "id",
        autoIncrement: true,
      })

      favouriteStore.createIndex(FavouriteOutfitFields.blob, "blob", {
        unique: false,
      })
      favouriteStore.createIndex(FavouriteOutfitFields.items, "items", {
        unique: false,
      })
      favouriteStore.createIndex(FavouriteOutfitFields.name, "name", {
        unique: false,
      })

      // Item palettes

      const colorStore = db.createObjectStore(Tables.item_palettes, {
        keyPath: "url",
        autoIncrement: false,
      })

      colorStore.createIndex(ItemPalettesFields.palette, "palette", {
        unique: false,
      })
    }
    request.onerror = (): void =>
      Console.error("Error when opening the indexedDB", request.error)
    request.onblocked = (): void =>
      Console.error("Blocked from opening the indexedDB", request.error)
  }

  /** @returns a new `FavouriteOutfit` with the `key` property set. */
  async addFavouriteOutfit(
    favourite: NewFavouriteOutfit
  ): Promise<FavouriteOutfit> {
    return new Promise((resolve, reject): void => {
      if (!this.db) return reject()

      const request = this.db
        .transaction([Tables.favourite_outfits], "readwrite")
        .objectStore(Tables.favourite_outfits)
        .add(favourite)

      request.onsuccess = (): void => {
        resolve({
          ...favourite,
          url: URL.createObjectURL(favourite.blob),
          id: Number(request.result),
        })
      }
    })
  }

  async updateFavouriteOutfit(
    favourite: FavouriteOutfit
  ): Promise<FavouriteOutfit> {
    return new Promise((resolve, reject): void => {
      if (!this.db) return reject()

      const request = this.db
        .transaction([Tables.favourite_outfits], "readwrite")
        .objectStore(Tables.favourite_outfits)
        .put(favourite)

      request.onsuccess = (): void => {
        resolve({
          ...favourite,
          id: Number(request.result),
        })
      }
    })
  }

  async clearFavouriteOutfits(): Promise<void> {
    return new Promise((resolve, reject): void => {
      if (!this.db) return reject()

      const request = this.db
        .transaction([Tables.favourite_outfits], "readwrite")
        .objectStore(Tables.favourite_outfits)
        .clear()

      request.onsuccess = (): void => resolve()
    })
  }

  async deleteFavouriteOutfit(favourite: FavouriteOutfit): Promise<void> {
    return new Promise((resolve, reject): void => {
      if (!this.db) return reject()

      const request = this.db
        .transaction([Tables.favourite_outfits], "readwrite")
        .objectStore(Tables.favourite_outfits)
        .delete(favourite.id)

      request.onsuccess = (): void => {
        resolve()
        if (favourite.url) URL.revokeObjectURL(favourite.url)
      }
    })
  }

  async getFavouriteOutfit(id: number): Promise<FavouriteOutfit> {
    return new Promise((resolve, reject): void => {
      if (!this.db) return reject()

      const request = this.db
        .transaction([Tables.favourite_outfits], "readonly")
        .objectStore(Tables.favourite_outfits)
        .get(id)

      const favourite: FavouriteOutfit = request.result

      request.onsuccess = (): void =>
        resolve({ ...favourite, url: URL.createObjectURL(favourite.blob) })
    })
  }

  async getFavouriteOutfits(): Promise<FavouriteOutfit[]> {
    return new Promise((resolve, reject): void => {
      if (!this.db) return reject("No database")

      const request = this.db
        .transaction([Tables.favourite_outfits], "readonly")
        .objectStore(Tables.favourite_outfits)
        .getAll()

      request.onsuccess = (): void =>
        resolve(
          request.result.map<FavouriteOutfit>((favourite: FavouriteOutfit) => ({
            ...favourite,
            url: URL.createObjectURL(favourite.blob),
          }))
        )
    })
  }

  async addItemPalette(itemPalette: ItemPalette): Promise<ItemPalette> {
    return new Promise((resolve, reject): void => {
      if (!this.db) return reject()

      const request = this.db
        .transaction([Tables.item_palettes], "readwrite")
        .objectStore(Tables.item_palettes)
        .add(itemPalette)

      request.onsuccess = (): void => resolve(itemPalette)
    })
  }
}

export default new IndexedDB()
