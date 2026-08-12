import { TemplateCategoriesList, template } from '@lightspeed/crane-api'

export default template.configuration({
	metadata: {
		name: 'Atelier',
		description: 'Apparel · Neutral · Modern',
		categories: [TemplateCategoriesList.apparel_footwear],
		preview_url: 'https://atelier-template.company.site/',
		cover_image: {
			set: {
				ORIGINAL: {
					url: 'template_cover_image.png',
				},
			},
		},
	},
	header: {
		type: 'custom',
		id: 'store-header',
	},
	footer: {
		type: 'custom',
		id: 'clothes-footer',
	},
	styleId: 'theme-atelier-casual-clothes-001',
	globalSettings: {
		colorPalette: {
			colorA: '#FFFFFF',
			colorB: '#F0EDE5',
			colorC: '#FFFFFF',
			colorD: '#000000',
			colorE: '#767676',
			colorF: '#000000',
		},
		cornerRadius: 'sharp',
		fonts: {
			fontPair: {
				headingFont: 'inter',
				headingFontStyle: 'regular',
				bodyFont: 'inter',
				bodyFontStyle: 'regular',
			},
			general: {
				heading1: { fontSize: 36 },
				heading2: { fontSize: 32 },
				heading3: { fontSize: 24 },
				heading4: { fontSize: 20 },
				body1: { fontSize: 18 },
				body2: { fontSize: 16 },
				body3: { fontSize: 14 },
				body4: { fontSize: 12 },
			},
		},
		alignment: 'center',
		pageLayout: {
			contentWidth: 1128,
		},
	},
})
