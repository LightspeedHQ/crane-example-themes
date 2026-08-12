export default {
	showcaseId: '1',
	previewImage: {
		set: {
			ORIGINAL: {
				url: 'example_footer_showcase_1_preview.png',
			},
		},
	},
	blockName: '$label.clothes_footer.blockName',
	content: {
		linksGroupAccountTitle: {
			type: 'INPUTBOX',
			text: '$label.linksGroupAccountTitle.text',
		},
		linksGroupAccount: {
			type: 'DECK',
			cards: [
				{
					settings: {
						buttonLink: {
							type: 'BUTTON',
							title: '$label.linksGroupAccount.signIn.title',
							link: 'https://www.example.com',
							buttonType: 'HYPER_LINK',
						},
					},
				},
				{
					settings: {
						buttonLink: {
							type: 'BUTTON',
							title: '$label.linksGroupAccount.myOrders.title',
							link: 'https://www.example.com',
							buttonType: 'HYPER_LINK',
						},
					},
				},
				{
					settings: {
						buttonLink: {
							type: 'BUTTON',
							title: '$label.linksGroupAccount.loyaltyProgram.title',
							link: 'https://www.example.com',
							buttonType: 'HYPER_LINK',
						},
					},
				},
				{
					settings: {
						buttonLink: {
							type: 'BUTTON',
							title: '$label.linksGroupAccount.wishlist.title',
							link: 'https://www.example.com',
							buttonType: 'HYPER_LINK',
						},
					},
				},
			],
		},
		linksGroupCustomerCareTitle: {
			type: 'INPUTBOX',
			text: '$label.linksGroupCustomerCareTitle.text',
		},
		linksGroupCustomerCare: {
			type: 'DECK',
			cards: [
				{
					settings: {
						buttonLink: {
							type: 'BUTTON',
							title: '$label.linksGroupCustomerCare.contactUs.title',
							link: 'https://www.example.com',
							buttonType: 'HYPER_LINK',
						},
					},
				},
				{
					settings: {
						buttonLink: {
							type: 'BUTTON',
							title: '$label.linksGroupCustomerCare.orderTracking.title',
							link: 'https://www.example.com',
							buttonType: 'HYPER_LINK',
						},
					},
				},
				{
					settings: {
						buttonLink: {
							type: 'BUTTON',
							title: '$label.linksGroupCustomerCare.shippingInfo.title',
							link: 'https://www.example.com',
							buttonType: 'HYPER_LINK',
						},
					},
				},
				{
					settings: {
						buttonLink: {
							type: 'BUTTON',
							title: '$label.linksGroupCustomerCare.returnsAndExchanges.title',
							link: 'https://www.example.com',
							buttonType: 'HYPER_LINK',
						},
					},
				},
			],
		},
		linksGroupCompanyTitle: {
			type: 'INPUTBOX',
			text: '$label.linksGroupCompanyTitle.text',
		},
		linksGroupCompanyCare: {
			type: 'DECK',
			cards: [
				{
					settings: {
						buttonLink: {
							type: 'BUTTON',
							title: '$label.linksGroupCompanyCare.aboutUs.title',
							link: 'https://www.example.com',
							buttonType: 'HYPER_LINK',
						},
					},
				},
				{
					settings: {
						buttonLink: {
							type: 'BUTTON',
							title: '$label.linksGroupCompanyCare.storeLocator.title',
							link: 'https://www.example.com',
							buttonType: 'HYPER_LINK',
						},
					},
				},
				{
					settings: {
						buttonLink: {
							type: 'BUTTON',
							title: '$label.linksGroupCompanyCare.Careers.title',
							link: 'https://www.example.com',
							buttonType: 'HYPER_LINK',
						},
					},
				},
				{
					settings: {
						buttonLink: {
							type: 'BUTTON',
							title: '$label.linksGroupCompanyCare.sustainability.title',
							link: 'https://www.example.com',
							buttonType: 'HYPER_LINK',
						},
					},
				},
			],
		},
		contactUsTitle: {
			type: 'INPUTBOX',
			text: '$label.contactUsTitle.text',
		},
		contactUsTelephone: {
			type: 'BUTTON',
			title: '$label.contactUsTelephone.title',
			phone: '+1000000000',
			buttonType: 'TEL_LINK',
		},
		contactUsMail: {
			type: 'BUTTON',
			title: '$label.contactUsMail.title',
			email: 'example@gmail.com',
			buttonType: 'MAIL_LINK',
		},
		copyrightNotice: {
			type: 'INPUTBOX',
			text: '$label.copyrightNotice.section_title',
		},
		legalAndTechnicalLinks: {
			type: 'DECK',
			cards: [
				{
					settings: {
						buttonLink: {
							type: 'BUTTON',
							title: '$label.legalAndTechnicalLinks.reportAbuse.title',
							link: 'https://www.example.com',
							buttonType: 'HYPER_LINK',
						},
					},
				},
				{
					settings: {
						buttonLink: {
							type: 'BUTTON',
							title: '$label.legalAndTechnicalLinks.termsOfService.title',
							link: 'https://www.example.com',
							buttonType: 'HYPER_LINK',
						},
					},
				},
			],
		},
		socialMediaLinks: {
			type: 'DECK',
			cards: [
				{
					settings: {
						socialMediaIcons: {
							type: 'SELECTBOX',
							value: 'https://x.com/',
						},
						siteName: {
							type: 'INPUTBOX',
							text: '$label.siteName.x.text',
						},
					},
				},
				{
					settings: {
						socialMediaIcons: {
							type: 'SELECTBOX',
							value: 'https://www.facebook.com/',
						},
						siteName: {
							type: 'INPUTBOX',
							text: '$label.siteName.facebook.text',
						},
					},
				},
				{
					settings: {
						socialMediaIcons: {
							type: 'SELECTBOX',
							value: 'https://www.instagram.com/',
						},
						siteName: {
							type: 'INPUTBOX',
							text: '$label.siteName.instagram.text',
						},
					},
				},
				{
					settings: {
						socialMediaIcons: {
							type: 'SELECTBOX',
							value: 'https://www.tiktok.com/discover/',
						},
						siteName: {
							type: 'INPUTBOX',
							text: '$label.siteName.tiktok.text',
						},
					},
				},
			],
		},
		footer_image: {
			type: 'IMAGE',
			imageData: {
				set: {
					MOBILE_WEBP_LOW_RES: {
						url: 'footerImage.png',
					},
					MOBILE_WEBP_HI_RES: {
						url: 'footerImage.png',
					},
					WEBP_LOW_RES: {
						url: 'footerImage.png',
					},
					WEBP_HI_2X_RES: {
						url: 'footerImage.png',
					},
				},
				borderInfo: {},
			},
		},
		footer_text: {
			type: 'INPUTBOX',
			text: '$label.footer_text.text',
		},
	},
	design: {
		title: {
			type: 'TEXT',
			bold: true,
			visible: true,
		},
		link: {
			type: 'TEXT',
			visible: true,
		},
		footer_text: {
			type: 'TEXT',
			bold: false,
			italic: false,
			visible: true,
		},
		background: {
			type: 'BACKGROUND',
		},
		isLinksGroup: {
			type: 'TOGGLE',
			enabled: true,
		},
		isContactUs: {
			type: 'TOGGLE',
			enabled: true,
		},
		isLegalAndTechnicalLinks: {
			type: 'TOGGLE',
			enabled: true,
		},
		isSocialMediaLinks: {
			type: 'TOGGLE',
			enabled: true,
		},
		isFooterImageAndText: {
			type: 'TOGGLE',
			enabled: true,
		},
	},
} as const
