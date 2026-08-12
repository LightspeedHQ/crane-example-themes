export default {
	showcaseId: '1',
	previewImage: {
		set: {
			ORIGINAL: {
				url: 'promotion_highlights_preview.png',
			},
		},
	},
	blockName: '$label.blockName',
	content: {
		section_title: {
			type: 'INPUTBOX',
			text: '$label.section_title.default',
		},
		section_description: {
			type: 'TEXTAREA',
			text: '$label.section_description.default',
		},
		view_all_button: {
			type: 'BUTTON',
			buttonType: 'GO_TO_STORE_LINK',
			title: '$label.showcase_1.view_all_button.title',
		},
		promotion_products: {
			type: 'PRODUCT_SELECTOR',
		},
	},
	design: {
		section_title: {
			type: 'TEXT',
			visible: true,
		},
		section_description: {
			type: 'TEXT',
			visible: true,
		},
		product_title: {
			type: 'TEXT',
			visible: true,
		},
		product_price: {
			type: 'TEXT',
			visible: true,
		},
		product_sale_price: {
			type: 'TEXT',
			visible: true,
		},
		background: {
			type: 'BACKGROUND',
		},
	},
} as const
