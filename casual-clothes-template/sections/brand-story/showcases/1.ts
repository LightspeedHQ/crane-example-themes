export default {
	showcaseId: '1',
	previewImage: {
		set: {
			ORIGINAL: {
				url: 'brand_story_preview.png',
			},
		},
	},
	blockName: '$label.showcase_1.blockName',
	content: {
		video_url: {
			type: 'INPUTBOX',
			text: '$label.showcase_1.video_url',
		},
		section_title: {
			type: 'INPUTBOX',
			text: '$label.showcase_1.section_title',
		},
		section_description: {
			type: 'TEXTAREA',
			text: '$label.showcase_1.section_description',
		},
		play_button_text: {
			type: 'INPUTBOX',
			text: '$label.showcase_1.play_button_text',
		},
		pause_button_text: {
			type: 'INPUTBOX',
			text: '$label.showcase_1.pause_button_text',
		},
		watch_video_text: {
			type: 'INPUTBOX',
			text: '$label.showcase_1.watch_video_text',
		},
		cta_button: {
			type: 'BUTTON',
			title: '$label.showcase_1.cta_button.title',
			buttonType: 'GO_TO_STORE_LINK',
		},
	},
	design: {
		section_background: {
			type: 'BACKGROUND',
		},
		section_title: {
			type: 'TEXT',
			visible: true,
		},
		section_description: {
			type: 'TEXT',
			visible: true,
		},
		play_button: {
			type: 'BUTTON',
			font: 'global.fontFamily.body',
			appearance: 'SOLID',
			size: 'MEDIUM',
			shape: 'RECTANGLE',
			color: 'global.color.button',
		},
		cta_button: {
			type: 'BUTTON',
			font: 'global.fontFamily.body',
			appearance: 'SOLID',
			size: 'MEDIUM',
			shape: 'RECTANGLE',
		},
	},
} as const
