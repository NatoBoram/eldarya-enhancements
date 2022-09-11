export interface Translation {
  readonly home: {
    readonly forum: string
    readonly takeover: string
  }
  readonly takeover: {
    readonly bought: (name: string, price: number) => string
    readonly disabled: string
    readonly enabled: string
  }
  readonly carousel: {
    readonly beemoov_annoyances: I18nCarousel
    readonly download_face: I18nCarousel
    readonly download_guardian: I18nCarousel
    readonly eldarya_enhancements: I18nCarousel
    readonly takeover: {
      readonly disable_takeover: string
      readonly enable_takeover: string
      readonly subtitle: string
      readonly title: string
    }
  }
  readonly appearance: {
    readonly buttons: {
      readonly backward: string
      readonly forward: string
    }
    readonly favourites: {
      readonly importing: string
      readonly imported: string
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
      readonly rename_outfit: {
        readonly title: (name: string) => string
        readonly button: string
      }
      readonly buttons: {
        readonly download: string
        readonly export: string
        readonly import: string
      }
    }
    readonly loaded: string
    readonly loading: (categoryname: string) => string
  }
  readonly minigames: {
    readonly played_for: (name: string, maanas: number) => string
    readonly played: (name: string) => string
    readonly playing: (name: string) => string
  }
  readonly market: {
    readonly add_to_wishlist: {
      readonly added_to_wishlist: (name: string, price: number) => string
      readonly invalid_price: string
      readonly save: string
      readonly text: string
      readonly title: string
    }
    readonly change_price: {
      readonly changed_price: (name: string, price: number) => string
      readonly invalid_price: string
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
      readonly date_time_format: Intl.DateTimeFormat
    }
    readonly wishlist: {
      readonly actions: string
      readonly assistance: string
      readonly change_price: string
      readonly delete_tooltip: string
      readonly delete: string
      readonly icon: string
      readonly name: string
      readonly price: string
      readonly reset_all: string
      readonly reset_tooltip: string
      readonly reset: string
      readonly status: string
      readonly title: string
    }
  }
  readonly pet: {
    readonly auto_explore: string
    readonly date_time_format: Intl.DateTimeFormat
    readonly delete_history: string
    readonly deleting_markers: string
    readonly empty_history: string
    readonly goto_account: string
    readonly history: string
    readonly mark_all: string
    readonly saved_locally: string
    readonly unmark_all: string
  }
  readonly account: {
    readonly cancel: string
    readonly confirm_reset_content: string
    readonly confirm_reset_title: string
    readonly confirm: string
    readonly debug_tooltip: string
    readonly debug: string
    readonly delete_explorations: string
    readonly enhancements: string
    readonly explorations: string
    readonly export: string
    readonly import: string
    readonly imported: string
    readonly market: string
    readonly minigames: string
    readonly reset: string
    readonly explorations_deleted: string
  }
  readonly profile: {
    readonly export_outfit: string
    readonly download_outfit: string
  }
  readonly error: {
    readonly downloadCanvas: string
    readonly longLoading: string
  }
  readonly mall: {
    readonly add_to_wishlist: {
      readonly text: string
      readonly title: string
      readonly note: string
    }
  }
  readonly colour: {
    readonly black: string
    readonly blue: string
    readonly cyan: string
    readonly green: string
    readonly grey: string
    readonly magenta: string
    readonly orange: string
    readonly red: string
    readonly rose: string
    readonly violet: string
    readonly white: string
    readonly yellow: string
  }
}

interface I18nCarousel {
  readonly title: string
  readonly subtitle: string
}
