<template>
	<div class="product-card" :style="productCardVars">
		<a
			:href="linkHref"
			class="product-card__image"
			@click="handleProductClick"
		>
			<img
				v-if="hasValidProductImage"
				:src="imageUrl"
				:alt="name"
				loading="lazy"
			/>
			<Badge
				v-if="ribbon"
				:text="ribbon.text"
				:color="ribbon.color"
				position="top-left"
				class="product-card__badge"
			/>
			<div class="product-card__icon">
				<svg
					width="24"
					height="24"
					viewBox="0 0 24 24"
					fill="none"
					xmlns="http://www.w3.org/2000/svg"
				>
					<path
						d="M12 5V19M5 12H19"
						stroke="currentColor"
						stroke-width="2"
						stroke-linecap="round"
						stroke-linejoin="round"
					/>
				</svg>
			</div>
		</a>
		<h3 v-show="productNameDesign?.visible !== false" class="product-card__name">{{ name }}</h3>
		<div class="product-card__prices_container">
			<p v-show="productPriceDesign?.visible !== false" class="product-card__price">
				{{ price }}
			</p>
			<span v-if="salePrice && productSalePriceDesign?.visible !== false" class="product-card__price--sale">
				{{ salePrice }}
			</span>
		</div>
	</div>
</template>

<script setup lang="ts">
import Badge from '../../../shared/components/Badge.vue'
import { usePreviewMode } from '../../../shared/composables'
import { computed } from 'vue'
import { hasValidImage } from '../../../shared/utils'
import { useTextElementDesign, useVueBaseProps } from '@lightspeed/crane'
import type { Design } from '../type.ts'
import { createTextVars } from '../../../shared/utils/design-vars'

const props = defineProps<{ product: ProductListComponentItem }>()

const { design: rawDesign } = useVueBaseProps<unknown, Design>()

const linkHref = computed(() => props.product.url)
const imageUrl = computed(() => props.product.imageUrl)
const name = computed(() => props.product.name || '')
const price = computed(() => props.product.formattedPrice || '')
const salePrice = computed(() => props.product.formattedComparePrice)
const ribbon = computed(() => {
	const r = props.product.ribbon
	if (!r || !r.color) return undefined
	const c = r.color
	return { text: r.text, color: `rgba(${c.red}, ${c.green}, ${c.blue}, ${c.alpha})` }
})

const hasValidProductImage = computed(() => hasValidImage(imageUrl.value))

const { isPreviewMode } = usePreviewMode()

const productNameDesign = useTextElementDesign<Design>('product_name') as TextDesignData
const productPriceDesign = useTextElementDesign<Design>('product_price') as TextDesignData
const productSalePriceDesign = useTextElementDesign<Design>('product_sale_price') as TextDesignData

const productCardVars = computed(() =>
	Object.fromEntries([
		...createTextVars('product-name', productNameDesign, rawDesign.value?.product_name),
		...createTextVars('product-price', productPriceDesign, rawDesign.value?.product_price),
		...createTextVars(
			'product-sale-price',
			productSalePriceDesign,
			rawDesign.value?.product_sale_price,
		),
	]),
)

/**
 * Handle product link click - block navigation in preview mode
 */
const handleProductClick = (event: MouseEvent) => {
	if (isPreviewMode.value) {
		event.preventDefault()
	}
}
</script>

<style scoped lang="scss">
/* Product Card */
.product-card {
	display: flex;
	flex-direction: column;
	gap: 16px;

	/* Product Image */
	&__image {
		position: relative;
		overflow: hidden;
		aspect-ratio: 1 / 1;
		background: #f0f0f0;
		display: block;
		text-decoration: none;

		& img {
			width: 100%;
			height: 100%;
			object-fit: cover;
			transition: transform 0.3s ease;
		}

		&:hover img {
			transform: scale(1.05);
		}
	}

	/* Plus Icon */
	&__icon {
		position: absolute;
		bottom: 8px;
		right: 8px;
		padding: 10px;
		background: rgba(255, 255, 255, 0.64);
		display: flex;
		align-items: center;
		justify-content: center;
		color: #000;

		& svg {
			width: 16px;
			height: 16px;
		}
	}

	&__prices_container {
		display: flex;
		align-items: center;
	}

	/* Badge */
	&__badge {
		position: absolute;
		top: 0;
		left: 0;
		padding: 4px 8px;
		background: #000;
		color: #fff;
		font-size: 12px;
		font-weight: 400;
		line-height: 1.5;
		letter-spacing: -0.06px;
	}

	/* Product Name */
	&__name {
		font-family: var(--product-name-font-family, var(--body-font-family));
		color: var(--product-name-color, var(--fg-color));
		font-size: var(--product-name-font-size, var(--body-2-font-size));
		font-weight: var(--product-name-font-weight, var(--body-font-weight));
		font-style: var(--product-name-font-style, var(--body-font-style));
		line-height: 1.5;
		letter-spacing: -0.08px;
	}

	/* Product Price */
	&__price {
		font-family: var(--product-price-font-family, var(--body-font-family));
		color: var(--product-price-color, var(--fg-color));
		font-size: var(--product-price-font-size, var(--body-2-font-size));
		font-weight: var(--product-price-font-weight, var(--body-font-weight));
		font-style: var(--product-price-font-style, var(--body-font-style));
		line-height: 1.5;
		letter-spacing: -0.08px;
	}

	&__price--sale {
		font-family: var(--product-sale-price-font-family, var(--body-font-family));
		color: var(--product-sale-price-color, var(--fg-color));
		font-size: var(--product-sale-price-font-size, var(--body-2-font-size));
		font-weight: var(--product-sale-price-font-weight, var(--body-font-weight));
		font-style: var(--product-sale-price-font-style, var(--body-font-style));
		text-decoration: line-through;
		margin-left: 5px;
	}
}
</style>
