<template>
	<div
		v-if="state === 'loading'"
		class="product-state product-state--loading"
		:style="criticalLoadingStateStyle"
		aria-live="polite"
	>
		<div class="product-state__image" :style="criticalSkeletonImageStyle" />
		<div class="product-state__copy" :style="criticalSkeletonCopyStyle">
			<div
				class="product-state__line product-state__line--title"
				:style="criticalSkeletonTitleStyle"
			/>
			<div class="product-state__line" :style="criticalSkeletonLineStyle" />
			<div
				class="product-state__line product-state__line--price"
				:style="criticalSkeletonPriceStyle"
			/>
		</div>
		<span class="visually-hidden" :style="criticalVisuallyHiddenStyle">{{ loadingLabel }}</span>
	</div>

	<div v-else class="product-state product-state--error" role="alert">
		<p>{{ errorLabel }}</p>
		<button type="button" class="text-button" @click="emit('retry')">{{ retryLabel }}</button>
	</div>
</template>

<script setup lang="ts">
import type { CSSProperties } from 'vue'

defineProps<{
	state: 'loading' | 'error',
	loadingLabel: string,
	errorLabel: string,
	retryLabel: string,
}>()

const emit = defineEmits<{
	retry: [],
}>()

const criticalSkeletonBackground = 'linear-gradient(90deg, #eee 25%, #f7f7f7 50%, #eee 75%)'
const criticalLoadingStateStyle: CSSProperties = {
	boxSizing: 'border-box',
	display: 'grid',
	gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 420px), 1fr))',
	gap: '32px',
	width: '100%',
	maxWidth: 'calc(min(1408px, var(--max-content-width, 1408px)) + 32px)',
	minHeight: '760px',
	margin: '0 auto',
	padding: '88px 16px 64px',
}
const criticalSkeletonImageStyle: CSSProperties = {
	aspectRatio: '1',
	backgroundImage: criticalSkeletonBackground,
	backgroundSize: '200% 100%',
}
const criticalSkeletonCopyStyle: CSSProperties = {
	paddingTop: '8px',
}
const criticalSkeletonLineStyle: CSSProperties = {
	width: '70%',
	height: '20px',
	marginBottom: '16px',
	backgroundImage: criticalSkeletonBackground,
	backgroundSize: '200% 100%',
}
const criticalSkeletonTitleStyle: CSSProperties = {
	...criticalSkeletonLineStyle,
	width: '80%',
	height: '48px',
}
const criticalSkeletonPriceStyle: CSSProperties = {
	...criticalSkeletonLineStyle,
	width: '30%',
	height: '48px',
	marginTop: '24px',
}
const criticalVisuallyHiddenStyle: CSSProperties = {
	position: 'absolute',
	width: '1px',
	height: '1px',
	padding: '0',
	margin: '-1px',
	overflow: 'hidden',
	clip: 'rect(0, 0, 0, 0)',
	whiteSpace: 'nowrap',
	border: '0',
}
</script>

<style scoped lang="scss">
.product-state {
	width: 100%;
	max-width: 1440px;
	min-height: 760px;
	margin: 0 auto;
	padding: 88px 16px 64px;
}

.product-state__image,
.product-state__line {
	animation: loading 1.4s infinite;
}

.product-state--error {
	display: grid;
	min-height: 360px;
	place-content: center;
	text-align: center;
}

.text-button {
	padding: 0;
	border: 0;
	background: transparent;
	color: #0068ff;
	font: inherit;
	cursor: pointer;
}

@keyframes loading {
	to { background-position: -200% 0; }
}

@media (prefers-reduced-motion: reduce) {
	.product-state__image,
	.product-state__line {
		animation: none;
	}
}
</style>
