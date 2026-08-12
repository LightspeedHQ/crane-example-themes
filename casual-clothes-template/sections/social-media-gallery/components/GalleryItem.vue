<template>
	<article v-if="imageUrl" class="gallery-item">
		<div class="gallery-item__image">
			<img :src="imageUrl" :alt="altText" loading="lazy" />
			<div class="gallery-item__overlay" />
		</div>
		<p class="gallery-item__username">{{ username }}</p>
	</article>
</template>

<script setup lang="ts">
defineProps<{
	imageUrl: string
	username: string
	altText: string
}>()
</script>

<style scoped lang="scss">
.gallery-item {
	flex: 0 0 216px;
	display: flex;
	flex-direction: column;
	gap: 8px;
	scroll-snap-align: center;

	&__image {
		position: relative;
		width: 100%;
		aspect-ratio: 1 / 1;
		overflow: hidden;

		& img {
			width: 100%;
			height: 100%;
			object-fit: cover;
		}
	}

	&__overlay {
		position: absolute;
		inset: 0;
		background: rgba(0, 0, 0, 0.2);
		pointer-events: none;
	}

	&__username {
		font-family: var(--gallery-username-font-family, var(--body-font-family));
		color: var(--gallery-username-color, var(--fg-color));
		font-size: var(--gallery-username-font-size, var(--body-2-font-size));
		font-weight: var(--gallery-username-font-weight, var(--body-font-weight));
		font-style: var(--gallery-username-font-style, var(--body-font-style));
		line-height: 1.5;
		letter-spacing: -0.08px;
	}

	@media (min-width: 768px) {
		flex: 0 0 340px;
		gap: 16px;
		scroll-snap-align: start;
	}
}
</style>
