import type { Translation } from "./translation"

export const fr: Translation = {
  home: {
    forum: "Forum",
  },
  carousel: {
    beemoov_annoyances: {
      title: "Beemoov Annoyances",
      subtitle: "Bloque certains irritants d'Eldarya.",
    },
    download_face: {
      title: "Télécharge le visage de ta gardienne!",
      subtitle: "Clique ici pour télécharger le visage de ta gardienne.",
    },
    download_guardian: {
      title: "Télécharge ta gardienne!",
      subtitle: "Clique ici pour télécharger ta gardienne.",
    },
    eldarya_enhancements: {
      title: `${GM.info.script.name} v${GM.info.script.version}`,
      subtitle: "Améliore l'expérience utilisateur d'Eldarya.",
    },
    takeover: {
      disable_takeover: "Désactive le takeover",
      enable_takeover: "Active le takeover",
      subtitle: "Laisse cet onglet performer des actions automatiques.",
      title: "Takeover",
    },
  },
  minigames: {
    playing: (name: string) => `Joue à <strong>${name}</strong>...`,
    played_for: (name: string, maanas: number) =>
      `A joué à <strong>${name}</strong> pour <strong class="price-item">${maanas}</strong> <span class="maana-icon" alt="maanas"></span> gagnés.`,
  },
  appearance: {
    buttons: {
      backward: "Vers l'arrière",
      forward: "Vers l'avant",
    },
    favorites: {
      click_outfit: {
        delete: "Supprimer",
        goto_account: `Pour transférer tes favoris d'<strong>${GM.info.script.name}</strong> vers un autre navigateur, exporte-les à partir de la page <a href="/user/account" style="text-decoration: underline;">mon compte</a>.`,
        saved_locally: `Prends note que cette tenue a été sauvegardée localement dans les paramètres d'<strong>${GM.info.script.name}</strong> et n'a pas été envoyée aux serveurs d'Eldarya.`,
        wear: "Porter",
      },
      save_outfit: {
        goto_account: `Pour transférer tes favoris d'<strong>${GM.info.script.name}</strong> vers un autre navigateur, exporte-les à partir de la page <a href="/user/account" style="text-decoration: underline;">mon compte</a>.`,
        placeholder: "Nom...",
        save: "Sauvegarder",
        saved_locally: `Prends note que cette tenue sera sauvegardée localement dans les paramètres d'<strong>${GM.info.script.name}</strong> et ne sera pas envoyée aux serveurs d'Eldarya.`,
        title: "Sauvegarder cette tenue",
      },
    },
  },
  market: {
    add_to_wishlist: {
      title: "Ajouter à la liste de souhait",
      text: "Combien de maanas souhaites-tu offrir pour acquérir cet item?",
      save: "Sauvegarder",
    },
    auctions: {
      buy_now_price: "Achat immédiat :",
      current_price: "Mise actuelle :",
      delete: "Supprimer",
      purchase_history: "Historique d'achat",
      sales_history: "Historique de vente",
    },
    change_price: {
      save: "Sauvegarder",
      text: "Combien de maanas souhaites-tu offrir pour acquérir cet item?",
      title: "Changer le prix",
    },
    wishlist: {
      actions: "Actions",
      delete_tooltip: "Retirer de la liste de souhaits",
      delete: "Supprimer",
      icon: "Icône",
      name: "Nom",
      price: "Prix",
      reset_tooltip: "Réinitialiser l'état d'erreur",
      reset: "Réinitialiser",
      status: "Statut",
      title: "Liste de souhaits",
    },
  },
  account: {
    debug: "Débogage",
    debug_tooltip: "Active ou désactive la journalisation.",
    enhancements: "Améliorations",
    explorations: "Explorations",
    export: "Exporter les paramètres",
    import: "Importer les paramètres",
    market: "Marché",
    minigames: "Mini-jeux",
  },
  pet: {
    auto_explore: "Marquer",
  },
}

Object.freeze(fr)
