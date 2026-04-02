export default {
	section_title: {
		type: 'INPUTBOX',
		label: '$label.section_title.label',
		placeholder: '$label.section_title.placeholder',
	},
	section_subtitle: {
		type: 'TEXTAREA',
		label: '$label.section_subtitle.label',
		placeholder: '$label.section_subtitle.placeholder',
	},
	gallery_items: {
		type: 'DECK',
		label: '$label.gallery_items.deck_title',
		addButtonLabel: '$label.gallery_items.add_card_button',
		maxCards: 8,
		cards: {
			defaultCardContent: {
				label: '$label.gallery_items.card_title',
				settings: {
					image: {
						type: 'IMAGE',
						label: '$label.gallery_item_image.label',
						defaults: {
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
					},
					username: {
						type: 'INPUTBOX',
						label: '$label.gallery_item_username.label',
						placeholder: '$label.gallery_item_username.placeholder',
						defaults: {
							text: '$label.gallery_item_username.default',
						},
					},
					alt_text: {
						type: 'INPUTBOX',
						label: '$label.gallery_item_alt_text.label',
						placeholder: '$label.gallery_item_alt_text.placeholder',
						defaults: {
							text: '$label.gallery_item_alt_text.default',
						},
					},
				},
			},
		},
	},
} as const
