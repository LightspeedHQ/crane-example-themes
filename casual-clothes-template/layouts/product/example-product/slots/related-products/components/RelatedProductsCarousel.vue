<template>
	<div class="related-products__carousel">
		<div
			ref="track"
			class="related-products__track"
			role="region"
			:aria-label="regionLabel"
			@scroll="updateNavigationState"
		>
			<RelatedProductCard
				v-for="product in products"
				:key="product.id"
				:product="product"
				:ribbon-enabled="ribbonEnabled"
				:name-price-visible="namePriceVisible"
				:rating-visible="ratingVisible"
				:rating-of-five-label="ratingOfFiveLabel"
				:reviews-label="reviewsLabel"
				:is-preview-mode="isPreviewMode"
			/>
		</div>

		<div v-if="hasOverflow" class="related-products__navigation">
			<button
				type="button"
				class="related-products__arrow"
				:disabled="atStart"
				:aria-label="previousLabel"
				@click="scroll('previous')"
			>
				<svg aria-hidden="true" viewBox="0 0 24 24">
					<path d="m15 18-6-6 6-6" />
				</svg>
			</button>
			<button
				type="button"
				class="related-products__arrow"
				:disabled="atEnd"
				:aria-label="nextLabel"
				@click="scroll('next')"
			>
				<svg aria-hidden="true" viewBox="0 0 24 24">
					<path d="m9 18 6-6-6-6" />
				</svg>
			</button>
		</div>
	</div>
</template>

<script setup lang="ts">
import type { StorefrontProduct } from '@lightspeed/ecom-headless'
import { nextTick, onBeforeUnmount, ref, watch } from 'vue'

import RelatedProductCard from './RelatedProductCard.vue'

const props = defineProps<{
	products: readonly StorefrontProduct[],
	regionLabel: string,
	previousLabel: string,
	nextLabel: string,
	ratingOfFiveLabel: string,
	reviewsLabel: string,
	ribbonEnabled: boolean,
	namePriceVisible: boolean,
	ratingVisible: boolean,
	isPreviewMode: boolean,
}>()

const track = ref<HTMLElement>()
const hasOverflow = ref(false)
const atStart = ref(true)
const atEnd = ref(true)
let resizeObserver: ResizeObserver | undefined

function updateNavigationState() {
	const element = track.value
	if (!element) return

	hasOverflow.value = element.scrollWidth > element.clientWidth + 1
	atStart.value = element.scrollLeft <= 1
	atEnd.value = element.scrollLeft + element.clientWidth >= element.scrollWidth - 1
}

function observeTrack() {
	resizeObserver?.disconnect()
	resizeObserver = undefined

	if (!track.value) return
	resizeObserver = new ResizeObserver(updateNavigationState)
	resizeObserver.observe(track.value)
}

function scroll(direction: 'previous' | 'next') {
	const element = track.value
	const firstCard = element?.querySelector<HTMLElement>('.related-card')
	if (!element || !firstCard) return

	const distance = firstCard.getBoundingClientRect().width + 16
	element.scrollBy({
		left: direction === 'previous' ? -distance : distance,
		behavior: 'smooth',
	})
}

watch(() => props.products, async () => {
	await nextTick()
	observeTrack()
	updateNavigationState()
}, { immediate: true, flush: 'post' })

onBeforeUnmount(() => resizeObserver?.disconnect())
</script>

<style scoped lang="scss">
.related-products__carousel {
	position: relative;
	min-width: 0;
}

.related-products__track {
	display: flex;
	width: 100%;
	gap: 16px;
	overflow-x: auto;
	scroll-behavior: smooth;
	scroll-snap-type: x mandatory;
	scrollbar-width: none;
}

.related-products__track::-webkit-scrollbar {
	display: none;
}

.related-products__navigation {
	position: absolute;
	top: calc(min(82vw, 320px) / 2 - 22px);
	right: 20px;
	left: 20px;
	display: flex;
	justify-content: space-between;
	pointer-events: none;
}

.related-products__arrow {
	display: grid;
	width: 44px;
	height: 44px;
	padding: 0;
	border: 0;
	background: rgb(255 255 255 / 64%);
	color: #000;
	place-items: center;
	pointer-events: auto;
	cursor: pointer;
}

.related-products__arrow:disabled {
	opacity: 0.45;
	cursor: default;
}

.related-products__arrow svg {
	width: 24px;
	height: 24px;
	fill: none;
	stroke: currentcolor;
	stroke-linecap: round;
	stroke-linejoin: round;
	stroke-width: 2;
}

@media (min-width: 768px) {
	.related-products__navigation {
		top: calc((100vw - 48px) / 4 - 22px);
	}
}

@media (min-width: 1024px) {
	.related-products__navigation {
		top: calc(min((100vw - 80px) / 4, 340px) / 2 - 22px);
	}
}

@media (prefers-reduced-motion: reduce) {
	.related-products__track {
		scroll-behavior: auto;
	}
}
</style>
