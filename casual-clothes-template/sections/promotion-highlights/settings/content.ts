export default {
	section_title: {
		type: 'INPUTBOX',
		label: '$label.section_title.label',
		placeholder: '$label.section_title.placeholder',
		defaults: {
			text: '$label.section_title.default',
		},
	},
	section_description: {
		type: 'TEXTAREA',
		label: '$label.section_description.label',
		placeholder: '$label.section_description.placeholder',
		defaults: {
			text: '$label.section_description.default',
		},
	},
	view_all_button: {
		type: 'BUTTON',
		label: '$label.view_all_button.label',
	},
	promotion_products: {
		type: 'PRODUCT_SELECTOR',
		label: '$label.promotion_products.label',
		maxProducts: 8,
	},
} as const
