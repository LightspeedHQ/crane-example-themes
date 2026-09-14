<template>
	<div>
		<h1
			v-show="titleVisible"
			class="product-info__title"
			itemprop="name"
		>
			{{ name }}
		</h1>
		<p
			v-if="subtitle"
			v-show="subtitleVisible"
			class="product-info__subtitle"
		>
			{{ subtitle }}
		</p>
		<div
			v-show="priceVisible"
			class="product-info__price-row"
			itemprop="offers"
			itemscope
			itemtype="https://schema.org/Offer"
		>
			<span class="product-info__price">{{ price }}</span>
			<span
				v-if="comparePrice"
				v-show="comparePriceVisible"
				class="product-info__compare-price"
			>
				{{ comparePrice }}
			</span>
			<meta itemprop="availability" :content="isPurchasable ? 'https://schema.org/InStock' : 'https://schema.org/OutOfStock'">
		</div>
	</div>
</template>

<script setup lang="ts">
defineProps<{
	name: string,
	subtitle?: string,
	price: string,
	comparePrice: string,
	titleVisible: boolean,
	subtitleVisible: boolean,
	priceVisible: boolean,
	comparePriceVisible: boolean,
	isPurchasable: boolean,
}>()
</script>

<style scoped lang="scss">
.product-info__title {
	margin: 0;
	color: var(--product-title-color, var(--fg-color, #191919));
	font-family: var(--product-title-font-family, var(--heading-font-family, inherit));
	font-size: var(--product-title-font-size, var(--heading-1-font-size, 32px));
	font-style: var(--product-title-font-style, normal);
	font-weight: var(--product-title-font-weight, var(--heading-font-weight, 400));
	line-height: 1.5;
}

.product-info__subtitle {
	max-width: 560px;
	margin: 8px 0 0;
	color: var(--product-subtitle-color, var(--fg-color, #333));
	font-family: var(--product-subtitle-font-family, var(--body-font-family, inherit));
	font-size: var(--product-subtitle-font-size, var(--body-3-font-size, 14px));
	font-style: var(--product-subtitle-font-style, normal);
	font-weight: var(--product-subtitle-font-weight, var(--body-font-weight, 400));
	line-height: 1.5;
}

.product-info__price-row {
	display: flex;
	align-items: baseline;
	gap: 12px;
	margin-top: 20px;
}

.product-info__price {
	color: var(--product-price-color, var(--fg-color, #191919));
	font-family: var(--product-price-font-family, var(--heading-font-family, inherit));
	font-size: var(--product-price-font-size, var(--heading-1-font-size, 32px));
	font-style: var(--product-price-font-style, normal);
	font-weight: var(--product-price-font-weight, var(--heading-font-weight, 400));
	line-height: 1.5;
}

.product-info__compare-price {
	color: var(--product-compare-price-color, var(--fg-muted-color, #767676));
	font-family: var(--product-compare-price-font-family, var(--body-font-family, inherit));
	font-size: var(--product-compare-price-font-size, 18px);
	font-style: var(--product-compare-price-font-style, normal);
	font-weight: var(--product-compare-price-font-weight, var(--body-font-weight, 400));
	text-decoration: line-through;
}

@media (max-width: 560px) {
	.product-info__title {
		font-size: var(--product-title-font-size, 28px);
		line-height: 1.3;
	}

	.product-info__price {
		font-size: var(--product-price-font-size, 28px);
	}
}
</style>
