<template>
	<div class="gallery">
		<div class="gallery__stage">
			<button
				v-if="activeImage"
				ref="mainImageButton"
				type="button"
				class="gallery__main-image-button"
				:disabled="!zoomEnabled"
				:aria-haspopup="zoomEnabled ? 'dialog' : undefined"
				:aria-label="zoomEnabled ? `${zoomInLabel}: ${activeImage.alt || productName}` : undefined"
				@pointerenter="onPointerEnter"
				@pointerleave="onPointerLeave"
				@pointermove="onPointerMove"
				@click="openLightbox"
			>
				<img
					ref="mainImageElement"
					class="gallery__main-image"
					:src="activeImage.url"
					:alt="activeImage.alt || productName"
					itemprop="image"
				>
				<ProductImageHoverZoom
					:active="isHoverZoomActive"
					:image="activeImage"
					:image-style="zoomedImageStyle"
				/>
			</button>
			<div v-else class="gallery__placeholder" />
			<button
				v-if="images.length > 1 && navigationEnabled && !isHoverZoomActive"
				type="button"
				class="gallery__arrow gallery__arrow--previous"
				:aria-label="previousImageLabel"
				@click="showPreviousImage"
			>
				<span aria-hidden="true">‹</span>
			</button>
			<button
				v-if="images.length > 1 && navigationEnabled && !isHoverZoomActive"
				type="button"
				class="gallery__arrow gallery__arrow--next"
				:aria-label="nextImageLabel"
				@click="showNextImage"
			>
				<span aria-hidden="true">›</span>
			</button>
		</div>

		<div v-if="images.length > 1" class="gallery__thumbnails">
			<button
				v-for="(image, index) in images"
				:key="image.id"
				type="button"
				class="gallery__thumbnail"
				:class="{ 'gallery__thumbnail--active': image.url === activeImage?.url }"
				:aria-label="selectImageLabel.replace('{number}', String(index + 1))"
				:aria-current="image.url === activeImage?.url ? 'true' : undefined"
				@click="selectImage(image.url)"
			>
				<img :src="image.thumbnail" :alt="image.alt || productName">
			</button>
		</div>

		<ProductImageLightbox
			v-if="lightboxSession"
			:images="lightboxSession.images"
			:initial-index="lightboxSession.initialIndex"
			:initial-zoom-point="lightboxSession.initialZoomPoint"
			:product-name="productName"
			:close-label="closeLabel"
			:zoom-in-label="zoomInLabel"
			:zoom-out-label="zoomOutLabel"
			:previous-image-label="previousImageLabel"
			:next-image-label="nextImageLabel"
			@close="lightboxSession = undefined"
			@select-image="selectImage"
		/>
	</div>
</template>

<script setup lang="ts">
import { computed, ref, toRef, useTemplateRef } from 'vue'

import type { GalleryImage, GalleryZoomPoint } from '../product-details-types.ts'
import { useProductImageHoverZoom } from '../composables/use-product-image-hover-zoom.ts'
import ProductImageHoverZoom from './ProductImageHoverZoom.vue'
import ProductImageLightbox from './ProductImageLightbox.vue'

const props = defineProps<{
	images: readonly GalleryImage[],
	activeImage?: GalleryImage,
	productName: string,
	navigationEnabled: boolean,
	zoomEnabled: boolean,
	closeLabel: string,
	zoomInLabel: string,
	zoomOutLabel: string,
	previousImageLabel: string,
	nextImageLabel: string,
	selectImageLabel: string,
}>()

const emit = defineEmits<{
	selectImage: [url: string],
}>()

const activeIndex = computed(() => props.images.findIndex(image => image.url === props.activeImage?.url))
const lightboxSession = ref<{
	images: readonly GalleryImage[]
	initialIndex: number
	initialZoomPoint?: GalleryZoomPoint
}>()
const mainImageButton = useTemplateRef<HTMLElement>('mainImageButton')
const mainImageElement = useTemplateRef<HTMLImageElement>('mainImageElement')
const {
	hoverZoomPoint,
	isHoverZoomActive,
	onPointerEnter,
	onPointerLeave,
	onPointerMove,
	zoomedImageStyle,
} = useProductImageHoverZoom({
	activeImage: toRef(props, 'activeImage'),
	enabled: toRef(props, 'zoomEnabled'),
	imageElement: mainImageElement,
	stageElement: mainImageButton,
})

function selectImage(url: string) {
	emit('selectImage', url)
}

function showPreviousImage() {
	const nextIndex = activeIndex.value <= 0 ? props.images.length - 1 : activeIndex.value - 1
	selectImage(props.images[nextIndex]?.url ?? '')
}

function showNextImage() {
	const nextIndex = activeIndex.value >= props.images.length - 1 ? 0 : activeIndex.value + 1
	selectImage(props.images[nextIndex]?.url ?? '')
}

function openLightbox() {
	if (!props.zoomEnabled || !props.activeImage) return
	const images = [...props.images]
	lightboxSession.value = {
		images,
		initialIndex: Math.max(0, images.findIndex(image => image.url === props.activeImage?.url)),
		initialZoomPoint: hoverZoomPoint.value ? { ...hoverZoomPoint.value } : undefined,
	}
}
</script>

<style scoped lang="scss" src="./product-gallery.scss"></style>
