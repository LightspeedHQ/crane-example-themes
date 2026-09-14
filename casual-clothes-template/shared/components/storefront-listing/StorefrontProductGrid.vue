<template>
	<div class="product-grid">
		<StorefrontProductCard
			v-for="product in products"
			:key="product.id"
			:product="product"
			v-bind="cardLabels"
			:ribbon-enabled="ribbonEnabled"
			:rating-enabled="ratingEnabled"
			:product-text-visible="productTextVisible"
			:buy-now-button-visible="buyNowButtonVisible"
			:is-preview-mode="isPreviewMode"
		/>
	</div>
</template>

<script setup lang="ts">
import type { StorefrontProduct } from '@lightspeed/ecom-headless'

import StorefrontProductCard from './StorefrontProductCard.vue'
import type { StorefrontProductCardLabels } from './storefront-listing-types.ts'

defineProps<{
	products: readonly StorefrontProduct[],
	cardLabels: StorefrontProductCardLabels,
	ribbonEnabled: boolean,
	ratingEnabled: boolean,
	productTextVisible: boolean,
	buyNowButtonVisible: boolean,
	isPreviewMode: boolean,
}>()
</script>

<style scoped>
.product-grid { display: grid; grid-template-columns: repeat(4, minmax(0, 1fr)); gap: 32px 16px; }
@media (max-width: 900px) { .product-grid { grid-template-columns: repeat(2, minmax(0, 1fr)); } }
@media (max-width: 520px) { .product-grid { grid-template-columns: 1fr; } }
</style>
