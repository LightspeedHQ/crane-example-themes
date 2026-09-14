<template>
	<section :aria-labelledby="labelledBy" :aria-label="label">
		<slot name="header" />
		<StorefrontToolbar
			v-if="showProducts !== false"
			:filters="filters"
			:model-value="listing.filters"
			:sort-by="listing.sortBy"
			:sort-options="sortOptions"
			:filter-labels="filterLabels"
			:filter-by-label="labels.filterByLabel"
			:minimum-price-label="labels.minimumPriceLabel"
			:maximum-price-label="labels.maximumPriceLabel"
			:result-label="labels.resultLabel"
			:sort-by-label="labels.sortByLabel"
			@update:model-value="emit('update:filters', $event)"
			@update:sort-by="emit('update:sort-by', $event)"
		/>
		<div v-if="refreshError" class="storefront-listing__refresh-error" role="alert">
			<span>{{ labels.refreshErrorLabel }}</span>
			<button type="button" @click="emit('retry')">{{ labels.retryLabel }}</button>
		</div>
		<div v-if="showProducts !== false" class="storefront-listing__grid-state" :aria-busy="isRefreshing">
			<StorefrontProductGrid
				v-if="products.length > 0"
				:products="products"
				:card-labels="cardLabels"
				:ribbon-enabled="ribbonEnabled"
				:rating-enabled="ratingEnabled"
				:product-text-visible="productTextVisible"
				:buy-now-button-visible="buyNowButtonVisible"
				:is-preview-mode="isPreviewMode"
			/>
			<p v-else class="storefront-listing__empty">{{ labels.emptyLabel }}</p>
			<span v-if="isRefreshing" class="storefront-listing__progress" aria-hidden="true" />
		</div>
		<StorefrontPagination
			v-if="showProducts !== false"
			:offset="listing.pagination.offset"
			:limit="listing.pagination.limit"
			:total="totalProducts"
			:previous-label="labels.previousLabel"
			:next-label="labels.nextLabel"
			:pagination-label="paginationLabel"
			@update:offset="emit('update:offset', $event)"
		/>
	</section>
</template>

<script setup lang="ts">
import type {
	StorefrontCatalogFilter,
	StorefrontCatalogProductSortOrder,
	StorefrontListingRequest,
	StorefrontProduct,
	StorefrontProductFilters,
} from '@lightspeed/ecom-headless'

import StorefrontPagination from './StorefrontPagination.vue'
import StorefrontProductGrid from './StorefrontProductGrid.vue'
import StorefrontToolbar from './StorefrontToolbar.vue'
import type {
	StorefrontFilterLabels,
	StorefrontListingLabels,
	StorefrontProductCardLabels,
	StorefrontSortOption,
} from './storefront-listing-types.ts'

withDefaults(defineProps<{
	filters: readonly StorefrontCatalogFilter[],
	listing: StorefrontListingRequest,
	products: readonly StorefrontProduct[],
	totalProducts: number,
	sortOptions: readonly StorefrontSortOption[],
	filterLabels: StorefrontFilterLabels,
	labels: StorefrontListingLabels,
	cardLabels: StorefrontProductCardLabels,
	paginationLabel: string,
	ribbonEnabled: boolean,
	ratingEnabled: boolean,
	productTextVisible: boolean,
	buyNowButtonVisible: boolean,
	isPreviewMode: boolean,
	isRefreshing: boolean,
	refreshError: boolean,
	showProducts?: boolean,
	labelledBy?: string,
	label?: string,
}>(), { showProducts: true })

const emit = defineEmits<{
	'update:filters': [value: StorefrontProductFilters],
	'update:sort-by': [value: StorefrontCatalogProductSortOrder],
	'update:offset': [value: number],
	'retry': [],
}>()
</script>

<style scoped lang="scss">
.storefront-listing__grid-state {
	position: relative;
	min-height: 240px;
	margin-top: 32px;
}

.storefront-listing__grid-state[aria-busy='true'] {
	opacity: 0.72;
}

.storefront-listing__progress {
	position: absolute;
	top: -2px;
	left: 0;
	width: 100%;
	height: 2px;
	background: currentcolor;
	animation: storefront-listing-progress 1s ease-in-out infinite alternate;
}

.storefront-listing__empty {
	display: grid;
	min-height: 320px;
	margin: 0;
	place-content: center;
	text-align: center;
}

.storefront-listing__refresh-error {
	display: flex;
	align-items: center;
	justify-content: space-between;
	padding: 12px 0;
	gap: 16px;
}

.storefront-listing__refresh-error button {
	padding: 0;
	border: 0;
	background: transparent;
	color: inherit;
	font: inherit;
	text-decoration: underline;
	cursor: pointer;
}

@keyframes storefront-listing-progress {
	from { transform: scaleX(0.2); }
	to { transform: scaleX(1); }
}

@media (prefers-reduced-motion: reduce) {
	.storefront-listing__progress {
		animation: none;
	}
}
</style>
