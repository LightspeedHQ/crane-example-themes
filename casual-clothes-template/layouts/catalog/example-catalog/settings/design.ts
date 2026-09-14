const colors = [
	'#000000', '#FFFFFF', '#F5F5F5', '#EEEEEE', '#CCCCCC',
	'#999999', '#666666', '#333333', '#1E1E21', '#536B9F',
] as const

const sizes = [10, 12, 14, 16, 18, 20, 24, 28, 32, 36, 40, 48, 56, 64] as const

export default {
	background: {
		type: 'BACKGROUND',
		label: '$label.background.design',
		colors,
		defaults: {},
	},
	section_title: {
		type: 'TEXT',
		label: '$label.section_title.design',
		colors,
		sizes,
		defaults: {
			font: 'global.fontFamily.title',
			size: 32,
			bold: false,
			italic: false,
			color: 'global.color.title',
			visible: true,
		},
	},
	section_subtitle: {
		type: 'TEXT',
		label: '$label.section_subtitle.design',
		colors,
		sizes,
		defaults: {
			font: 'global.fontFamily.body',
			size: 16,
			bold: false,
			italic: false,
			color: 'global.color.body',
			visible: true,
		},
	},
	product_text: {
		type: 'TEXT',
		label: '$label.product_text.design',
		colors,
		sizes,
		defaults: {
			font: 'global.fontFamily.body',
			size: 16,
			bold: false,
			italic: false,
			color: 'global.color.body',
			visible: true,
		},
	},
	buy_now_button: {
		type: 'BUTTON',
		label: '$label.buy_now_button.design',
		colors,
		defaults: {
			appearance: 'SOLID',
			font: 'global.fontFamily.body',
			size: 'MEDIUM',
			shape: 'RECTANGLE',
			color: 'global.color.button',
			visible: true,
		},
	},
	product_ribbon: {
		type: 'TOGGLE',
		label: '$label.product_ribbon.design',
		defaults: { enabled: true },
	},
	product_rating: {
		type: 'TOGGLE',
		label: '$label.product_rating.design',
		defaults: { enabled: true },
	},
} as const
