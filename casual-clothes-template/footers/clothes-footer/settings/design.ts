export default {
	title: {
		type: 'TEXT',
		label: '$label.title.design',
		colors: [
			'#000000',
			'#FFFFFF',
			'#F5F5F5',
			'#EEEEEE',
			'#CCCCCC',
			'#999999',
			'#666666',
			'#333333',
			'#1E1E21',
		],
		sizes: [
			10, 12, 14, 16, 18, 20, 22, 24, 26, 28, 30, 32, 36, 40, 48, 56, 64, 72, 80, 88, 96, 104,
			112, 120,
		],
		defaults: {
			font: 'global.fontFamily.body',
			bold: true,
			italic: false,
			color: 'global.color.title',
			visible: true,
		},
	},
	link: {
		type: 'TEXT',
		label: '$label.link.design',
		colors: [
			'#000000',
			'#FFFFFF',
			'#F5F5F5',
			'#EEEEEE',
			'#CCCCCC',
			'#999999',
			'#666666',
			'#333333',
			'#1E1E21',
		],
		sizes: [
			10, 12, 14, 16, 18, 20, 22, 24, 26, 28, 30, 32, 36, 40, 48, 56, 64, 72, 80, 88, 96, 104,
			112, 120,
		],
		defaults: {
			font: 'global.fontFamily.body',
			bold: false,
			italic: false,
			color: 'global.color.body',
			visible: true,
		},
	},
	background: {
		type: 'BACKGROUND',
		label: '$label.section_background.label',
		colors: [
			'#000000',
			'#FFFFFF',
			'#F5F5F5',
			'#EEEEEE',
			'#CCCCCC',
			'#999999',
			'#666666',
			'#333333',
			'#1E1E21',
		],
		defaults: {
		},
	},
	isLinksGroup: {
		type: 'TOGGLE',
		label: '$label.isLinksGroup.label',
		defaults: {
			enabled: true,
		},
	},
	isContactUs: {
		type: 'TOGGLE',
		label: '$label.isContactUs.label',
		defaults: {
			enabled: true,
		},
	},
	isLegalAndTechnicalLinks: {
		type: 'TOGGLE',
		label: '$label.isLegalAndTechnicalLinks.label',
		defaults: {
			enabled: true,
		},
	},
	isSocialMediaLinks: {
		type: 'TOGGLE',
		label: '$label.isSocialMediaLinks.label',
		defaults: {
			enabled: true,
		},
	},
	isFooterImageAndText: {
		type: 'TOGGLE',
		label: '$label.isFooterImageAndText.label',
		defaults: {
			enabled: true,
		},
	},
	footer_text: {
		type: 'TEXT',
		label: '$label.footer_text.design',
		colors: [
			'#000000',
			'#FFFFFF',
			'#F5F5F5',
			'#EEEEEE',
			'#CCCCCC',
			'#999999',
			'#666666',
			'#333333',
			'#1E1E21',
		],
		sizes: [
			10, 12, 14, 16, 18, 20, 22, 24, 26, 28, 30, 32, 36, 40, 48, 56, 64, 72, 80, 88, 96, 104,
			112, 120,
		],
		defaults: {
			font: 'global.fontFamily.body',
			bold: false,
			italic: false,
			color: 'global.color.body',
			visible: true,
		},
	},
} as const
