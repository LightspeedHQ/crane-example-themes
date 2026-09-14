<template>
	<main class="custom-catalog" :style="catalogStyle">
		<CatalogSkeleton v-if="isLoading" />
		<div v-else-if="error && !page" class="custom-catalog__state" role="alert">
			<p>{{ t('$label.load_error') }}</p>
			<button v-if="canRetry" type="button" @click="retry">{{ t('$label.retry') }}</button>
		</div>
		<template v-else-if="page && listing">
			<div class="custom-catalog__shell">
				<CatalogCategoryShowcase
					:categories="categories"
					:title="copy.categoryShowcaseTitle"
					:subtitle="copy.categoryShowcaseSubtitle"
					:title-visible="design.sectionTitle.visible !== false"
					:subtitle-visible="design.sectionSubtitle.visible !== false"
					:is-preview-mode="isPreviewMode"
				/>
				<StorefrontListingSection
					class="custom-catalog__products"
					:filters="availableFilters"
					:listing="listing"
					:products="products"
					:total-products="totalProducts"
					:sort-options="sortOptions"
					:filter-labels="filterLabels"
					:labels="listingLabels"
					:card-labels="cardLabels"
					:pagination-label="copy.productsTitle"
					:ribbon-enabled="design.productRibbon.enabled === true"
					:rating-enabled="design.productRating.enabled === true"
					:product-text-visible="design.productText.visible !== false"
					:buy-now-button-visible="design.buyNowButton.visible !== false"
					:is-preview-mode="isPreviewMode"
					:is-refreshing="isRefreshing"
					:refresh-error="Boolean(error)"
					:labelled-by="design.sectionTitle.visible !== false ? 'catalog-products-title' : undefined"
					:label="design.sectionTitle.visible === false ? copy.productsTitle : undefined"
					@update:filters="setFilters"
					@update:sort-by="setSortBy"
					@update:offset="setOffset"
					@retry="retry"
				>
					<template #header>
						<header class="custom-catalog__header">
							<h2
								v-show="design.sectionTitle.visible !== false"
								id="catalog-products-title"
							>{{ copy.productsTitle }}</h2>
							<p v-show="design.sectionSubtitle.visible !== false">{{ copy.productsSubtitle }}</p>
						</header>
					</template>
				</StorefrontListingSection>
			</div>
		</template>
	</main>
</template>

<script setup lang="ts">
import { toRef } from 'vue'

import { usePreviewMode } from '../../../../../shared/composables/crane/use-preview-mode.ts'
import StorefrontListingSection from '../../../../../shared/components/storefront-listing/StorefrontListingSection.vue'
import { useStorefrontListingPresentation } from '../../../../../shared/composables/storefront/use-storefront-listing-presentation.ts'
import CatalogCategoryShowcase from './components/CatalogCategoryShowcase.vue'
import CatalogSkeleton from './components/CatalogSkeleton.vue'
import { useCatalogPage } from './composables/use-catalog-page.ts'
import { useCatalogSectionSettings } from './composables/use-catalog-section-settings.ts'

const { isPreviewMode } = usePreviewMode()
const { t, copy, design, catalogStyle } = useCatalogSectionSettings()
const {
	page, availableFilters, listing, products, categories, totalProducts,
	isLoading, isRefreshing, error, canRetry, setFilters, setSortBy, setOffset, retry,
} = useCatalogPage()
const { filterLabels, sortOptions, cardLabels, listingLabels } = useStorefrontListingPresentation({
	t,
	buyNowLabel: toRef(copy, 'buyNowLabel'),
	listing,
	products,
	totalProducts,
})
</script>

<style lang="scss">
:host { display: block; width: 100%; max-width: none; min-width: 0; }
</style>

<style scoped lang="scss">
* { box-sizing: border-box; }
.custom-catalog {
	width: 100%;
	min-width: 0;
	background: var(--catalog-background, var(--bg-color, #fff));
	color: var(--fg-color, #191919);
	font-family: var(--body-font-family, var(--global-body-font-family-stack, Arial, sans-serif));
}
.custom-catalog__shell { width: 100%; max-width: 1440px; margin: 0 auto; }
.custom-catalog__products { padding: 64px 16px 96px; }
.custom-catalog__header { display: grid; margin-bottom: 32px; gap: 24px; }
.custom-catalog__header h2,
.custom-catalog__header p { margin: 0; }
.custom-catalog__header h2 {
	font: var(--section-title-font-style, normal) var(--section-title-font-weight, 400)
		var(--section-title-font-size, 32px)/1.5 var(--section-title-font-family, var(--heading-font-family, inherit));
	color: var(--section-title-color, var(--fg-color, #191919));
}
.custom-catalog__header p {
	font: var(--section-subtitle-font-style, normal) var(--section-subtitle-font-weight, 400)
		var(--section-subtitle-font-size, 16px)/1.5 var(--section-subtitle-font-family, var(--body-font-family, inherit));
	color: var(--section-subtitle-color, var(--fg-color, #191919));
}
.custom-catalog__state { display: grid; min-height: 320px; margin: 0; place-content: center; text-align: center; }
.custom-catalog__state button { justify-self: center; padding: 10px 18px; }
</style>
