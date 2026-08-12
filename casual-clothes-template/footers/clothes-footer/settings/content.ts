export default {
	linksGroupAccountTitle: {
		type: 'INPUTBOX',
		label: '$label.linksGroupAccountTitle.label',
		placeholder: '$label.linksGroupAccountTitle.placeholder',
	},
	linksGroupAccount: {
		type: 'DECK',
		label: '$label.linksGroup.deck_title',
		addButtonLabel: '$label.linksGroup.add_card_button',
		maxCards: 4,
		cards: {
			defaultCardContent: {
				label: '$label.linksGroupAccount.card_title',
				settings: {
					buttonLink: {
						type: 'BUTTON',
						label: '$label.linksGroup.linkButton.label',
						defaults: {
							title: '$label.linksGroup.linkButton.title',
							buttonType: 'HYPER_LINK',
							link: 'https://www.example.com',
						},
					},
				},
			},
		},
	},
	divider1: {
		type: 'DIVIDER',
		label: '$label.divider.label',
	},
	linksGroupCustomerCareTitle: {
		type: 'INPUTBOX',
		label: '$label.linksGroupCustomerCareTitle.label',
		placeholder: '$label.linksGroupCustomerCareTitle.placeholder',
	},
	linksGroupCustomerCare: {
		type: 'DECK',
		label: '$label.linksGroupCustomerCare.deck_title',
		addButtonLabel: '$label.linksGroup.add_card_button',
		maxCards: 4,
		cards: {
			defaultCardContent: {
				label: '$label.linksGroupAccount.card_title',
				settings: {
					buttonLink: {
						type: 'BUTTON',
						label: '$label.linksGroup.linkButton.label',
						defaults: {
							title: '$label.linksGroup.linkButton.title',
							buttonType: 'HYPER_LINK',
							link: 'https://www.example.com',
						},
					},
				},
			},
		},
	},
	divider2: {
		type: 'DIVIDER',
		label: '$label.divider.label',
	},
	linksGroupCompanyTitle: {
		type: 'INPUTBOX',
		label: '$label.linksGroupCompanyTitle.label',
		placeholder: '$label.linksGroupCompanyTitle.placeholder',
	},
	linksGroupCompanyCare: {
		type: 'DECK',
		label: '$label.linksGroupCompanyCare.deck_title',
		addButtonLabel: '$label.linksGroup.add_card_button',
		maxCards: 4,
		cards: {
			defaultCardContent: {
				label: '$label.linksGroupAccount.card_title',
				settings: {
					buttonLink: {
						type: 'BUTTON',
						label: '$label.linksGroup.linkButton.label',
						defaults: {
							title: '$label.linksGroup.linkButton.title',
							buttonType: 'HYPER_LINK',
							link: 'https://www.example.com',
						},
					},
				},
			},
		},
	},
	divider3: {
		type: 'DIVIDER',
		label: '$label.divider.label',
	},
	contactUsTitle: {
		type: 'INPUTBOX',
		label: '$label.contactUsTitle.label',
		placeholder: '$label.contactUsTitle.placeholder',
	},
	contactUsTelephone: {
		type: 'BUTTON',
		label: '$label.contactUsTelephone.label',
		defaults: {
			title: '$label.contactUsTelephone.default',
			buttonType: 'TEL_LINK',
			phone: '+1 (555) 000-0000',
		},
	},
	contactUsMail: {
		type: 'BUTTON',
		label: '$label.contactUsMail.label',
		defaults: {
			title: '$label.contactUsMail.title',
			buttonType: 'MAIL_LINK',
			email: 'hello@example.com',
		},
	},
	copyrightNotice:{
		type: 'INPUTBOX',
		label: '$label.copyrightNotice.label',
		placeholder: '$label.copyrightNotice.placeholder',
	},
	divider4: {
		type: 'DIVIDER',
		label: '$label.divider.label',
	},
	legalAndTechnicalLinks: {
		type: 'DECK',
		label: '$label.legalAndTechnicalLinks.deck_title',
		addButtonLabel: '$label.legalAndTechnicalLinks.add_card_button',
		maxCards: 3,
		cards: {
			defaultCardContent: {
				label: '$label.legalAndTechnicalLinks.card_title',
				settings: {
					buttonLink: {
						type: 'BUTTON',
						label: '$label.legalAndTechnicalLinks.linkButton.label',
						defaults: {
							title: '$label.legalAndTechnicalLinks.linkButton.title',
							buttonType: 'HYPER_LINK',
							link: 'https://www.example.com',
						},
					},
				},
			},
		},
	},
	divider5: {
		type: 'DIVIDER',
		label: '$label.divider.label',
	},
	socialMediaLinks: {
		type: 'DECK',
		label: '$label.socialMediaLinks.deck_title',
		addButtonLabel: '$label.socialMediaLinks.add_card_button',
		maxCards: 6,
		cards: {
			defaultCardContent: {
				label: '$label.socialMediaLinks.card_title',
				settings: {
					socialMediaIcons: {
						type: 'SELECTBOX',
						placeholder: '$label.socialMediaIcons.placeholder',
						label: '$label.socialMediaIcons.label',
						description: '$label.socialMediaIcons.description',
						options: [
							{ label: '$label.x.label', value: 'https://x.com/' },
							{ label: '$label.facebook.label', value: 'https://www.facebook.com/' },
							{ label: '$label.instagram.label', value: 'https://www.instagram.com/' },
							{ label: '$label.tiktok.label', value: 'https://www.tiktok.com/discover/' },
						],
					},
					siteName:{
						type: 'INPUTBOX',
						label: '$label.siteName.label',
						placeholder: '$label.siteName.placeholder',
					},
				},
			},
		},
	},
	divider6: {
		type: 'DIVIDER',
		label: '$label.divider.label',
	},
	footer_image: {
		type: 'IMAGE',
		label: '$label.footer_image.label',
	},
	footer_text:{
		type: 'INPUTBOX',
		label: '$label.footer_text.label',
		placeholder: '$label.footer_text.placeholder',
	},
} as const