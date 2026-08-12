<script setup lang="ts">
defineProps<{
	imageUrl: string
	altText: string
}>()
</script>

<template>
	<div v-if="imageUrl" class="gallery-item">
		<img
			:src="imageUrl"
			:alt="altText"
			loading="lazy"
			class="gallery-item__image"
		/>
	</div>
</template>

<style scoped>
.gallery-item {
	flex: 0 0 216px;
	display: flex;
	flex-direction: column;
	scroll-snap-align: center;
}

.gallery-item__image {
	width: 100%;
	aspect-ratio: 1 / 1;
	object-fit: cover;
}

@media (min-width: 768px) {
	.gallery-item {
		flex: 0 0 696px;
		min-width: 696px;
		max-width: 696px;
	}
}
</style>
