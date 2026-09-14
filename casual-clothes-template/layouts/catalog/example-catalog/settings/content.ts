export default {
	category_showcase_title: {
		type: 'INPUTBOX',
		label: '$label.category_showcase_title.label',
		placeholder: '$label.category_showcase_title.placeholder',
		defaults: { text: '$label.category_showcase_title' },
	},
	category_showcase_subtitle: {
		type: 'INPUTBOX',
		label: '$label.category_showcase_subtitle.label',
		placeholder: '$label.category_showcase_subtitle.placeholder',
		defaults: { text: '$label.category_showcase_subtitle' },
	},
	products_title: {
		type: 'INPUTBOX',
		label: '$label.products_title.label',
		placeholder: '$label.products_title.placeholder',
		defaults: { text: '$label.products_title' },
	},
	products_subtitle: {
		type: 'INPUTBOX',
		label: '$label.products_subtitle.label',
		placeholder: '$label.products_subtitle.placeholder',
		defaults: { text: '$label.products_subtitle' },
	},
	buy_now_label: {
		type: 'INPUTBOX',
		label: '$label.buy_now_label.label',
		placeholder: '$label.buy_now_label.placeholder',
		defaults: { text: '$label.buy_now' },
	},
} as const
