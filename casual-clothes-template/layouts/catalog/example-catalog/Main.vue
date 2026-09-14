<template>
	<div class="atelier-catalog-layout">
		<slot :name="Slot.CUSTOM_SLOT" slot-id="custom-catalog" />
	</div>
</template>

<script setup lang="ts">
import { CatalogLayoutSlot as Slot } from '@lightspeed/crane'
</script>

<style scoped>
.atelier-catalog-layout {
	display: block;
	width: 100%;
	min-width: 0;
}
</style>
