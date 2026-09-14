<template>
	<div v-show="visible" class="share-row">
		<span>{{ label }}</span>
		<a
			:href="links.facebook"
			target="_blank"
			rel="noopener noreferrer"
			aria-label="Facebook"
		>f</a>
		<a
			:href="links.x"
			target="_blank"
			rel="noopener noreferrer"
			aria-label="X"
		>𝕏</a>
		<a
			:href="links.pinterest"
			target="_blank"
			rel="noopener noreferrer"
			aria-label="Pinterest"
		>p</a>
	</div>
</template>

<script setup lang="ts">
import { computed } from 'vue'

const props = defineProps<{
	visible: boolean,
	label: string,
	productUrl: string,
	productName: string,
	imageUrl?: string,
}>()

const links = computed(() => {
	const productUrl = encodeURIComponent(props.productUrl)
	const productName = encodeURIComponent(props.productName)
	const imageUrl = encodeURIComponent(props.imageUrl ?? '')
	return {
		facebook: `https://www.facebook.com/sharer/sharer.php?u=${productUrl}`,
		x: `https://twitter.com/intent/tweet?url=${productUrl}&text=${productName}`,
		pinterest: `https://pinterest.com/pin/create/button/?url=${productUrl}&media=${imageUrl}&description=${productName}`,
	}
})
</script>

<style scoped lang="scss">
.share-row {
	display: flex;
	align-items: center;
	gap: 14px;
	margin-top: 32px;
	color: var(--share-color, inherit);
	font-family: var(--share-font-family, var(--body-font-family, inherit));
	font-size: var(--share-font-size, 14px);
	font-style: var(--share-font-style, normal);
	font-weight: var(--share-font-weight, var(--body-font-weight, 400));
	line-height: 21px;
}

.share-row a {
	display: inline-flex;
	width: 20px;
	height: 20px;
	align-items: center;
	justify-content: center;
	border-radius: 50%;
	background: var(--fg-color, #191919);
	color: var(--bg-color, #fff);
	font-family: Arial, sans-serif;
	font-size: 13px;
	font-weight: 700;
	text-decoration: none;
}

@media (max-width: 560px) {
	.share-row {
		flex-wrap: wrap;
	}
}
</style>
