<template>
	<div class="atelier-category-layout">
		<slot :name="Slot.CUSTOM_SLOT" slot-id="custom-category" />
	</div>
</template>

<script setup lang="ts">
import { CategoryLayoutSlot as Slot } from '@lightspeed/crane'
</script>

<style scoped>
.atelier-category-layout {
	display: block;
	width: 100%;
	min-width: 0;
}
</style>
