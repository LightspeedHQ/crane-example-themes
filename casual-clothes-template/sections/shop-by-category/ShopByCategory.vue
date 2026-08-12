<template>
	<SectionWrapper :style="backgroundStyle">
		<SectionHeader
			:title="sectionTitle"
			:description="sectionDescription"
			:title-design="sectionTitleDesign as TextDesignData"
			:description-design="sectionDescriptionDesign as TextDesignData"
			:raw-title-design="rawDesign?.section_title"
			:raw-description-design="rawDesign?.section_description"
		>
		</SectionHeader>

		<!-- Empty State -->
		<EmptyState
			v-if="!categorySelectorContent.hasCategories"
			:title="t('$label.empty.title')"
			:message="t('$label.empty.message')"
		/>

		<!-- Categories Carousel -->
		<CategoriesCarousel
			v-else
			:categories="categorySelectorContent.categories"
			:category-text-design="categoryTextDesign as TextDesignData"
			:raw-category-text-design="rawDesign?.category_text"
			:current-language="currentLang"
		>
		</CategoriesCarousel>
	</SectionWrapper>
</template>

<script setup lang="ts">
import {
	useBackgroundElementDesign,
	useInputboxElementContent,
	useTextareaElementContent,
	useTextElementDesign,
	useCategorySelectorElementContent,
	useVueBaseProps,
} from '@lightspeed/crane'
import { Content, Design } from './type.ts'
import translations from './settings/translations'
import SectionWrapper from '../../shared/components/SectionWrapper.vue'
import CategoriesCarousel from './components/CategoriesCarousel.vue'
import SectionHeader from '../../shared/components/SectionHeader.vue'
import EmptyState from '../../shared/components/EmptyState.vue'
import { useTranslations } from '../../shared/composables'
import { useColorPresetVars } from '../../shared/composables/design'
import { createBackgroundVars } from '../../shared/utils/design-vars'
import { computed } from 'vue'

const { t, currentLang } = useTranslations(translations)
const categorySelectorContent = useCategorySelectorElementContent<Content>('shop_by_category')

const sectionTitle = useInputboxElementContent<Content>('section_title')
const sectionDescription = useTextareaElementContent<Content>('section_description')

const sectionTitleDesign = useTextElementDesign<Design>('section_title')
const sectionDescriptionDesign = useTextElementDesign<Design>('section_description')
const categoryTextDesign = useTextElementDesign<Design>('category_text')

const backgroundDesign = useBackgroundElementDesign<Design>('background') as BackgroundDesignData

const { design: rawDesign } = useVueBaseProps<unknown, Design>()
const colorPresetVars = useColorPresetVars(rawDesign)
const backgroundStyle = computed(() => ({
	...Object.fromEntries(createBackgroundVars('section', backgroundDesign, rawDesign.value?.background)),
	...colorPresetVars.value,
}))
</script>
