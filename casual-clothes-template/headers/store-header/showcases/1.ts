export default {
	showcaseId: '1',
	previewImage: {
		set: {
			ORIGINAL: {
				url: 'example_header_showcase_1_preview.png',
			},
		},
	},
	blockName: '$label.showcase_1.blockName',
	content: {
		KeyInfoBarContent: {
			type: 'INPUTBOX',
			text: '$label.showcase_1.KeyInfoBarContent.text',
		},
		logo: {
			type: 'LOGO',
			logoType: 'TEXT',
			text: '$label.showcase_1.logo.text',
		},
		menu: {
			type: 'NAVIGATION_MENU',
		},
		HeaderLocationsLink: {
			type: 'INPUTBOX',
			text: '$label.showcase_1.HeaderLocationsLink.text',
		},
		HeaderCustomerCareLink: {
			type: 'INPUTBOX',
			text: '$label.showcase_1.HeaderCustomerCareLink.text',
		},
		HeaderAboutLink: {
			type: 'BUTTON',
			title: '$label.showcase_1.HeaderAboutLink.title',
			buttonType: 'GO_TO_STORE_LINK',
		},
		locations: {
			type: 'DECK',
			cards: [
				{
					settings: {
						location_name: { 
							type: 'INPUTBOX',
							text: '$label.showcase_1.locations.card_1.location_name', 
						},
						location_address: {
							type: 'INPUTBOX',
							text: '$label.showcase_1.locations.card_1.location_address',
						},
						location_phone: { 
							type: 'INPUTBOX',
							text: '$label.showcase_1.locations.card_1.location_phone', 
						},
					},
				},
				{
					settings: {
						location_name: { 
							type: 'INPUTBOX',
							text: '$label.showcase_1.locations.card_2.location_name', 
						},
						location_address: {
							type: 'INPUTBOX',
							text: '$label.showcase_1.locations.card_2.location_address',
						},
						location_phone: { 
							type: 'INPUTBOX',
							text: '$label.showcase_1.locations.card_2.location_phone', 
						},
					},
				},
				{
					settings: {
						location_name: { 
							type: 'INPUTBOX',
							text: '$label.showcase_1.locations.card_3.location_name', 
						},
						location_address: {
							type: 'INPUTBOX',
							text: '$label.showcase_1.locations.card_3.location_address',
						},
						location_phone: { 
							type: 'INPUTBOX',
							text: '$label.showcase_1.locations.card_3.location_phone', 
						},
					},
				},
			],
		},
		LocationsViewOnMapText: { 
			type: 'INPUTBOX',
			text: '$label.showcase_1.LocationsViewOnMapText.text', 
		},
		ContactUsInfo: {
			type: 'DECK',
			cards: [
				{
					settings: {
						contact_value: {
							type: 'INPUTBOX',
							text: '$label.showcase_1.ContactUsInfo.card_1.contact_value',
						},
					},
				},
				{
					settings: {
						contact_value: {
							type: 'INPUTBOX',
							text: '$label.showcase_1.ContactUsInfo.card_2.contact_value',
						},
					},
				},
			],
		},
		UsefulLinks: {
			type: 'DECK',
			cards: [
				{
					settings: {
						link_title: {
							type: 'INPUTBOX',
							text: '$label.showcase_1.UsefulLinks.card_1.link_title',
						},
						link_url: {
							type: 'INPUTBOX',
							text: '$label.showcase_1.UsefulLinks.card_1.link_url',
						},
					},
				},
				{
					settings: {
						link_title: {
							type: 'INPUTBOX',
							text: '$label.showcase_1.UsefulLinks.card_2.link_title',
						},
						link_url: {
							type: 'INPUTBOX',
							text: '$label.showcase_1.UsefulLinks.card_2.link_url',
						},
					},
				},
				{
					settings: {
						link_title: {
							type: 'INPUTBOX',
							text: '$label.showcase_1.UsefulLinks.card_3.link_title',
						},
						link_url: {
							type: 'INPUTBOX',
							text: '$label.showcase_1.UsefulLinks.card_3.link_url',
						},
					},
				},
				{
					settings: {
						link_title: {
							type: 'INPUTBOX',
							text: '$label.showcase_1.UsefulLinks.card_4.link_title',
						},
						link_url: {
							type: 'INPUTBOX',
							text: '$label.showcase_1.UsefulLinks.card_4.link_url',
						},
					},
				},
				{
					settings: {
						link_title: {
							type: 'INPUTBOX',
							text: '$label.showcase_1.UsefulLinks.card_5.link_title',
						},
						link_url: {
							type: 'INPUTBOX',
							text: '$label.showcase_1.UsefulLinks.card_5.link_url',
						},
					},
				},
			],
		},
		CatalogPromoLink: {
			type: 'BUTTON',
			title: '$label.showcase_1.catalog_promo_link.title',
			buttonType: 'GO_TO_STORE_LINK',
		},
		CatalogPromoImage: {
			type: 'IMAGE',
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
	design: {
		KeyInfoBarText: {
			type: 'TEXT',
			font: 'global.fontFamily.body',
			bold: false,
			italic: false,
			color: '#FFFFFF',
		},
		KeyInfoBarBackground: {
			type: 'BACKGROUND',
			style: 'COLOR',
			color: '#000000',
		},
		logo: {
			type: 'LOGO',
			size: 20,
			bold: true,
			italic: false,
			visible: true,
			spacing: 2,
			capitalization: 'none',
			frame: {
				visible: false,
				width: 3,
				color: '#313131',
			},
		},
		HeaderKeyInfoBar: {
			type: 'TOGGLE',
			enabled: true,
		},
		HeaderLanguageSwitcher: {
			type: 'TOGGLE',
			enabled: true,
		},
		HeaderAccount: {
			type: 'TOGGLE',
			enabled: true,
		},
		HeaderWishlist: {
			type: 'TOGGLE',
			enabled: true,
		},
		HeaderCart: {
			type: 'TOGGLE',
			enabled: true,
		},
		HeaderCategories: {
			type: 'TOGGLE',
			enabled: true,
		},
		HeaderSearch: {
			type: 'TOGGLE',
			enabled: true,
		},
		LocationsVisibility: { 
			type: 'TOGGLE',
			enabled: true, 
		},
		LocationsMapDisplay: { 
			type: 'TOGGLE',
			enabled: true, 
		},
		LocationsMapZoom: {
			type: 'SELECTBOX',
			value: '15',
		},
		CustomerCareVisibility: {
			type: 'TOGGLE',
			enabled: true,
		},
		CatalogPromoBannerVisibility: {
			type: 'TOGGLE',
			enabled: true,
		},
	},
} as const
