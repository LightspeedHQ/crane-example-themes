<template>
	<div
		class="atelier-product-layout"
	>
		<slot :name="Slot.CUSTOM_SLOT" slot-id="custom-product-details" />
		<slot :name="Slot.CUSTOM_SLOT" slot-id="related-products" />
	</div>
</template>

<script setup lang="ts">
import { ProductLayoutSlot as Slot } from '@lightspeed/crane'
</script>

<style scoped>
.atelier-product-layout {
	display: block;
	width: 100%;
	min-width: 0;
}
</style>
