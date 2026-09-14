import {
	useBackgroundElementDesign,
	useButtonElementDesign,
	useInputboxElementContent,
	useTextElementDesign,
	useToggleElementDesign,
	useVueBaseProps,
} from '@lightspeed/crane'
import { computed, reactive, type Ref } from 'vue'

import type { Content, Design } from '../../../type.ts'
import translations from '../../../settings/translations.ts'
import { useTranslations } from '../../../../../../shared/composables/crane/use-translations.ts'
import { useColorPresetVars } from '../../../../../../shared/composables/design/use-color-preset.ts'
import {
	createBackgroundVars,
	createButtonVars,
	createTextVars,
} from '../../../../../../shared/utils/design-vars.ts'

export function useCatalogSectionSettings() {
	const { t } = useTranslations(translations)
	const { design: rawDesign } = useVueBaseProps<Content, Design>()
	const localizedContent = (elementName: keyof Content, fallbackTranslationKey: string) => {
		const content = useInputboxElementContent<Content>(elementName)
		return computed(() => content.value?.trim() || t(fallbackTranslationKey))
	}

	const copy = reactive({
		categoryShowcaseTitle: localizedContent('category_showcase_title', '$label.category_showcase_title'),
		categoryShowcaseSubtitle: localizedContent(
			'category_showcase_subtitle',
			'$label.category_showcase_subtitle',
		),
		productsTitle: localizedContent('products_title', '$label.products_title'),
		productsSubtitle: localizedContent('products_subtitle', '$label.products_subtitle'),
		buyNowLabel: localizedContent('buy_now_label', '$label.buy_now'),
	})

	const design = {
		background: useBackgroundElementDesign<Design>('background') as BackgroundDesignData,
		sectionTitle: useTextElementDesign<Design>('section_title') as TextDesignData,
		sectionSubtitle: useTextElementDesign<Design>('section_subtitle') as TextDesignData,
		productText: useTextElementDesign<Design>('product_text') as TextDesignData,
		buyNowButton: useButtonElementDesign<Design>('buy_now_button') as ButtonDesignData,
		productRibbon: useToggleElementDesign<Design>('product_ribbon') as ToggleDesignData,
		productRating: useToggleElementDesign<Design>('product_rating') as ToggleDesignData,
	}
	// The local workspace links Crane against a second Vue copy; keep the compatibility cast at this boundary.
	const colorPresetVars = useColorPresetVars(rawDesign as unknown as Ref<unknown>)
	const catalogStyle = computed(() => Object.fromEntries([
		...createBackgroundVars('catalog', design.background, rawDesign.value.background),
		...createTextVars('section-title', design.sectionTitle, rawDesign.value.section_title),
		...createTextVars('section-subtitle', design.sectionSubtitle, rawDesign.value.section_subtitle),
		...createTextVars('product-text', design.productText, rawDesign.value.product_text),
		...createButtonVars('buy-now-button', design.buyNowButton, rawDesign.value.buy_now_button),
		...Object.entries(colorPresetVars.value),
	]))

	return {
		t,
		copy,
		design,
		catalogStyle,
	}
}
