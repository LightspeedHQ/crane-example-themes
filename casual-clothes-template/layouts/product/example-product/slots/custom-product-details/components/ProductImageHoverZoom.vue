<template>
	<img
		v-if="active && image"
		class="product-image-hover-zoom"
		:src="image.url"
		:style="imageStyle"
		alt=""
		aria-hidden="true"
	>
</template>

<script setup lang="ts">
import type { CSSProperties } from 'vue'

import type { GalleryImage } from '../product-details-types.ts'

defineProps<{
	active: boolean
	image?: GalleryImage
	imageStyle?: CSSProperties
}>()
</script>

<style scoped lang="scss">
.product-image-hover-zoom {
	position: absolute;
	z-index: 1;
	display: block;
	max-width: none;
	max-height: none;
	object-fit: fill;
	animation: reveal-hover-zoom 300ms ease-in;
	transition: top 100ms linear, left 100ms linear;
	pointer-events: none;
	user-select: none;
}

@keyframes reveal-hover-zoom {
	from {
		opacity: 0;
	}
}

@media (prefers-reduced-motion: reduce) {
	.product-image-hover-zoom {
		animation: none;
		transition: none;
	}
}
</style>
