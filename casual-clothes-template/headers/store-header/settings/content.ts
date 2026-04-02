/**
 * Header Content Settings
 * 
 * This file defines all content settings for the header component.
 * Settings are organized by functional groups for better maintainability.
 */

export default {
	// ========================================
	// KEY INFO BAR CONTENT
	// ========================================
	/**
  * Key Info Bar Content
  * The main message displayed in the key info bar (e.g., shipping info, promotions)
  */
	KeyInfoBarContent: {
		type: 'INPUTBOX',
		label: '$label.key_info_bar_content.label',
		placeholder: '$label.key_info_bar_content.placeholder',
		validation: {
			text: { required: false, maxLength: 200 },
		},
	},

	// ========================================
	// LOGO CONTENT
	// ========================================
	/**
  * Store Logo
  * The main logo displayed in the header (text-based logo)
  */
	logo: {
		type: 'LOGO',
		logoType: 'TEXT',
		label: '$label.logo.label',
	},

	// Divider: Separates logo from navigation sections
	divider_1: {
		type: 'DIVIDER',
		label: '$label.divider_1.label',
	},

	// ========================================
	// FIND STORE / LOCATIONS
	// ========================================
	/**
  * Store Locations Label
  * Label for the Store Locations navigation item
  */
	HeaderLocationsLink: {
		type: 'INPUTBOX',
		label: '$label.locations_link.label',
		placeholder: '$label.locations_link.placeholder',
		validation: {
			required: true,
			minLength: 1,
			maxLength: 20,
		},
	},

	/**
  * Store Locations DECK
  * Collection of physical store locations with addresses and contact info
  */
	locations: {
		type: 'DECK',
		label: '$label.locations.deck_title',
		addButtonLabel: '$label.locations.add_card_button',
		maxCards: 10,
		cards: {
			defaultCardContent: {
				label: '$label.locations.card_title',
				settings: {
					location_name: {
						type: 'INPUTBOX',
						label: '$label.location_name.label',
						placeholder: '$label.location_name.placeholder',
					},
					location_address: {
						type: 'INPUTBOX',
						label: '$label.location_address.label',
						placeholder: '$label.location_address.placeholder',
					},
					location_phone: {
						type: 'INPUTBOX',
						label: '$label.location_phone.label',
						placeholder: '$label.location_phone.placeholder',
					},
				},
			},
		},
	},

	/**
 * View on Map Link Text
 * Customizable text for the "View on map" links
 */
	LocationsViewOnMapText: {
		type: 'INPUTBOX',
		label: '$label.view_on_map_text.label',
		placeholder: '$label.view_on_map_text.placeholder',
		validation: {
			required: true,
			minLength: 1,
			maxLength: 20,
		},
	},

	// Divider: Separates locations from customer care
	divider_2: {
		type: 'DIVIDER',
		label: '$label.divider_2.label',
	},

	// ========================================
	// CUSTOMER CARE
	// ========================================
	/**
  * Customer Care Label
  * Label for the Customer Care navigation item
  */
	HeaderCustomerCareLink: {
		type: 'INPUTBOX',
		label: '$label.customer_care_link.label',
		placeholder: '$label.customer_care_link.placeholder',
		validation: {
			required: true,
			minLength: 1,
			maxLength: 20,
		},
	},

	/**
	 * Contact Us Information DECK
	 * Collection of contact methods (email, phone, social media, etc.)
	 */
	ContactUsInfo: {
		type: 'DECK',
		label: '$label.contact_us_info.deck_title',
		addButtonLabel: '$label.contact_us_info.add_card_button',
		maxCards: 5,
		cards: {
			defaultCardContent: {
				label: '$label.contact_us_info.card_title',
				settings: {
					contact_value: {
						type: 'INPUTBOX',
						label: '$label.contact_value.label',
						placeholder: '$label.contact_value.placeholder',
					},
				},
			},
		},
	},

	/**
	 * Useful Links DECK
	 * Collection of helpful customer service links (tracking, shipping, returns, etc.)
	 */
	UsefulLinks: {
		type: 'DECK',
		label: '$label.useful_links.deck_title',
		addButtonLabel: '$label.useful_links.add_card_button',
		maxCards: 10,
		cards: {
			defaultCardContent: {
				label: '$label.useful_links.card_title',
				settings: {
					link_title: {
						type: 'INPUTBOX',
						label: '$label.link_title.label',
						placeholder: '$label.link_title.placeholder',
					},
					link_url: {
						type: 'INPUTBOX',
						label: '$label.link_url.label',
						placeholder: '$label.link_url.placeholder',
					},
				},
			},
		},
	},

	// Divider: Separates customer care from about section
	divider_3: {
		type: 'DIVIDER',
		label: '$label.divider_3.label',
	},

	// ========================================
	// ABOUT
	// ========================================
	/**
  * About Us Link
  * Navigation link to about page
  */
	HeaderAboutLink: {
		type: 'BUTTON',
		label: '$label.about_link.label',
		buttonType: 'GO_TO_STORE_LINK',
	},

	// Divider: Separates about from catalog promo settings
	divider_4: {
		type: 'DIVIDER',
		label: '$label.divider_4.label',
	},

	// ========================================
	// CATALOG SUBMENU PROMO BANNER
	// ========================================
	/**
  * Catalog Promo Image
  * Promotional image displayed in the catalog submenu
  */
	CatalogPromoImage: {
		type: 'IMAGE',
		label: '$label.catalog_promo_image.label',
		defaults: {
			imageData: {
				set: {
					MOBILE_WEBP_LOW_RES: {
						url: 'example-promo-banner.png',
					},
					MOBILE_WEBP_HI_RES: {
						url: 'example-promo-banner.png',
					},
					WEBP_LOW_RES: {
						url: 'example-promo-banner.png',
					},
					WEBP_HI_2X_RES: {
						url: 'example-promo-banner.png',
					},
				},
				borderInfo: {},
			},
		},
	},

	/**
  * Catalog Promo Link Button
  */
	CatalogPromoLink: {
		type: 'BUTTON',
		label: '$label.catalog_promo_link.label',
		description: '$label.catalog_promo_link.description',
	},

} as const
