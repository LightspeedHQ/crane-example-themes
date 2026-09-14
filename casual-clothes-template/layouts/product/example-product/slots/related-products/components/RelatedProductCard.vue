<template>
	<article class="related-card">
		<a
			:href="productUrl"
			class="related-card__image-link"
			@click="handleProductClick"
		>
			<img
				v-if="productImage"
				class="related-card__image"
				:src="productImage"
				:alt="productImageAlt"
				loading="lazy"
			>
			<span v-else class="related-card__image-placeholder" />
			<span
				v-if="ribbonEnabled && product.ribbon?.text"
				class="related-card__ribbon"
				:style="{ backgroundColor: product.ribbon.color || '#000' }"
			>
				{{ product.ribbon.text }}
			</span>
		</a>

		<a
			v-show="namePriceVisible"
			:href="productUrl"
			class="related-card__name-price"
			@click="handleProductClick"
		>
			<span class="related-card__name">{{ product.name }}</span>
			<span aria-hidden="true"> — </span>
			<span>{{ product.price.priceFormatted }}</span>
			<span
				v-if="product.price.compareToPriceFormatted"
				class="related-card__compare-price"
			>
				{{ product.price.compareToPriceFormatted }}
			</span>
		</a>

		<div
			v-if="product.reviewsPublishedCount > 0"
			v-show="ratingVisible"
			class="related-card__rating"
			:aria-label="ratingLabel"
		>
			<span class="related-card__stars" aria-hidden="true">
				<span
					v-for="star in 5"
					:key="star"
					:class="{ 'related-card__star--empty': star > Math.round(product.rating) }"
				>★</span>
			</span>
			<span aria-hidden="true">{{ product.reviewsPublishedCount }}</span>
		</div>
	</article>
</template>

<script setup lang="ts">
import type { StorefrontProduct } from '@lightspeed/ecom-headless'
import { computed } from 'vue'

const props = defineProps<{
	product: StorefrontProduct,
	ribbonEnabled: boolean,
	namePriceVisible: boolean,
	ratingVisible: boolean,
	ratingOfFiveLabel: string,
	reviewsLabel: string,
	isPreviewMode: boolean,
}>()

const mainMedia = computed(() => props.product.media.find(item => item.isMain && item.type === 'PICTURE')
	?? props.product.media.find(item => item.type === 'PICTURE'))
const productUrl = computed(() => props.product.urls.proxyLinkUrl || props.product.urls.directPageUrl)
const productImage = computed(() => mainMedia.value?.image800pxUrl
	|| mainMedia.value?.image1500pxUrl
	|| mainMedia.value?.image400pxUrl
	|| mainMedia.value?.imageOriginalUrl)
const productImageAlt = computed(() => mainMedia.value?.alt || props.product.name)
const ratingLabel = computed(() => `${props.product.rating} ${props.ratingOfFiveLabel}; ${props.product.reviewsPublishedCount} ${props.reviewsLabel}`)

function handleProductClick(event: MouseEvent) {
	if (props.isPreviewMode) event.preventDefault()
}
</script>

<style scoped lang="scss">
.related-card {
	display: flex;
	width: min(82vw, 320px);
	min-width: min(82vw, 320px);
	margin: 0;
	flex: 0 0 min(82vw, 320px);
	flex-direction: column;
	scroll-snap-align: start;
}

.related-card__image-link,
.related-card__image,
.related-card__image-placeholder {
	display: block;
	width: 100%;
	aspect-ratio: 1;
}

.related-card__image-link {
	position: relative;
	overflow: hidden;
	background: #f0f0f0;
	color: inherit;
}

.related-card__image {
	height: 100%;
	object-fit: cover;
}

.related-card__image-placeholder {
	background: linear-gradient(135deg, #f3f3f3, #e7e7e7);
}

.related-card__ribbon {
	position: absolute;
	top: 0;
	left: 0;
	max-width: calc(100% - 16px);
	padding: 4px 8px;
	overflow: hidden;
	color: #fff;
	font-size: 12px;
	font-weight: 400;
	letter-spacing: -0.06px;
	line-height: 18px;
	text-overflow: ellipsis;
	white-space: nowrap;
}

.related-card__name-price {
	display: block;
	margin-top: 16px;
	overflow: hidden;
	color: var(--related-product-name-price-color, var(--fg-color, #191919));
	font-family: var(--related-product-name-price-font-family, var(--body-font-family, inherit));
	font-size: var(--related-product-name-price-font-size, var(--body-2-font-size, 16px));
	font-style: var(--related-product-name-price-font-style, normal);
	font-weight: var(--related-product-name-price-font-weight, var(--body-font-weight, 400));
	letter-spacing: -0.08px;
	line-height: 24px;
	text-decoration: none;
	text-overflow: ellipsis;
	white-space: nowrap;
}

.related-card__compare-price {
	margin-left: 8px;
	color: var(--fg-muted-color, #767676);
	text-decoration: line-through;
}

.related-card__rating {
	display: flex;
	align-items: center;
	min-height: 24px;
	margin-top: 16px;
	gap: 8px;
	color: var(--related-product-rating-color, var(--fg-color, #191919));
	font-family: var(--related-product-rating-font-family, var(--body-font-family, inherit));
	font-size: var(--related-product-rating-font-size, var(--body-2-font-size, 16px));
	font-style: var(--related-product-rating-font-style, normal);
	font-weight: var(--related-product-rating-font-weight, var(--body-font-weight, 400));
	line-height: 24px;
}

.related-card__stars {
	display: flex;
	gap: 6px;
	letter-spacing: 0;
}

.related-card__star--empty {
	opacity: 0.25;
}

@media (min-width: 768px) {
	.related-card {
		width: calc((100% - 16px) / 2);
		min-width: calc((100% - 16px) / 2);
		flex-basis: calc((100% - 16px) / 2);
	}
}

@media (min-width: 1024px) {
	.related-card {
		width: calc((100% - 48px) / 4);
		min-width: calc((100% - 48px) / 4);
		flex-basis: calc((100% - 48px) / 4);
	}
}
</style>
