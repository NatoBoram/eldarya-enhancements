import type { Translation } from "./translation"

export const en: Translation = {
  carousel: {
    beemoov_annoyances: {
      title: "Beemoov Annoyances",
      subtitle: "Block some of Eldarya's annoyances.",
    },
    download_face: {
      title: "Download your guardian's face!",
      subtitle: "Click here to download your guardian's face.",
    },
    download_guardian: {
      title: "Download your guardian!",
      subtitle: "Click here to download your guardian.",
    },
    eldarya_enhancements: {
      title: `${GM.info.script.name} v${GM.info.script.version}`,
      subtitle: GM.info.script.description,
    },
    takeover: {
      disable_takeover: "Disable Takeover",
      enable_takeover: "Enable Takeover",
      subtitle: "Give up this tab to perform automated actions.",
      title: "Takeover",
    },
  },
  minigames: {
    playing: (name: string) => `Playing <strong>${name}</strong>...`,
    played_for: (name: string, maanas: number) =>
      `Played <strong>${name}</strong> for <strong class="price-item">${maanas}</strong> <span class="maana-icon" alt="maanas"></span> earned.`,
  },
  appearance: {
    buttons: {
      backward: "Move back",
      forward: "Bring forward",
    },
    favorites: {
      click_outfit: {
        delete: "Delete",
        goto_account: `To transfer your ${GM.info.script.name} favourites to another browser, export them in the <a href="/user/account">my account</a> page.`,
        saved_locally: `Take note that this outfit was saved in ${GM.info.script.name}' settings and was not sent to Eldarya's servers.`,
        wear: "Wear",
      },
      save_outfit: {
        goto_account: `To transfer your ${GM.info.script.name} favourites to another browser, export them in the <a href="/user/account">my account</a> page.`,
        placeholder: "Name...",
        save: "Save",
        saved_locally: `Take note that this outfit will only be saved within ${GM.info.script.name}' settings and will not be sent to Eldarya's servers.`,
        title: "Save outfit",
      },
    },
  },
  market: {
    add_to_wishlist: {
      title: "Add to wishlist",
      text: "How many maanas do you wish to offer to acquire this item?",
      save: "Save",
    },
    auctions: {
      buy_now_price: "Buy now price :",
      current_price: "Current price :",
      delete: "Delete",
      purchase_history: "Purchase history",
      sales_history: "Sales history",
    },
    change_price: {
      save: "Save",
      text: "How many maanas do you wish to offer to acquire this item?",
      title: "Change price",
    },
    wishlist: {
      actions: "Actions",
      delete_tooltip: "Remove from wishlist",
      delete: "Delete",
      icon: "Icon",
      name: "Name",
      price: "Price",
      reset_tooltip: "Reset the error status",
      reset: "Reset",
      status: "Status",
      title: "Wishlist",
    },
  },
  account: {
    debug: "Debug",
    debug_tooltip: "Enables or disables logging.",
    enhancements: "Enhancements",
    explorations: "Explorations",
    export: "Export settings",
    import: "Import settings",
    market: "Market",
    minigames: "Minigames",
  },
  pet: {
    auto_explore: "Highlight",
  },
}

Object.freeze(en)
