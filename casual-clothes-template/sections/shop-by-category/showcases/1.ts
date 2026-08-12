export default {
	showcaseId: '1',
	previewImage: {
		set: {
			ORIGINAL: {
				url: 'shop_by_category_showcase_1_preview.png',
			},
		},
	},
	blockName: '$label.showcase_1.blockName',
	content: {
		section_title: {
			type: 'INPUTBOX',
			text: '$label.showcase_1.section_title.text',
		},
		section_description: {
			type: 'TEXTAREA',
			text: '$label.showcase_1.section_description.text',
		},
		shop_by_category: {
			type: 'CATEGORY_SELECTOR',
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
		category_text: {
			type: 'TEXT',
			visible: true,
		},
		background: {
			type: 'BACKGROUND',
		},
	},
} as const
