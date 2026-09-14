<template>
	<dialog
		ref="dialogElement"
		class="product-image-lightbox"
		:aria-label="productName"
		@cancel.prevent="closeLightbox"
	>
		<div ref="lightboxRoot" class="product-image-lightbox__root" />
	</dialog>
</template>

<script setup lang="ts">
import type PhotoSwipe from 'photoswipe'
import 'photoswipe/style.css'
import { onBeforeUnmount, onMounted, useTemplateRef } from 'vue'

import type { GalleryImage, GalleryZoomPoint } from '../product-details-types.ts'
import {
	applyInitialHoverZoom,
	bindLightboxIdleControls,
	bindShadowDomLightboxActions,
	CLOSE_ICON,
	createLightboxSlides,
	fixUnknownImageDimensions,
	registerLightboxUi,
	ZOOM_ICON,
} from '../composables/product-image-lightbox.ts'

const props = defineProps<{
	closeLabel: string
	images: readonly GalleryImage[]
	initialIndex: number
	initialZoomPoint?: GalleryZoomPoint
	nextImageLabel: string
	previousImageLabel: string
	productName: string
	zoomInLabel: string
	zoomOutLabel: string
}>()

const emit = defineEmits<{
	close: []
	selectImage: [url: string]
}>()

const dialogElement = useTemplateRef<HTMLDialogElement>('dialogElement')
const lightboxRoot = useTemplateRef<HTMLElement>('lightboxRoot')
let lightbox: PhotoSwipe | undefined
let isUnmounted = false
let restoreIdleControls: () => void = () => undefined
let restoreShadowActions: () => void = () => undefined
let previouslyFocusedElement: HTMLElement | null = null
let previousDocumentOverflow = ''
let hasCapturedPageState = false
let hasEmittedClose = false

function getFocusedElement(root: HTMLElement) {
	const rootNode = root.getRootNode()
	return rootNode instanceof ShadowRoot
		? rootNode.activeElement as HTMLElement | null
		: globalThis.document.activeElement as HTMLElement | null
}

function restorePageState() {
	if (!hasCapturedPageState) return
	hasCapturedPageState = false
	globalThis.document.documentElement.style.overflow = previousDocumentOverflow
	if (dialogElement.value?.open) dialogElement.value.close()
	previouslyFocusedElement?.focus({ preventScroll: true })
	previouslyFocusedElement = null
}

function emitClose() {
	if (isUnmounted || hasEmittedClose) return
	hasEmittedClose = true
	emit('close')
}

function destroyLightbox() {
	const currentLightbox = lightbox
	lightbox = undefined
	restoreIdleControls()
	restoreShadowActions()
	restoreIdleControls = () => undefined
	restoreShadowActions = () => undefined
	currentLightbox?.destroy()
	restorePageState()
}

function closeLightbox() {
	if (lightbox) {
		lightbox.close()
	} else {
		restorePageState()
		emitClose()
	}
}

onMounted(async () => {
	const dialog = dialogElement.value
	const root = lightboxRoot.value
	if (!dialog || !root || props.images.length === 0) {
		emitClose()
		return
	}

	try {
		const { default: PhotoSwipe } = await import('photoswipe')
		if (isUnmounted) return

		previouslyFocusedElement = getFocusedElement(root)
		previousDocumentOverflow = globalThis.document.documentElement.style.overflow
		hasCapturedPageState = true
		dialog.showModal()
		globalThis.document.documentElement.style.overflow = 'hidden'

		const slides = createLightboxSlides(props.images)
		const initialIndex = Math.max(0, Math.min(props.initialIndex, slides.length - 1))
		const instance = new PhotoSwipe({
			appendToEl: root,
			arrowPrev: false,
			arrowNext: false,
			bgClickAction: false,
			bgOpacity: 1,
			closeSVG: CLOSE_ICON,
			closeTitle: props.closeLabel,
			counter: false,
			dataSource: slides,
			doubleTapAction: false,
			escKey: false,
			imageClickAction: false,
			index: initialIndex,
			initialZoomLevel: 'fit',
			maxZoomLevel: 4,
			mouseMovePan: true,
			padding: {
				top: 44,
				right: 0,
				bottom: 48,
				left: 0,
			},
			returnFocus: false,
			secondaryZoomLevel: 1,
			showHideOpacity: true,
			tapAction: false,
			// The modal dialog owns focus containment. PhotoSwipe's document-level trap
			// cannot see focused controls through the custom slot's Shadow DOM.
			trapFocus: false,
			zoomSVG: ZOOM_ICON,
			zoomTitle: props.zoomInLabel,
		})
		lightbox = instance

		fixUnknownImageDimensions(instance)
		registerLightboxUi(instance, {
			nextImageLabel: props.nextImageLabel,
			previousImageLabel: props.previousImageLabel,
			productName: props.productName,
			zoomInLabel: props.zoomInLabel,
			zoomOutLabel: props.zoomOutLabel,
		})
		applyInitialHoverZoom(instance, props.initialZoomPoint, initialIndex)

		instance.on('afterInit', () => {
			instance.element?.removeAttribute('role')
			instance.element?.removeAttribute('aria-modal')
			restoreIdleControls = bindLightboxIdleControls(instance)
			restoreShadowActions = bindShadowDomLightboxActions(instance, root)
		})
		instance.on('change', () => {
			const selectedImage = props.images[instance.currIndex]
			if (selectedImage) emit('selectImage', selectedImage.url)
		})
		instance.on('destroy', () => {
			if (lightbox === instance) lightbox = undefined
			restoreIdleControls()
			restoreShadowActions()
			restorePageState()
			emitClose()
		})

		instance.init()
	} catch {
		destroyLightbox()
		emitClose()
	}
})

onBeforeUnmount(() => {
	isUnmounted = true
	destroyLightbox()
})
</script>

<style scoped lang="scss" src="./product-image-lightbox.scss"></style>
