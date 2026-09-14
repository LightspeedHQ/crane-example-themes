import {
	useBackgroundElementDesign,
	useButtonElementDesign,
	useInputboxElementContent,
	useTextElementDesign,
	useToggleElementDesign,
	useVueBaseProps,
} from '@lightspeed/crane'
import { computed, reactive } from 'vue'

import type { Content, Design } from '../../../type.ts'
import translations from '../../../settings/translations.ts'
import { useTranslations } from '../../../../../../shared/composables/crane/use-translations.ts'
import { useColorPresetVars } from '../../../../../../shared/composables/design/use-color-preset.ts'
import {
	createBackgroundVars,
	createButtonVars,
	createTextVars,
} from '../../../../../../shared/utils/design-vars.ts'

export function useProductSectionSettings() {
	const { t } = useTranslations(translations)
	const { design: rawDesign } = useVueBaseProps<Content, Design>()

	const contentText = (value: string | undefined, fallbackTranslationKey: string) => (
		value?.trim() || t(fallbackTranslationKey)
	)
	const localizedContent = (elementName: keyof Content, fallbackTranslationKey: string) => {
		const content = useInputboxElementContent<Content>(elementName)
		return computed(() => contentText(content.value, fallbackTranslationKey))
	}

	const labels = reactive({
		catalog: localizedContent('catalog_label', '$label.catalog'),
		quantity: localizedContent('quantity_label', '$label.quantity'),
		addToCart: localizedContent('add_to_cart_label', '$label.add_to_cart'),
		adding: localizedContent('adding_label', '$label.adding'),
		added: localizedContent('added_label', '$label.added'),
		outOfStock: localizedContent('out_of_stock_label', '$label.out_of_stock'),
		productDetails: localizedContent('product_details_label', '$label.product_details'),
		readMore: localizedContent('read_more_label', '$label.read_more'),
		readLess: localizedContent('read_less_label', '$label.read_less'),
		share: localizedContent('share_label', '$label.share'),
	})

	const design = {
		background: useBackgroundElementDesign<Design>('background') as BackgroundDesignData,
		galleryNavigation: useToggleElementDesign<Design>('gallery_navigation') as ToggleDesignData,
		favoriteButton: useToggleElementDesign<Design>('favorite_button') as ToggleDesignData,
		breadcrumbs: useTextElementDesign<Design>('breadcrumbs') as TextDesignData,
		productTitle: useTextElementDesign<Design>('product_title') as TextDesignData,
		productSubtitle: useTextElementDesign<Design>('product_subtitle') as TextDesignData,
		productPrice: useTextElementDesign<Design>('product_price') as TextDesignData,
		productComparePrice: useTextElementDesign<Design>('product_compare_price') as TextDesignData,
		productOptionLabels: useTextElementDesign<Design>('product_option_labels') as TextDesignData,
		quantity: useTextElementDesign<Design>('quantity') as TextDesignData,
		productDetails: useTextElementDesign<Design>('product_details') as TextDesignData,
		productSku: useToggleElementDesign<Design>('product_sku') as ToggleDesignData,
		productStock: useToggleElementDesign<Design>('product_stock') as ToggleDesignData,
		productAttributes: useToggleElementDesign<Design>('product_attributes') as ToggleDesignData,
		productDescription: useToggleElementDesign<Design>('product_description') as ToggleDesignData,
		share: useTextElementDesign<Design>('share') as TextDesignData,
		addToCart: useButtonElementDesign<Design>('add_to_cart'),
	}
	const colorPresetVars = useColorPresetVars(rawDesign)

	const sectionStyle = computed(() => Object.fromEntries([
		...createBackgroundVars('product-section', design.background, rawDesign.value.background),
		...createTextVars('breadcrumbs', design.breadcrumbs, rawDesign.value.breadcrumbs),
		...createTextVars('product-title', design.productTitle, rawDesign.value.product_title),
		...createTextVars('product-subtitle', design.productSubtitle, rawDesign.value.product_subtitle),
		...createTextVars('product-price', design.productPrice, rawDesign.value.product_price),
		...createTextVars(
			'product-compare-price',
			design.productComparePrice,
			rawDesign.value.product_compare_price,
		),
		...createTextVars(
			'product-option-labels',
			design.productOptionLabels,
			rawDesign.value.product_option_labels,
		),
		...createTextVars('quantity', design.quantity, rawDesign.value.quantity),
		...createTextVars('product-details', design.productDetails, rawDesign.value.product_details),
		...createTextVars('share', design.share, rawDesign.value.share),
		...createButtonVars('add-to-cart', design.addToCart, rawDesign.value.add_to_cart),
		...Object.entries(colorPresetVars.value),
	]))

	return {
		t,
		labels,
		design,
		sectionStyle,
	}
}
