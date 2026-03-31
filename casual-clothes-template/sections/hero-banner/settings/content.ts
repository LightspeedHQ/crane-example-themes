export default {
	eyebrow_text: {
		type: 'INPUTBOX',
		label: '$label.eyebrow_text.label',
		placeholder: '$label.eyebrow_text.placeholder',
	},
	hero_title: {
		type: 'TEXTAREA',
		label: '$label.hero_title.label',
		placeholder: '$label.hero_title.placeholder',
	},
	background_image: {
		type: 'IMAGE',
		label: '$label.background_image.label',
		defaults: {
			imageData: {
				set: {
					MOBILE_WEBP_LOW_RES: {
						url: 'hero-background.jpg',
					},
					MOBILE_WEBP_HI_RES: {
						url: 'hero-background.jpg',
					},
					WEBP_LOW_RES: {
						url: 'hero-background.jpg',
					},
					WEBP_HI_2X_RES: {
						url: 'hero-background.jpg',
					},
				},
				borderInfo: {},
			},
		},
	},
	cta_button: {
		type: 'BUTTON',
		label: '$label.cta_button.label',
		description: '$label.cta_button.description',
	},
} as const
