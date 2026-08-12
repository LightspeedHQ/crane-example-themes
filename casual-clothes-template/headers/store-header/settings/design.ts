/**
 * Header Design Settings
 * 
 * This file defines all design-related settings for the header component.
 * Settings are organized by functional groups for better maintainability.
 */

export default {
	// ========================================
	// KEY INFO BAR DESIGN
	// ========================================
	/**
	 * Key Info Bar Text Styling
	 * Controls the typography and appearance of the key info bar text
	 */
	KeyInfoBarText: {
		type: 'TEXT',
		label: '$label.key_info_bar_text.label',
		colors: [
			'#000000',
			'#FFFFFF',
			'#F5F5F5',
			'#EEEEEE',
			'#CCCCCC',
			'#999999',
			'#666666',
			'#333333',
			'#1E1E21',
		],
		sizes: [
			10, 12, 14, 16, 18, 20, 22, 24, 26, 28, 30, 32, 36, 40, 48, 56, 64, 72, 80, 88, 96, 104,
			112, 120,
		],
		defaults: {
			font: 'global.fontFamily.body',
			bold: false,
			italic: false,
			color: '#FFFFFF',
			visible: true,
		},
	},
	/**
	 * Key Info Bar Background
	 * Controls the background color/style of the key info bar
	 */
	KeyInfoBarBackground: {
		type: 'BACKGROUND',
		label: '$label.key_info_bar_background.label',
		colors: [
			'#000000',
			'#FFFFFF',
			'#F5F5F5',
			'#EEEEEE',
			'#CCCCCC',
			'#999999',
			'#666666',
			'#333333',
			'#1E1E21',
		],
		defaults: {
			style: 'COLOR',
			color: '#000000',
		},
	},

	// ========================================
	// HEADER MAIN DESIGN
	// ========================================
	/**
	 * Header Background
	 * Controls the main background color/style of the header
	 */
	HeaderBackground: {
		type: 'BACKGROUND',
		label: '$label.header_background.label',
		colors: [
			'#000000',
			'#FFFFFF',
			'#F5F5F5',
			'#EEEEEE',
			'#CCCCCC',
			'#999999',
			'#666666',
			'#333333',
			'#1E1E21',
		],
		defaults: {},
	},
	/**
	 * Header Text Styling
	 * Controls the typography and appearance of header text elements
	 */
	HeaderText: {
		type: 'TEXT',
		label: '$label.header_text.label',
		colors: [
			'#000000',
			'#FFFFFF',
			'#F5F5F5',
			'#EEEEEE',
			'#CCCCCC',
			'#999999',
			'#666666',
			'#333333',
			'#1E1E21',
		],
		sizes: [
			10, 12, 14, 16, 18, 20, 22, 24, 26, 28, 30, 32, 36, 40, 48, 56, 64, 72, 80, 88, 96, 104,
			112, 120,
		],
		defaults: {
			font: 'global.fontFamily.body',
			bold: false,
			italic: false,
			color: 'global.color.body',
			visible: true,
		},
	},

	// ========================================
	// HEADER ELEMENT TOGGLES
	// ========================================
	/**
	 * Key Info Bar Toggle
	 * Controls whether the key info bar is displayed
	 */
	HeaderKeyInfoBar: {
		type: 'TOGGLE',
		label: '$label.key_info_bar.label',
		defaults: {
			enabled: true,
		},
	},
	/**
	 * Language Switcher Toggle
	 * Controls whether the language switcher is displayed
	 */
	HeaderLanguageSwitcher: {
		type: 'TOGGLE',
		label: '$label.language_switcher.label',
		defaults: {
			enabled: true,
		},
	},
	/**
	 * Account Button Toggle
	 * Controls whether the account/login button is displayed
	 */
	HeaderAccount: {
		type: 'TOGGLE',
		label: '$label.account.label',
		defaults: {
			enabled: true,
		},
	},
	/**
	 * Wishlist Button Toggle
	 * Controls whether the wishlist/favorites button is displayed
	 */
	HeaderWishlist: {
		type: 'TOGGLE',
		label: '$label.wishlist.label',
		defaults: {
			enabled: true,
		},
	},
	/**
	 * Cart Button Toggle
	 * Controls whether the shopping cart button is displayed
	 */
	HeaderCart: {
		type: 'TOGGLE',
		label: '$label.cart.label',
		defaults: {
			enabled: true,
		},
	},
	/**
	 * Categories Menu Toggle
	 * Controls whether the categories menu is displayed
	 */
	HeaderCategories: {
		type: 'TOGGLE',
		label: '$label.categories.label',
		defaults: {
			enabled: true,
		},
	},
	/**
	 * Search Button Toggle
	 * Controls whether the search button is displayed
	 */
	HeaderSearch: {
		type: 'TOGGLE',
		label: '$label.search.label',
		defaults: {
			enabled: true,
		},
	},

	// ========================================
	// LOGO DESIGN
	// ========================================
	/**
	 * Logo
	 * Controls the logo displayed in the header
	 */
	logo: {
		type: 'LOGO',
		label: '$label.logo.label',
		defaults: {
			font: 'global.fontFamily.title',
			size: 20,
			bold: true,
			italic: false,
			color: 'global.color.title',
			frame: {
				visible: false,
				width: 3,
				color: '#313131',
			},
		},
	},

	// ========================================
	// LOCATIONS SETTINGS
	// ========================================
	/**
	 * Locations Visibility Toggle
	 * Controls whether the store locations feature is displayed
	 */
	LocationsVisibility: {
		type: 'TOGGLE',
		label: '$label.locations_visibility.label',
		defaults: {
			enabled: true,
		},
	},

	/**
	 * Locations Map Display Toggle
	 * Controls whether the embedded map is shown with locations
	 */
	LocationsMapDisplay: {
		type: 'TOGGLE',
		label: '$label.locations_map_display.label',
		defaults: {
			enabled: true,
		},
	},

	/**
	 * Locations Map Zoom Level
	 * Controls the initial zoom level of the embedded map
	 * Options range from world view (1) to building level (21)
	 * Recommended: 12 for city view, 15 for street level, 18 for building view
	 */
	LocationsMapZoom: {
		type: 'SELECTBOX',
		label: '$label.locations_map_zoom.label',
		description: '$label.locations_map_zoom.description',
		options: [
			{ label: '$label.locations_map_zoom.option.world', value: '3' },
			{ label: '$label.locations_map_zoom.option.country', value: '6' },
			{ label: '$label.locations_map_zoom.option.region', value: '9' },
			{ label: '$label.locations_map_zoom.option.city', value: '12' },
			{ label: '$label.locations_map_zoom.option.street', value: '15' },
			{ label: '$label.locations_map_zoom.option.building', value: '18' },
		],
		defaults: {
			value: '15',
		},
	},

	// ========================================
	// CUSTOMER CARE SETTINGS
	// ========================================
	/**
	 * Customer Care Visibility Toggle
	 * Controls whether the customer care feature is displayed
	 */
	CustomerCareVisibility: {
		type: 'TOGGLE',
		label: '$label.customer_care_visibility.label',
		defaults: {
			enabled: true,
		},
	},

	// ========================================
	// CATALOG PROMO BANNER SETTINGS
	// ========================================
	/**
	 * Catalog Promo Banner Visibility Toggle
	 * Controls whether the promotional banner is displayed in the catalog submenu
	 */
	CatalogPromoBannerVisibility: {
		type: 'TOGGLE',
		label: '$label.catalog_promo_banner_visibility.label',
		defaults: {
			enabled: true,
		},
	},
} as const
