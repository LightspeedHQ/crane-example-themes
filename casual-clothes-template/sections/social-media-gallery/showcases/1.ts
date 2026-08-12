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
			text: '$label.showcase_1.section_title.text',
		},
		section_subtitle: {
			type: 'TEXTAREA',
			text: '$label.showcase_1.section_subtitle.text',
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
										url: 'social-media-1.png',
									},
									MOBILE_WEBP_HI_RES: {
										url: 'social-media-1.png',
									},
									WEBP_LOW_RES: {
										url: 'social-media-1.png',
									},
									WEBP_HI_2X_RES: {
										url: 'social-media-1.png',
									},
								},
								borderInfo: {},
							},
						},
						username: {
							type: 'INPUTBOX',
							text: '$label.showcase_1.username_1.text',
						},
						alt_text: {
							type: 'INPUTBOX',
							text: '$label.showcase_1.alt_text_1.text',
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
										url: 'social-media-2.png',
									},
									MOBILE_WEBP_HI_RES: {
										url: 'social-media-2.png',
									},
									WEBP_LOW_RES: {
										url: 'social-media-2.png',
									},
									WEBP_HI_2X_RES: {
										url: 'social-media-2.png',
									},
								},
								borderInfo: {},
							},
						},
						username: {
							type: 'INPUTBOX',
							text: '$label.showcase_1.username_2.text',
						},
						alt_text: {
							type: 'INPUTBOX',
							text: '$label.showcase_1.alt_text_2.text',
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
										url: 'social-media-3.png',
									},
									MOBILE_WEBP_HI_RES: {
										url: 'social-media-3.png',
									},
									WEBP_LOW_RES: {
										url: 'social-media-3.png',
									},
									WEBP_HI_2X_RES: {
										url: 'social-media-3.png',
									},
								},
								borderInfo: {},
							},
						},
						username: {
							type: 'INPUTBOX',
							text: '$label.showcase_1.username_3.text',
						},
						alt_text: {
							type: 'INPUTBOX',
							text: '$label.showcase_1.alt_text_3.text',
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
										url: 'social-media-4.png',
									},
									MOBILE_WEBP_HI_RES: {
										url: 'social-media-4.png',
									},
									WEBP_LOW_RES: {
										url: 'social-media-4.png',
									},
									WEBP_HI_2X_RES: {
										url: 'social-media-4.png',
									},
								},
								borderInfo: {},
							},
						},
						username: {
							type: 'INPUTBOX',
							text: '$label.showcase_1.username_4.text',
						},
						alt_text: {
							type: 'INPUTBOX',
							text: '$label.showcase_1.alt_text_4.text',
						},
					},
				},
			],
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
		section_subtitle: {
			type: 'TEXT',
			visible: true,
		},
		gallery_item_username: {
			type: 'TEXT',
			visible: true,
		},
	},
} as const
