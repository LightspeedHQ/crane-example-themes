<template>
	<div class="products-grid">
		<div class="products-grid__small-group">
			<ProductCard v-if="product1" :product="product1" />
			<ProductCard v-if="product2" :product="product2" />
		</div>
		<ProductCard v-if="product3" :product="product3" />
	</div>
</template>

<script setup lang="ts">

import ProductCard from './ProductCard.vue'
import { computed } from 'vue'

const props = defineProps<{
  products: ProductListComponentItem[]
}>()

const product1 = computed(() => props.products[0])
const product2 = computed(() => props.products[1])
const product3 = computed(() => props.products[2])
</script>

<style scoped lang="scss">
.products-grid {
  display: flex;
  flex-direction: column;
  gap: 16px;

  /* Small cards group - 2 columns on mobile */
  &__small-group {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 16px;
  }
  /* Desktop: [Card1 Card2] | [Featured] */
  @media (min-width: 768px) {
    /* Desktop: 2 columns (left group | featured) */
      display: grid;
      grid-template-columns: 1fr 1fr;
  }
}
</style>
