export default {
	showcaseId: '1',
	previewImage: {
		set: {
			ORIGINAL: {
				url: 'preview.png',
			},
		},
	},
	blockName: '$label.showcase_1.blockName',
	content: {
		eyebrow_text: {
			type: 'INPUTBOX',
			text: '$label.showcase_1.eyebrow_text',
		},
		product_image: {
			type: 'IMAGE',
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
		overlay_headline: {
			type: 'TEXTAREA',
			text: '$label.showcase_1.overlay_headline',
		},
		description: {
			type: 'TEXTAREA',
			text: '$label.showcase_1.description',
		},
		cta_button: {
			type: 'BUTTON',
			title: '$label.showcase_1.cta_button.title',
			buttonType: 'GO_TO_STORE_LINK',
		},
	},
	design: {
		eyebrow_text: {
			type: 'TEXT',
			visible: true,
		},
		overlay_headline: {
			type: 'TEXT',
			visible: true,
		},
		description: {
			type: 'TEXT',
			visible: true,
		},
		cta_button: {
			type: 'BUTTON',
			font: 'global.fontFamily.body',
			appearance: 'SOLID',
			size: 'MEDIUM',
			shape: 'RECTANGLE',
		},
	},
} as const
