<template>
	<SectionWrapper :style="backgroundStyle">
		<SectionHeader
			:title="sectionTitle"
			:description="sectionDescription"
			:title-design="sectionTitleDesign"
			:description-design="sectionDescriptionDesign"
			:raw-title-design="rawDesign?.section_title"
			:raw-description-design="rawDesign?.section_description"
		/>

		<!-- Empty State -->
		<EmptyState
			v-if="!productSelectorContent.hasProducts"
			:title="t('$label.empty.title')"
			:message="t('$label.empty.message')"
		/>

		<!-- Products grid -->
		<ProductsGrid
			v-else
			:products="orderedProducts"
		/>
	</SectionWrapper>
</template>

<script setup lang="ts">
import {
	useInputboxElementContent,
	useBackgroundElementDesign,
	useTextElementDesign,
	useProductSelectorElementContent,
	useVueBaseProps,
} from '@lightspeed/crane'
import type { Content, Design } from './type'
import translations from './settings/translations'
import SectionWrapper from '../../shared/components/SectionWrapper.vue'
import SectionHeader from '../../shared/components/SectionHeader.vue'
import EmptyState from '../../shared/components/EmptyState.vue'
import { useTranslations, useOrderedSelectorProducts } from '../../shared/composables'
import { useColorPresetVars } from '../../shared/composables/design'
import { createBackgroundVars } from '../../shared/utils/design-vars'
import ProductsGrid from './components/ProductsGrid.vue'
import { computed } from 'vue'

const { t } = useTranslations(translations)
const productSelectorContent = useProductSelectorElementContent<Content>('featured_products')

const orderedProducts = useOrderedSelectorProducts(productSelectorContent, 'featured_products')

const sectionTitle = useInputboxElementContent<Content>('section_title')
const sectionDescription = useInputboxElementContent<Content>('section_description')

const backgroundDesign = useBackgroundElementDesign<Design>('background') as BackgroundDesignData

const sectionTitleDesign = useTextElementDesign<Design>('section_title') as TextDesignData
const sectionDescriptionDesign = useTextElementDesign<Design>('section_description') as TextDesignData

const { design: rawDesign } = useVueBaseProps<unknown, Design>()
const colorPresetVars = useColorPresetVars(rawDesign)
const backgroundStyle = computed(() => ({
	...Object.fromEntries(createBackgroundVars('section', backgroundDesign, rawDesign.value?.background)),
	...colorPresetVars.value,
}))
</script>
