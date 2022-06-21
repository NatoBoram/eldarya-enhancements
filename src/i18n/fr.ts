import type { Translation } from "./translation"

export const fr: Translation = {
  home: {
    forum: "Forum",
    takeover: "Takeover",
  },
  takeover: {
    bought: (name, price) =>
      `Acheté <strong>${name}</strong> pour <strong class="price-item">${price}</strong> <span class="maana-icon" alt="maanas"></span>.`,
    disabled: "Takeover désactivé.",
    enabled: "Takeover activé. Évite d'intéragir avec cet onglet.",
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
    played_for: (name: string, maanas: number) =>
      `A joué à <strong>${name}</strong> pour <strong class="price-item">${maanas}</strong> <span class="maana-icon" alt="maanas"></span> gagnés.`,
    played: (name: string) => `A joué à <strong>${name}</strong>.`,
    playing: (name: string) => `Joue à <strong>${name}</strong>...`,
  },
  appearance: {
    buttons: {
      backward: "Vers l'arrière",
      forward: "Vers l'avant",
    },
    favourites: {
      imported: "Importation réussie!",
      importing: "Importation en cours...",
      click_outfit: {
        delete: "Supprimer",
        goto_account: `Pour transférer tes tenues favorites d'<strong>${GM.info.script.name}</strong> vers un autre navigateur, exporte tes paramètres à partir de la page <a href="/user/account" style="text-decoration: underline;">mon&nbsp;compte</a>.`,
        saved_locally: `Prends note que cette tenue est sauvegardée localement dans les paramètres d'<strong>${GM.info.script.name}</strong> et n'a pas été envoyée aux serveurs d'Eldarya.`,
        wear: "Porter",
      },
      save_outfit: {
        goto_account: `Pour transférer tes tenues favorites d'<strong>${GM.info.script.name}</strong> vers un autre navigateur, exporte tes paramètres à partir de la page <a href="/user/account" style="text-decoration: underline;">mon&nbsp;compte</a>.`,
        placeholder: "Nom...",
        save: "Sauvegarder",
        saved_locally: `Prends note que cette tenue sera sauvegardée localement dans les paramètres d'<strong>${GM.info.script.name}</strong> et ne sera pas envoyée aux serveurs d'Eldarya.`,
        title: "Sauvegarder cette tenue",
      },
      buttons: {
        download: "Télécharger le PNG",
        export: "Exporter",
        import: "Importer",
      },
    },
    loaded: "Le chargement de la garde-robe est terminé.",
    loading: (categoryname: string) =>
      `Chargement de <strong>${categoryname}</strong>...`,
  },
  market: {
    add_to_wishlist: {
      added_to_wishlist: (name: string, price: number) =>
        `Ajouté <strong>${name}</strong> pour <strong class="price-item">${price}</strong> <span class="maana-icon" alt="maanas"></span> à la liste de souhaits.`,
      invalid_price: "Ce prix n'est pas valide.",
      save: "Sauvegarder",
      text: "Combien de maanas souhaites-tu offrir pour acquérir cet item?",
      title: "Ajouter à la liste de souhait",
    },
    auctions: {
      buy_now_price: "Achat immédiat :",
      current_price: "Mise actuelle :",
      delete: "Supprimer",
      purchase_history: "Historique d'achat",
      sales_history: "Historique de vente",
      date_time_format: new Intl.DateTimeFormat("fr-CA", {
        minute: "2-digit",
        hour: "2-digit",
        day: "numeric",
        month: "long",
        year: "numeric",
      }),
    },
    change_price: {
      changed_price: (name: string, price: number) =>
        `Changé le prix de <strong>${name}</strong> pour <strong class="price-item">${price}</strong> <span class="maana-icon" alt="maanas"></span>.`,
      invalid_price: "Ce prix n'est pas valide.",
      save: "Sauvegarder",
      text: "Combien de maanas souhaites-tu offrir pour acquérir cet item?",
      title: "Changer le prix",
    },
    wishlist: {
      actions: "Actions",
      assistance: `Sur cette page, tu peux organiser ta liste de souhaits et vérifier le statut de tes articles souhaités. Prends note que ta liste de souhaits est sauvegardée localement dans les paramètres d'<strong>${GM.info.script.name}</strong> et n'est pas envoyée aux serveurs d'Eldarya. Pour transférer ta liste de souhaits vers un autre navigateur, exporte-la à partir de la page <a href="/user/account" style="text-decoration: underline;">mon&nbsp;compte</a>.`,
      change_price: "Changer le prix",
      delete_tooltip: "Retirer de la liste de souhaits",
      delete: "Supprimer",
      icon: "Icône",
      name: "Nom",
      price: "Prix",
      reset_all: "Réinitialiser tout les statuts",
      reset_tooltip: "Réinitialiser l'état d'erreur",
      reset: "Réinitialiser",
      status: "Statut",
      title: "Liste de souhaits",
    },
  },
  account: {
    debug_tooltip: "Active ou désactive la journalisation.",
    debug: "Débogage",
    enhancements: "Améliorations",
    explorations: "Explorations",
    export: "Exporter les paramètres",
    import: "Importer les paramètres",
    imported: "Paramètres importés",
    market: "Marché",
    minigames: "Mini-jeux",
  },
  pet: {
    auto_explore: "Marquer",
    date_time_format: new Intl.DateTimeFormat("fr-CA", {
      minute: "2-digit",
      hour: "2-digit",
      day: "numeric",
      month: "long",
      year: "numeric",
    }),
    delete_history: "Nettoyer l'historique",
    empty_history:
      "Ton historique d'exploration est vide. Il se remplira automatiquement à mesure que ton familier trouvera des items en exploration.",
    goto_account:
      "Pour transférer ton historique d'explorations vers un autre navigateur, exporte tes paramètres à partir de la page <em>mon compte</em>.",
    history: "Historique",
    mark_all: "Marquer tout",
    saved_locally: `Prends note que ton historique d'explorations est sauvegardé localement dans les paramètres d'<strong>${GM.info.script.name}</strong> et n'a pas été envoyé aux serveurs d'Eldarya.`,
    unmark_all: "Démarquer tout",
  },
  profile: {
    export_outfit: "Exporter la tenue",
    download_outfit: "Télécharger le PNG",
  },
  error: {
    downloadCanvas:
      "Une erreur est survenue lors du téléchargement de l'image.",
    longLoading:
      "Eldarya prend trop de temps à charger. Nouvelle tentative dans 10 secondes...",
  },
  mall: {
    add_to_wishlist: {
      title: "Ajouter à la liste de souhait du marché",
      text: "Combien de maanas souhaites-tu offrir pour acquérir cet item?",
      note: "Prends note que les items ajoutés à partir de la boutique ne seront pas nécessairement disponibles au marché.",
    },
  },
}

Object.freeze(fr)
