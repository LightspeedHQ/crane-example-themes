export default {
	showcaseId: '1',
	previewImage: {
		set: {
			ORIGINAL: {
				url: 'featured-products-preview.png',
			},
		},
	},
	blockName: '$label.showcase_1.blockName',
	content: {
		section_title: {
			type: 'INPUTBOX',
			text: '$label.showcase_1.section_title',
		},
		section_description: {
			type: 'INPUTBOX',
			text: '$label.showcase_1.section_description',
		},
		featured_products: {
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
		product_name: {
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
