<template>
	<article class="product-card">
		<a :href="productUrl" class="product-card__image-link" @click="handleProductLink">
			<img
				v-if="image"
				class="product-card__image"
				:src="image"
				:alt="imageAlt"
				loading="lazy">
			<span v-else class="product-card__image-placeholder" />
			<span
				v-if="ribbonEnabled && product.ribbon?.text"
				class="product-card__ribbon"
				:style="{ backgroundColor: product.ribbon.color || '#000' }"
			>{{ product.ribbon.text }}</span>
		</a>
		<div class="product-card__details">
			<div v-show="productTextVisible" class="product-card__copy">
				<h3 class="product-card__heading">
					<a :href="productUrl" class="product-card__name" @click="handleProductLink">{{ product.name }}</a>
				</h3>
				<div class="product-card__price">
					<span>{{ product.price.priceFormatted }}</span>
					<s v-if="product.price.compareToPriceFormatted">{{ product.price.compareToPriceFormatted }}</s>
				</div>
				<p v-if="product.subtitle" class="product-card__subtitle">{{ product.subtitle }}</p>
				<p v-if="product.sku" class="product-card__sku">{{ skuLabel }} {{ product.sku }}</p>
				<div
					v-if="ratingEnabled && product.reviewsPublishedCount > 0"
					class="product-card__rating"
					:aria-label="ratingAriaLabel"
				>
					<span class="product-card__rating-value" aria-hidden="true">{{ product.rating }}</span>
					<span class="product-card__stars" aria-hidden="true">
						<span v-for="star in 5" :key="star" :class="{ 'product-card__star--empty': star > Math.round(product.rating) }">★</span>
					</span>
					<span class="product-card__reviews" aria-hidden="true">({{ product.reviewsPublishedCount }})</span>
				</div>
				<p v-if="product.price.lowestPrice?.labelForProductList" class="product-card__lowest-price">
					{{ product.price.lowestPrice.labelForProductList }}
				</p>
			</div>
			<p v-if="addError && buyNowButtonVisible" class="product-card__error" role="alert">{{ addErrorLabel }}</p>
			<button
				v-show="buyNowButtonVisible"
				type="button"
				class="product-card__button"
				:disabled="buttonDisabled"
				@click="handleBuy"
			>{{ buttonLabel }} <span aria-hidden="true">→</span></button>
		</div>
	</article>
</template>

<script setup lang="ts">
import { Cart, type StorefrontProduct } from '@lightspeed/ecom-headless'
import { computed, ref } from 'vue'

import type { StorefrontProductCardLabels } from './storefront-listing-types.ts'

const props = defineProps<StorefrontProductCardLabels & {
	product: StorefrontProduct,
	ribbonEnabled: boolean,
	ratingEnabled: boolean,
	productTextVisible: boolean,
	buyNowButtonVisible: boolean,
	isPreviewMode: boolean,
}>()

const operationState = ref<'IDLE' | 'ADDING' | 'ADDED'>('IDLE')
const addError = ref(false)
const media = computed(() => props.product.gridMedia.find(item => item.type === 'PICTURE')
	?? props.product.media.find(item => item.isMain && item.type === 'PICTURE')
	?? props.product.media.find(item => item.type === 'PICTURE'))
const image = computed(() => media.value?.image800pxUrl || media.value?.image1500pxUrl
	|| media.value?.image400pxUrl || media.value?.imageOriginalUrl)
const imageAlt = computed(() => media.value?.alt || props.product.name)
const productUrl = computed(() => props.product.urls.proxyLinkUrl || props.product.urls.directPageUrl)
const isSoldOut = computed(() => props.product.inventory.isSoldOut && !props.product.inventory.isPreorderAllowed)
const canAddSilently = computed(() => props.product.flags.canAddToBagSilently
	&& props.product.defaultConfiguration.isPurchasable
	&& props.product.defaultConfiguration.purchaseKind === 'NORMAL')
