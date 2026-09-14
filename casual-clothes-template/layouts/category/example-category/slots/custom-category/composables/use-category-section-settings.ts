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

export function useCategorySectionSettings() {
	const { t } = useTranslations(translations)
	const { design: rawDesign } = useVueBaseProps<Content, Design>()
	const buyNowContent = useInputboxElementContent<Content>('buy_now_label')
	const copy = reactive({
		buyNowLabel: computed(() => buyNowContent.value?.trim() || t('$label.buy_now')),
	})
	const design = {
		background: useBackgroundElementDesign<Design>('background') as BackgroundDesignData,
		categoryTitle: useTextElementDesign<Design>('category_title') as TextDesignData,
		categoryDescription: useTextElementDesign<Design>('category_description') as TextDesignData,
		productText: useTextElementDesign<Design>('product_text') as TextDesignData,
		buyNowButton: useButtonElementDesign<Design>('buy_now_button') as ButtonDesignData,
		productRibbon: useToggleElementDesign<Design>('product_ribbon') as ToggleDesignData,
		productRating: useToggleElementDesign<Design>('product_rating') as ToggleDesignData,
	}
	// The local workspace links Crane against a second Vue copy; keep the compatibility cast at this boundary.
	const colorPresetVars = useColorPresetVars(rawDesign as unknown as Ref<unknown>)
	const categoryStyle = computed(() => Object.fromEntries([
		...createBackgroundVars('category', design.background, rawDesign.value.background),
		...createTextVars('category-title', design.categoryTitle, rawDesign.value.category_title),
		...createTextVars(
			'category-description',
			design.categoryDescription,
			rawDesign.value.category_description,
		),
		...createTextVars('product-text', design.productText, rawDesign.value.product_text),
		...createButtonVars('buy-now-button', design.buyNowButton, rawDesign.value.buy_now_button),
		...Object.entries(colorPresetVars.value),
	]))

	return {
		t,
		copy,
		design,
		categoryStyle,
	}
}
