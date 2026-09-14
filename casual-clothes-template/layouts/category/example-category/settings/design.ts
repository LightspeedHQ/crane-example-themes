const colors = [
	'#000000', '#FFFFFF', '#F5F5F5', '#EEEEEE', '#CCCCCC',
	'#999999', '#666666', '#333333', '#1E1E21', '#536B9F',
] as const
const sizes = [10, 12, 14, 16, 18, 20, 24, 28, 32, 36, 40, 48, 56, 64] as const

function textDesign(label: string, font: string, size: number, color: string) {
	return {
		type: 'TEXT',
		label,
		colors,
		sizes,
		defaults: { font, size, bold: false, italic: false, color, visible: true },
	} as const
}

function buttonDesign(label: string) {
	return {
		type: 'BUTTON',
		label,
		colors,
		defaults: {
			appearance: 'SOLID',
			font: 'global.fontFamily.body',
			size: 'SMALL',
			shape: 'RECTANGLE',
			color: 'global.color.button',
			visible: true,
		},
	} as const
}

export default {
	background: { type: 'BACKGROUND', label: '$label.background.design', colors, defaults: {} },
	category_title: textDesign('$label.category_title.design', 'global.fontFamily.title', 32, 'global.color.title'),
	category_description: textDesign('$label.category_description.design', 'global.fontFamily.body', 16, 'global.color.body'),
	product_text: textDesign('$label.product_text.design', 'global.fontFamily.body', 14, 'global.color.body'),
	buy_now_button: buttonDesign('$label.buy_now_button.design'),
	product_ribbon: { type: 'TOGGLE', label: '$label.product_ribbon.design', defaults: { enabled: true } },
	product_rating: { type: 'TOGGLE', label: '$label.product_rating.design', defaults: { enabled: true } },
} as const
