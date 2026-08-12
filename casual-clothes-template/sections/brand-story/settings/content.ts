export default {
	video_url: {
		type: 'INPUTBOX',
		label: '$label.video_url.label',
		placeholder: '$label.video_url.placeholder',
	},
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
	play_button_text: {
		type: 'INPUTBOX',
		label: '$label.play_button_text.label',
		placeholder: '$label.play_button_text.placeholder',
	},
	pause_button_text: {
		type: 'INPUTBOX',
		label: '$label.pause_button_text.label',
		placeholder: '$label.pause_button_text.placeholder',
	},
	watch_video_text: {
		type: 'INPUTBOX',
		label: '$label.watch_video_text.label',
		placeholder: '$label.watch_video_text.placeholder',
	},
	cta_button: {
		type: 'BUTTON',
		label: '$label.cta_button.label',
		defaults: {
			title: '$label.cta_button.defaults.title',
			buttonType: 'GO_TO_STORE_LINK',
		},
	},
} as const
