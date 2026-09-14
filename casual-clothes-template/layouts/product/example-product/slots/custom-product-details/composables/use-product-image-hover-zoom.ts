import {
	computed,
	onBeforeUnmount,
	ref,
	type CSSProperties,
	type Ref,
	watch,
} from 'vue'

import type { GalleryImage, GalleryZoomPoint } from '../product-details-types.ts'

const HOVER_ZOOM_SCALE = 2

interface ProductImageHoverZoomOptions {
	activeImage: Readonly<Ref<GalleryImage | undefined>>
	enabled: Readonly<Ref<boolean>>
	imageElement: Readonly<Ref<HTMLImageElement | null>>
	stageElement: Readonly<Ref<HTMLElement | null>>
}

interface ZoomedImageLayout {
	height: number
	left: number
	top: number
	width: number
}

function clamp(value: number, minimum: number, maximum: number) {
	return Math.min(maximum, Math.max(minimum, value))
}

function positionZoomedImage(
	stageSize: number,
	zoomedImageSize: number,
	desiredPosition: number,
) {
	if (zoomedImageSize <= stageSize) return (stageSize - zoomedImageSize) / 2
	return clamp(desiredPosition, stageSize - zoomedImageSize, 0)
}

function calculateZoomedImageLayout(
	stage: HTMLElement,
	image: HTMLImageElement,
	clientX: number,
	clientY: number,
): { layout: ZoomedImageLayout, point: GalleryZoomPoint } | undefined {
	const stageRect = stage.getBoundingClientRect()
	const naturalWidth = image.naturalWidth
	const naturalHeight = image.naturalHeight
	if (stageRect.width <= 0 || stageRect.height <= 0 || naturalWidth <= 0 || naturalHeight <= 0) return

	const fitScale = Math.min(stageRect.width / naturalWidth, stageRect.height / naturalHeight)
	const displayedWidth = naturalWidth * fitScale
	const displayedHeight = naturalHeight * fitScale
	const zoomScale = Math.min(
		HOVER_ZOOM_SCALE,
		naturalWidth / displayedWidth,
		naturalHeight / displayedHeight,
	)
	if (zoomScale <= 1) return

	const displayedLeft = (stageRect.width - displayedWidth) / 2
	const displayedTop = (stageRect.height - displayedHeight) / 2
	const point = {
		x: clamp((clientX - stageRect.left - displayedLeft) / displayedWidth, 0, 1),
		y: clamp((clientY - stageRect.top - displayedTop) / displayedHeight, 0, 1),
	}
	const width = displayedWidth * zoomScale
	const height = displayedHeight * zoomScale

	return {
		point,
		layout: {
			width,
			height,
			left: positionZoomedImage(stageRect.width, width, displayedLeft - point.x * displayedWidth),
			top: positionZoomedImage(stageRect.height, height, displayedTop - point.y * displayedHeight),
		},
	}
}

export function useProductImageHoverZoom(options: ProductImageHoverZoomOptions) {
	const isHoverZoomActive = ref(false)
	const hoverZoomPoint = ref<GalleryZoomPoint>()
	const zoomedImageLayout = ref<ZoomedImageLayout>()
	let animationFrame: number | undefined
	let pendingPointerPosition: Pick<PointerEvent, 'clientX' | 'clientY'> | undefined

	function resetHoverZoom() {
		if (animationFrame !== undefined) cancelAnimationFrame(animationFrame)
		animationFrame = undefined
		pendingPointerPosition = undefined
		isHoverZoomActive.value = false
		hoverZoomPoint.value = undefined
		zoomedImageLayout.value = undefined
	}

	function updateHoverZoom() {
		animationFrame = undefined
		const stage = options.stageElement.value
		const image = options.imageElement.value
		const pointer = pendingPointerPosition
		pendingPointerPosition = undefined
		if (!stage || !image || !pointer) return

		const result = calculateZoomedImageLayout(stage, image, pointer.clientX, pointer.clientY)
		if (!result) {
			resetHoverZoom()
			return
		}

		hoverZoomPoint.value = result.point
		zoomedImageLayout.value = result.layout
		isHoverZoomActive.value = true
	}

	function scheduleHoverZoom(event: PointerEvent) {
		if (
			!options.enabled.value
			|| event.pointerType === 'touch'
			|| !globalThis.matchMedia('(hover: hover) and (pointer: fine)').matches
		) {
			return
		}

		pendingPointerPosition = { clientX: event.clientX, clientY: event.clientY }
		if (animationFrame === undefined) animationFrame = requestAnimationFrame(updateHoverZoom)
	}

	const zoomedImageStyle = computed<CSSProperties | undefined>(() => {
		const layout = zoomedImageLayout.value
		if (!layout) return
		return {
			width: `${layout.width}px`,
			height: `${layout.height}px`,
			left: `${layout.left}px`,
			top: `${layout.top}px`,
		}
	})

	watch([options.activeImage, options.enabled], resetHoverZoom)
	onBeforeUnmount(resetHoverZoom)

	return {
		hoverZoomPoint,
		isHoverZoomActive,
		onPointerEnter: scheduleHoverZoom,
		onPointerLeave: resetHoverZoom,
		onPointerMove: scheduleHoverZoom,
		zoomedImageStyle,
	}
}