const buttonDisabled = computed(() => props.isPreviewMode || isSoldOut.value || operationState.value === 'ADDING')
const buttonLabel = computed(() => {
	if (isSoldOut.value) return props.outOfStockLabel
	if (!canAddSilently.value) return props.chooseOptionsLabel
	if (operationState.value === 'ADDING') return props.addingLabel
	if (operationState.value === 'ADDED') return props.addedLabel
	return props.buyNowLabel
})
const ratingAriaLabel = computed(() => `${props.product.rating} ${props.ratingOfFiveLabel}; ${props.product.reviewsPublishedCount} ${props.reviewsLabel}`)

function handleProductLink(event: MouseEvent) {
	if (props.isPreviewMode) event.preventDefault()
}

function navigateToProduct() {
	if (!props.isPreviewMode && productUrl.value) globalThis.location.assign(productUrl.value)
}

async function handleBuy() {
	if (buttonDisabled.value) return
	if (!canAddSilently.value) {
		navigateToProduct()
		return
	}

	operationState.value = 'ADDING'
	addError.value = false
	try {
		await Cart.addProduct(props.product.id)
		operationState.value = 'ADDED'
	}
	catch {
		operationState.value = 'IDLE'
		addError.value = true
	}
}
</script>

<style scoped lang="scss">
* { box-sizing: border-box; }
.product-card { display: flex; min-width: 0; flex-direction: column; }
.product-card__image-link,
.product-card__image,
.product-card__image-placeholder { display: block; width: 100%; aspect-ratio: 1; }
.product-card__image-link { position: relative; overflow: hidden; background: #efede8; }
.product-card__image { object-fit: cover; }
.product-card__image-placeholder { background: linear-gradient(135deg, #f3f1ec, #e4e0d8); }
.product-card__ribbon {
	position: absolute;
	top: 0;
	left: 0;
	padding: 4px 8px;
	color: #fff;
	font-size: 12px;
	line-height: 18px;
}
.product-card__details,
.product-card__copy { display: grid; gap: 8px; }
.product-card__details { flex: 1; padding-top: 16px; }
.product-card__details,
.product-card__name {
	font: var(--product-text-font-style, normal) var(--product-text-font-weight, 400)
		var(--product-text-font-size, var(--body-2-font-size, 16px))/24px
		var(--product-text-font-family, var(--body-font-family, inherit));
	color: var(--product-text-color, var(--fg-color, #191919));
}
.product-card__heading { margin: 0; font: inherit; }
.product-card__name { text-decoration: none; }
.product-card__price { display: flex; gap: 8px; }
.product-card__price s,
.product-card__subtitle,
.product-card__sku,
.product-card__lowest-price { color: var(--fg-muted-color, #767676); }
.product-card__subtitle,
.product-card__sku,
.product-card__lowest-price,
.product-card__error { margin: 0; }
.product-card__subtitle { font-size: var(--body-2-font-size, 16px); line-height: 24px; }
.product-card__sku { font-size: var(--body-4-font-size, 12px); line-height: 18px; }
.product-card__lowest-price { font-size: var(--body-4-font-size, 12px); line-height: 15px; }
.product-card__rating { display: flex; align-items: center; gap: 8px; }
.product-card__rating-value { font-size: 14px; line-height: 20px; }
.product-card__stars { line-height: 20px; letter-spacing: 1px; }
.product-card__reviews { color: var(--fg-muted-color, #767676); font-size: 12px; line-height: 16px; }
.product-card__star--empty { opacity: 0.25; }
.product-card__error { color: #a12424; }
.product-card__button {
	width: 100%;
	min-height: 40px;
	margin-top: auto;
	padding: var(--buy-now-button-padding, 10px 18px);
	border: var(--buy-now-button-border-width, 1px) solid var(--buy-now-button-border-color, #000);
	border-radius: var(--buy-now-button-border-radius, 0);
	background: var(--buy-now-button-bg-color, #000);
	color: var(--buy-now-button-text-color, #fff);
	font-family: var(--buy-now-button-font-family, var(--body-font-family, inherit));
	font-size: var(--buy-now-button-font-size, 16px);
	line-height: 24px;
	cursor: pointer;
}
.product-card__button:disabled { opacity: 0.55; cursor: default; }
</style>
