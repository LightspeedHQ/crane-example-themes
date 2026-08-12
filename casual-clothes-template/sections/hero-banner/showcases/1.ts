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
		hero_title: {
			type: 'TEXTAREA',
			text: '$label.showcase_1.hero_title',
		},
		background_image: {
			type: 'IMAGE',
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
			color: '#FFFFFF',
		},
		hero_title: {
			type: 'TEXT',
			color: '#FFFFFF',
			bold: true,
			visible: true,
		},
		cta_button: {
			type: 'BUTTON',
			font: 'global.fontFamily.body',
			appearance: 'SOLID',
			size: 'MEDIUM',
			shape: 'RECTANGLE',
			color: '#FFFFFF',
		},
		overlay_background: {
			type: 'TOGGLE',
			enabled: true,
		},
	},
} as const
