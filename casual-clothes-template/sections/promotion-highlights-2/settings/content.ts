export default {
	eyebrow_text: {
		type: 'INPUTBOX',
		label: '$label.eyebrow_text.label',
		placeholder: '$label.eyebrow_text.placeholder',
	},
	product_image: {
		type: 'IMAGE',
		label: '$label.product_image.label',
		defaults: {
			imageData: {
				set: {
					MOBILE_WEBP_LOW_RES: {
						url: 'product-image.png',
					},
					MOBILE_WEBP_HI_RES: {
						url: 'product-image.png',
					},
					WEBP_LOW_RES: {
						url: 'product-image.png',
					},
					WEBP_HI_2X_RES: {
						url: 'product-image.png',
					},
				},
				borderInfo: {},
			},
		},
	},
	overlay_headline: {
		type: 'TEXTAREA',
		label: '$label.overlay_headline.label',
		placeholder: '$label.overlay_headline.placeholder',
	},
	description: {
		type: 'TEXTAREA',
		label: '$label.description.label',
		placeholder: '$label.description.placeholder',
	},
	cta_button: {
		type: 'BUTTON',
		label: '$label.cta_button.label',
		description: '$label.cta_button.description',
	},
} as const
