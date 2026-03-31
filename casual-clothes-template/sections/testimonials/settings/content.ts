export default {
	sectionTitle: {
		type: 'INPUTBOX',
		label: '$label.reviewed_by_you.section_title',
		placeholder: '$label.reviewed_by_you.section_title.placeholder',
		defaults: {
			text: '$label.reviewed_by_you.section_title.default',
		},
	},
	reviews: {
		type: 'DECK',
		label: '$label.reviewed_by_you.section_title',
		addButtonLabel: '$label.reviewed_by_you.add_review_button',
		placeholder: '$label.reviewed_by_you.reviewer_name.placeholder',
		maxCards: 5,
		cards: {
			defaultCardContent: {
				label: '$label.reviewed_by_you.card_title',
				settings: {
					reviewedBy: {
						type: 'INPUTBOX',
						description: '$label.description',
						label: '$label.reviewed_by_you.reviewer_name.label',
						placeholder: '$label.reviewed_by_you.reviewer_name.placeholder',
						defaults: {
							text: '$label.reviewed_by_you.reviewer_name.default',
						},
					},
					reviewText: {
						type: 'TEXTAREA',
						label: '$label.reviewed_by_you.review_text.label',
						placeholder: '$label.reviewed_by_you.review_text.placeholder',
						defaults: {
							text: '$label.reviewed_by_you.review_text.default',
						},
					},
					rating: {
						type: 'SELECTBOX',
						placeholder: '$label.reviewed_by_you.rating.placeholder',
						label: '$label.reviewed_by_you.rating.label',
						description: '$label.reviewed_by_you.rating.description',
						options: [
							{ label: '$label.reviewed_by_you.rating.5_0', value: '500' },
							{ label: '$label.reviewed_by_you.rating.4_5', value: '450' },
							{ label: '$label.reviewed_by_you.rating.4_0', value: '400' },
							{ label: '$label.reviewed_by_you.rating.3_5', value: '350' },
							{ label: '$label.reviewed_by_you.rating.3_0', value: '300' },
							{ label: '$label.reviewed_by_you.rating.2_0', value: '200' },
							{ label: '$label.reviewed_by_you.rating.1_0', value: '100' },
						],
						defaults: {
							value: '500',
						},
					},
				},
			},
		},
	},
} as const
