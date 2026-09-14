<template>
	<main class="custom-category" :style="categoryStyle">
		<CategorySkeleton v-if="isLoading" />
		<div v-else-if="(error && !page) || isCategoryMissing" class="custom-category__state" role="alert">
			<p>{{ t('$label.load_error') }}</p>
			<button v-if="canRetry" type="button" @click="retry">{{ t('$label.retry') }}</button>
		</div>
		<StorefrontListingSection
			v-else-if="page && listing && categoryListing"
			class="custom-category__shell"
			:filters="availableFilters"
			:listing="listing"
			:products="products"
			:total-products="totalProducts"
			:show-products="showProducts"
			:sort-options="sortOptions"
			:filter-labels="filterLabels"
			:labels="listingLabels"
			:card-labels="cardLabels"
			:pagination-label="categoryListing.category.name"
			:ribbon-enabled="design.productRibbon.enabled === true"
			:rating-enabled="design.productRating.enabled === true"
			:product-text-visible="design.productText.visible !== false"
			:buy-now-button-visible="design.buyNowButton.visible !== false"
			:is-preview-mode="isPreviewMode"
			:is-refreshing="isRefreshing"
			:refresh-error="Boolean(error)"
			:labelled-by="design.categoryTitle.visible !== false ? 'category-page-title' : undefined"
			:label="design.categoryTitle.visible === false ? categoryListing.category.name : undefined"
			@update:filters="setFilters"
			@update:sort-by="setSortBy"
			@update:offset="setOffset"
			@retry="retry"
		>
			<template #header>
				<header class="custom-category__header">
					<h1
						v-show="design.categoryTitle.visible !== false"
						id="category-page-title"
					>{{ categoryListing.category.name }}</h1>
					<p
						v-if="categoryDescription"
						v-show="design.categoryDescription.visible !== false"
					>{{ categoryDescription }}</p>
				</header>
				<CategorySubcategories
					:categories="subcategories"
					:label="t('$label.categories')"
					:is-preview-mode="isPreviewMode"
				/>
			</template>
		</StorefrontListingSection>
	</main>
</template>

<script setup lang="ts">
import { computed, toRef } from 'vue'

import { usePreviewMode } from '../../../../../shared/composables/crane/use-preview-mode.ts'
import StorefrontListingSection from '../../../../../shared/components/storefront-listing/StorefrontListingSection.vue'
import { useStorefrontListingPresentation } from '../../../../../shared/composables/storefront/use-storefront-listing-presentation.ts'
import CategorySkeleton from './components/CategorySkeleton.vue'
import CategorySubcategories from './components/CategorySubcategories.vue'
import { useCategoryPage } from './composables/use-category-page.ts'
import { useCategorySectionSettings } from './composables/use-category-section-settings.ts'
import { getCategoryDescriptionText } from './utils/category-description.ts'

const { isPreviewMode } = usePreviewMode()
const { t, copy, design, categoryStyle } = useCategorySectionSettings()
const {
	page, categoryListing, isCategoryMissing, availableFilters, listing, products, totalProducts,
	subcategories, showProducts,
	isLoading, isRefreshing, error, canRetry, setFilters, setSortBy, setOffset, retry,
} = useCategoryPage()
const categoryDescription = computed(() => getCategoryDescriptionText(
	categoryListing.value?.category.description ?? '',
))
const { filterLabels, sortOptions, cardLabels, listingLabels } = useStorefrontListingPresentation({
	t,
	buyNowLabel: toRef(copy, 'buyNowLabel'),
	listing,
	products,
	totalProducts,
})
</script>

<style scoped lang="scss" src="./custom-category.scss" />
