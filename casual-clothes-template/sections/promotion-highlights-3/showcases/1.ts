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
		section_title: {
			type: 'INPUTBOX',
			text: '$label.showcase_1.section_title',
		},
		gallery_items: {
			type: 'DECK',
			cards: [
				{
					settings: {
						image: {
							type: 'IMAGE',
							imageData: {
								set: {
									MOBILE_WEBP_LOW_RES: {
										url: 'image-1.png',
									},
									MOBILE_WEBP_HI_RES: {
										url: 'image-1.png',
									},
									WEBP_LOW_RES: {
										url: 'image-1.png',
									},
									WEBP_HI_2X_RES: {
										url: 'image-1.png',
									},
								},
								borderInfo: {},
							},
						},
						alt_text: {
							type: 'INPUTBOX',
							text: '$label.showcase_1.alt_text_1',
						},
					},
				},
				{
					settings: {
						image: {
							type: 'IMAGE',
							imageData: {
								set: {
									MOBILE_WEBP_LOW_RES: {
										url: 'image-2.png',
									},
									MOBILE_WEBP_HI_RES: {
										url: 'image-2.png',
									},
									WEBP_LOW_RES: {
										url: 'image-2.png',
									},
									WEBP_HI_2X_RES: {
										url: 'image-2.png',
									},
								},
								borderInfo: {},
							},
						},
						alt_text: {
							type: 'INPUTBOX',
							text: '$label.showcase_1.alt_text_2',
						},
					},
				},
			],
		},
		cta_button: {
			type: 'BUTTON',
			title: '$label.showcase_1.cta_button.title',
			buttonType: 'GO_TO_STORE_LINK',
		},
	},
	design: {
		section_background: {
			type: 'BACKGROUND',
		},
		section_title: {
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
