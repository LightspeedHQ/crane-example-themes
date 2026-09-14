<template>
	<div>
		<div v-show="quantityVisible" class="quantity-control">
			<label for="atelier-product-quantity" class="quantity-control__label">
				{{ quantityLabel }}
			</label>
			<input
				id="atelier-product-quantity"
				class="quantity-control__input"
				type="number"
				:value="quantity"
				:min="minimumQuantity"
				:max="maximumQuantity"
				step="1"
				@input="updateQuantity"
				@change="emit('normalizeQuantity')"
			>
			<p v-if="quantityLimitLabel" class="quantity-control__limit">
				{{ quantityLimitLabel }}
			</p>
		</div>

		<p v-if="message" class="purchase-message" role="alert">{{ message }}</p>
		<div class="purchase-actions">
			<button
				v-show="addToCartVisible"
				type="button"
				class="add-to-cart"
				:disabled="addToCartDisabled"
				@click="emit('addToCart')"
			>
				{{ addToCartLabel }}
			</button>
			<button
				v-show="favoriteEnabled"
				type="button"
				class="favorite-button"
				:class="{ 'favorite-button--active': favoriteActive }"
				:aria-label="favoriteLabel"
				:aria-pressed="favoriteActive"
				:disabled="favoriteBusy"
				@click="emit('toggleFavorite')"
			>
				<svg aria-hidden="true" viewBox="0 0 24 24">
					<path d="M20.8 4.6a5.5 5.5 0 0 0-7.8 0L12 5.7l-1.1-1.1a5.5 5.5 0 0 0-7.8 7.8l1.1 1.1L12 21l7.8-7.5 1.1-1.1a5.5 5.5 0 0 0-.1-7.8Z" />
				</svg>
			</button>
		</div>
	</div>
</template>

<script setup lang="ts">
defineProps<{
	quantity: number,
	minimumQuantity: number,
	maximumQuantity?: number,
	quantityVisible: boolean,
	quantityLabel: string,
	quantityLimitLabel?: string,
	message: string,
	addToCartVisible: boolean,
	addToCartDisabled: boolean,
	addToCartLabel: string,
	favoriteEnabled: boolean,
	favoriteActive: boolean,
	favoriteBusy: boolean,
	favoriteLabel: string,
}>()

const emit = defineEmits<{
	updateQuantity: [value: number],
	normalizeQuantity: [],
	addToCart: [],
	toggleFavorite: [],
}>()

function updateQuantity(event: Event) {
	emit('updateQuantity', (event.target as HTMLInputElement).valueAsNumber)
}
</script>

<style scoped lang="scss">
.quantity-control {
	margin-top: 16px;
}

.quantity-control__label {
	display: block;
	margin-bottom: 8px;
	padding: 0;
	color: var(--quantity-color, inherit);
	font-family: var(--quantity-font-family, var(--body-font-family, inherit));
	font-size: var(--quantity-font-size, 14px);
	font-style: var(--quantity-font-style, normal);
	font-weight: var(--quantity-font-weight, 700);
	line-height: 21px;
}

.quantity-control__input {
	display: block;
	width: 72px;
	height: 44px;
	padding: 0 12px;
	border: 1px solid #8d8d8d;
	border-radius: 0;
	background: transparent;
	color: inherit;
	font: inherit;
	text-align: center;
}

.quantity-control__limit {
	margin: 8px 0 0;
	color: var(--quantity-color, inherit);
	font-family: var(--quantity-font-family, var(--body-font-family, inherit));
	font-size: var(--quantity-font-size, 14px);
	font-style: var(--quantity-font-style, normal);
	font-weight: var(--quantity-font-weight, 700);
	line-height: 21px;
}

.purchase-message {
	margin: 12px 0 -4px;
	color: #b42318;
	font-size: 14px;
}

.purchase-actions {
	display: flex;
	align-items: center;
	gap: 8px;
	margin-top: 24px;
}

.add-to-cart {
	width: 276px;
	min-height: 44px;
	padding: var(--add-to-cart-padding, 10px 20px);
	border: var(--add-to-cart-border-width, 1px) solid var(--add-to-cart-border-color, var(--fg-accented-color, #191919));
	border-radius: var(--add-to-cart-border-radius, 999px);
	background: var(--add-to-cart-bg-color, var(--fg-accented-color, #191919));
	color: var(--add-to-cart-text-color, var(--bg-color, #fff));
	font-family: var(--add-to-cart-font-family, var(--body-font-family, inherit));
	font-size: var(--add-to-cart-font-size, 16px);
	line-height: 22px;
	cursor: pointer;
}

.add-to-cart:disabled {
	cursor: not-allowed;
	opacity: 0.55;
}

.favorite-button {
	display: grid;
	width: 44px;
	height: 44px;
	padding: 0;
	border: 0;
	border-radius: 50%;
	background: #e7e7e7;
	color: #191919;
	place-items: center;
	cursor: pointer;
}

.favorite-button:disabled {
	cursor: wait;
	opacity: 0.65;
}

.favorite-button svg {
	width: 20px;
	height: 20px;
	fill: none;
	stroke: currentcolor;
	stroke-linecap: round;
	stroke-linejoin: round;
	stroke-width: 1.5;
}

.favorite-button--active svg {
	fill: currentcolor;
}

@media (max-width: 560px) {
	.purchase-actions {
		align-items: stretch;
	}

	.add-to-cart {
		width: auto;
		flex: 1;
	}
}
</style>
