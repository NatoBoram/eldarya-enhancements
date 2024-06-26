import type { Translation } from "./translation"

export const en: Translation = {
	home: {
		forum: "Forum",
		takeover: "Takeover",
	},
	takeover: {
		bought: (name, price) =>
			`Bought <strong>${name}</strong> for <strong class="price-item">${price}</strong> <span class="maana-icon" alt="maanas"></span>.`,
		disabled: "Takeover mode disabled.",
		enabled: "Takeover mode enabled. Please do not interact with this tab.",
	},
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
		played_for: (name, maanas) =>
			`Played <strong>${name}</strong> for <strong class="price-item">${maanas}</strong> <span class="maana-icon" alt="maanas"></span> earned.`,
		played: name => `Played <strong>${name}</strong>.`,
		playing: name => `Playing <strong>${name}</strong>...`,
	},
	appearance: {
		buttons: {
			backward: "Move back",
			forward: "Bring forward",
		},
		favourites: {
			buttons: {
				download: "Download PNG",
				export: "Export",
				import: "Import",
			},
			click_outfit: {
				delete: "Delete",
				goto_account: `To transfer your <strong>${GM.info.script.name}</strong> favourite outfits to another browser, export your settings in the <a href="/user/account" style="text-decoration: underline;">my&nbsp;account</a> page.`,
				saved_locally: `Take note that this outfit is saved in <strong>${GM.info.script.name}</strong>' settings and was not sent to Eldarya's servers.`,
				wear: "Wear",
			},
			imported: "Imported outfit!",
			importing: "Importing outfit. Please wait...",
			rename_outfit: {
				title: (name: string) => `Rename <strong>${name}</strong>`,
				button: "Rename",
			},
			save_outfit: {
				goto_account: `To transfer your <strong>${GM.info.script.name}</strong> favourite outfits to another browser, export your settings in the <a href="/user/account" style="text-decoration: underline;">my&nbsp;account</a> page.`,
				placeholder: "Name...",
				save: "Save",
				saved_locally: `Take note that this outfit will only be saved within <strong>${GM.info.script.name}</strong>' settings and will not be sent to Eldarya's servers.`,
				title: "Save outfit",
			},
		},
		loaded: "The wardrobe is loaded.",
		loading: (categoryname: string) =>
			`Loading <strong>${categoryname}</strong>...`,
	},
	market: {
		add_to_wishlist: {
			added_to_wishlist: (name, price) =>
				`Added <strong>${name}</strong> for <strong class="price-item">${price}</strong> <span class="maana-icon" alt="maanas"></span> to the wishlist.`,
			invalid_price: "This is not a valid price.",
			save: "Save",
			text: "How many maanas do you wish to offer to acquire this item?",
			title: "Add to wishlist",
		},
		auctions: {
			buy_now_price: "Buy now price :",
			current_price: "Current price :",
			delete: "Delete",
			purchase_history: "Purchase history",
			sales_history: "Sales history",
			date_time_format: new Intl.DateTimeFormat("en-GB", {
				minute: "2-digit",
				hour: "2-digit",
				day: "numeric",
				month: "long",
				year: "numeric",
			}),
		},
		change_price: {
			changed_price: (name, price) =>
				`Changed <strong>${name}</strong>'s price for <strong class="price-item">${price}</strong> <span class="maana-icon" alt="maanas"></span>.`,
			invalid_price: "This is not a valid price.",
			save: "Save",
			text: "How many maanas do you wish to offer to acquire this item?",
			title: "Change price",
		},
		wishlist: {
			actions: "Actions",
			assistance: `On this page, you can organize your wishlist and check the status of your wished items. Please note that your wishlist is saved locally in <strong>${GM.info.script.name}</strong>' settings and is not sent to Eldarya's servers. To transfer your wishlist to another browser, export your settings in the <a href="/user/account" style="text-decoration: underline;">my&nbsp;account</a> page.`,
			change_price: "Change price",
			delete_tooltip: "Remove from wishlist",
			delete: "Delete",
			icon: "Icon",
			name: "Name",
			price: "Price",
			reset_all: "Reset all statuses",
			reset_tooltip: "Reset the error status",
			reset: "Reset",
			status: "Status",
			title: "Wishlist",
		},
	},
	account: {
		cancel: "Cancel",
		confirm_reset_content: `Are you sure you want to reset your <strong>${GM.info.script.name}</strong> settings? Your free saved favorite outfits, wishlist, exploration and market history, and marked exploration points will be erased. You will also need to re-enable all the desired settings.`,
		confirm_reset_title: "Erase settings",
		confirm: "Reset",
		debug_tooltip: "Enables or disables logging.",
		debug: "Debug",
		delete_explorations: "Delete all exploration points",
		enhancements: "Enhancements",
		explorations_deleted: "Your marked exploration points were deleted.",
		explorations: "Explorations",
		export: "Export settings",
		import: "Import settings",
		imported: "Imported settings!",
		market: "Market",
		minigames: "Minigames",
		reset: "Reset",
	},
	pet: {
		auto_explore: "Highlight",
		date_time_format: new Intl.DateTimeFormat("en-GB", {
			minute: "2-digit",
			hour: "2-digit",
			day: "numeric",
			month: "long",
			year: "numeric",
		}),
		delete_history: "Delete history",
		deleting_markers: "Deleting markers...",
		empty_history:
			"Your exploration history is empty. It will automatically fill up as your familiar finds items while exploring.",
		goto_account: `To transfer your exploration history to another browser, export your settings from the <em>my&nbsp;account</em> page.`,
		history: "History",
		mark_all: "Mark this region",
		saved_locally: `Please note that your exploration history is saved locally in <strong>${GM.info.script.name}</strong>' settings and was not sent to Eldarya's servers.`,
		unmark_all: "Unmark this region",
	},
	profile: {
		export_outfit: "Export outfit",
		download_outfit: "Download PNG",
	},
	error: {
		downloadCanvas: "There was an error while creating the image.",
		longLoading:
			"Eldarya is taking too long to load. Retrying in 10 seconds...",
	},
	mall: {
		add_to_wishlist: {
			title: "Add to market wishlist",
			text: "How many maanas do you wish to offer to acquire this item?",
			note: "Please note that the items added from the mall will not necessarily be available at the market.",
		},
	},
}

Object.freeze(en)
