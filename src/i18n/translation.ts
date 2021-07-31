export interface Translation {
  readonly carousel: {
    readonly beemoov_annoyances: I18nCarousel
    readonly download_face: I18nCarousel
    readonly download_guardian: I18nCarousel
    readonly eldarya_enhancements: I18nCarousel
    readonly takeover: I18nCarousel
  }
  readonly appearance: {
    readonly buttons: {
      readonly backward: string
      readonly forward: string
    }
    readonly favorites: {
      readonly save_outfit: {
        readonly goto_account: string
        readonly placeholder: string
        readonly save: string
        readonly saved_locally: string
        readonly title: string
      }
      readonly click_outfit: {
        readonly delete: string
        /** Contains a link to `/user/account`. */
        readonly goto_account: string
        readonly saved_locally: string
        readonly wear: string
      }
    }
  }
  readonly minigames: {
    readonly played_for: (name: string, maanas: number) => string
    readonly playing: (name: string) => string
  }
  readonly market: {
    readonly add_to_wishlist: {
      readonly save: string
      readonly text: string
      readonly title: string
    }
    readonly change_price: {
      readonly save: string
      readonly text: string
      readonly title: string
    }
    readonly auctions: {
      readonly buy_now_price: string
      readonly current_price: string
      readonly delete: string
      readonly purchase_history: string
      readonly sales_history: string
    }
    readonly wishlist: {
      readonly actions: string
      readonly delete_tooltip: string
      readonly delete: string
      readonly icon: string
      readonly name: string
      readonly price: string
      readonly reset_tooltip: string
      readonly reset: string
      readonly status: string
      readonly title: string
    }
  }
  readonly pet: {
    readonly auto_explore: string
  }
  readonly account: {
    readonly debug: string
    readonly enhancements: string
    readonly explorations: string
    readonly export: string
    readonly import: string
    readonly market: string
    readonly minigames: string
  }
}

interface I18nCarousel {
  readonly title: string
  readonly subtitle: string
}
