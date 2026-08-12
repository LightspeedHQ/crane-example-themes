export default {
	showcaseId: '1',
	previewImage: {
		set: {
			ORIGINAL: {
				url: 'ReviewedByYou_showcase.png',
				width: 500,
				height: 100,
			},
		},
	},
	blockName: '$label.reviewed_by_you.block_name',
	content: {
		sectionTitle: {
			type: 'INPUTBOX',
			text: '$label.reviewed_by_you.section_title',
		},
		reviews: {
			type: 'DECK',
			cards: [
				{
					settings: {
						reviewedBy: {
							type: 'INPUTBOX',
							text: '$label.reviewed_by_you.review_text.first.contentBy',
						},
						reviewText: {
							type: 'TEXTAREA',
							text: '$label.reviewed_by_you.review_text.first.content',
						},
						rating: {
							type: 'SELECTBOX',
							value: '500',
						},
					},
				},
				{
					settings: {
						reviewedBy: {
							type: 'INPUTBOX',
							text: '$label.reviewed_by_you.review_text.second.contentBy',
						},
						reviewText: {
							type: 'TEXTAREA',
							text: '$label.reviewed_by_you.review_text.second.content',
						},
						rating: {
							type: 'SELECTBOX',
							value: '500',
						},
					},
				},
				{
					settings: {
						reviewedBy: {
							type: 'INPUTBOX',
							text: '$label.reviewed_by_you.review_text.third.contentBy',
						},
						reviewText: {
							type: 'TEXTAREA',
							text: '$label.reviewed_by_you.review_text.third.content',
						},
						rating: {
							type: 'SELECTBOX',
							value: '500',
						},
					},
				},
			],
		},
	},
	design: {
		section_title: {
			type: 'TEXT',
			visible: true,
		},
		reviewer_name: {
			type: 'TEXT',
			visible: true,
		},
		review_text: {
			type: 'TEXT',
			visible: true,
		},
		background: {
			type: 'BACKGROUND',
		},
	},
} as const
