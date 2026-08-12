export default {
	section_title: {
		type: 'INPUTBOX',
		label: '$label.section_title.label',
		placeholder: '$label.section_title.placeholder',
	},
	section_description: {
		type: 'TEXTAREA',
		label: '$label.section_description.label',
		placeholder: '$label.section_description.placeholder',
	},
	shop_by_category: {
		type: 'CATEGORY_SELECTOR',
		label: '$label.shop_by_category.label',
		maxCategories: 8,
	},
} as const
