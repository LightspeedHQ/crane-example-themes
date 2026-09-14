<template>
	<section
		v-if="products.length"
		class="related-products"
		:style="sectionStyle"
		aria-labelledby="atelier-related-products-title"
	>
		<div class="related-products__shell">
			<header class="related-products__header">
				<h2
					id="atelier-related-products-title"
					v-show="titleDesign.visible !== false"
					class="related-products__title"
				>
					{{ title }}
				</h2>
				<p
					v-show="subtitleDesign.visible !== false"
					class="related-products__subtitle"
				>
					{{ subtitle }}
				</p>
			</header>

			<RelatedProductsCarousel
				:products="products"
				:region-label="title"
				:previous-label="t('$label.related_products_previous')"
				:next-label="t('$label.related_products_next')"
				:rating-of-five-label="t('$label.related_products_rating_of_five')"
				:reviews-label="t('$label.related_products_reviews')"
				:ribbon-enabled="ribbonDesign.enabled === true"
				:name-price-visible="namePriceDesign.visible !== false"
				:rating-visible="ratingDesign.visible !== false"
				:is-preview-mode="isPreviewMode"
			/>
		</div>
	</section>
</template>

<script setup lang="ts">
import {
	useBackgroundElementDesign,
	useInputboxElementContent,
	useTextElementDesign,
	useToggleElementDesign,
	useVueBaseProps,
} from '@lightspeed/crane'
import { computed } from 'vue'

import type { Content, Design } from '../../type.ts'
import translations from '../../settings/translations.ts'
import { usePreviewMode } from '../../../../../shared/composables/crane/use-preview-mode.ts'
import { useTranslations } from '../../../../../shared/composables/crane/use-translations.ts'
import { useColorPresetVars } from '../../../../../shared/composables/design/use-color-preset.ts'
import { createBackgroundVars, createTextVars } from '../../../../../shared/utils/design-vars.ts'
import RelatedProductsCarousel from './components/RelatedProductsCarousel.vue'
import { useRelatedProducts } from './use-related-products.ts'

const { t } = useTranslations(translations)
const { isPreviewMode } = usePreviewMode()
const { products } = useRelatedProducts()
const { design: rawDesign } = useVueBaseProps<Content, Design>()
const titleContent = useInputboxElementContent<Content>('related_products_title')
const subtitleContent = useInputboxElementContent<Content>('related_products_subtitle')
const title = computed(() => titleContent.value || t('$label.related_products_title'))
const subtitle = computed(() => subtitleContent.value || t('$label.related_products_subtitle'))
const backgroundDesign = useBackgroundElementDesign<Design>('related_products_background') as BackgroundDesignData
const titleDesign = useTextElementDesign<Design>('related_products_title') as TextDesignData
const subtitleDesign = useTextElementDesign<Design>('related_products_subtitle') as TextDesignData
const namePriceDesign = useTextElementDesign<Design>('related_product_name_price') as TextDesignData
const ratingDesign = useTextElementDesign<Design>('related_product_rating') as TextDesignData
const ribbonDesign = useToggleElementDesign<Design>('related_product_ribbon') as ToggleDesignData
const colorPresetVars = useColorPresetVars(rawDesign)

const sectionStyle = computed(() => Object.fromEntries([
	...createBackgroundVars(
		'related-products',
		backgroundDesign,
		rawDesign.value.related_products_background,
	),
	...createTextVars(
		'related-products-title',
		titleDesign,
		rawDesign.value.related_products_title,
	),
	...createTextVars(
		'related-products-subtitle',
		subtitleDesign,
		rawDesign.value.related_products_subtitle,
	),
	...createTextVars(
		'related-product-name-price',
		namePriceDesign,
		rawDesign.value.related_product_name_price,
	),
	...createTextVars(
		'related-product-rating',
		ratingDesign,
		rawDesign.value.related_product_rating,
	),
	...Object.entries(colorPresetVars.value),
]))
</script>

<style lang="scss" src="./related-products-host.scss"></style>
<style scoped lang="scss" src="./related-products.scss"></style>
