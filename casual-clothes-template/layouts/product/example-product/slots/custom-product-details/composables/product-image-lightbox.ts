import type PhotoSwipe from 'photoswipe'
import type { Point, SlideData, UIElementData } from 'photoswipe'

import type { GalleryImage, GalleryZoomPoint } from '../product-details-types.ts'

const CONTROL_IDLE_TIMEOUT = 4000
const CONTROL_MOUSE_LEAVE_TIMEOUT = 1000
const DOUBLE_TAP_DISTANCE = 25
const DOUBLE_TAP_TIMEOUT = 300
const TAP_MOVEMENT_TOLERANCE = 10

export const CLOSE_ICON = `
	<svg aria-hidden="true" class="pswp__icn" viewBox="0 0 32 32">
		<path d="M8 8l16 16M24 8L8 24" fill="none" stroke="currentColor" stroke-linecap="round" stroke-width="1.5"/>
	</svg>
`

export const ZOOM_ICON = `
	<svg aria-hidden="true" class="pswp__icn" viewBox="0 0 32 32">
		<circle cx="14" cy="14" r="7.5" fill="none" stroke="currentColor" stroke-width="1.5"/>
		<path d="M19.5 19.5L25 25M10 14h8" fill="none" stroke="currentColor" stroke-linecap="round" stroke-width="1.5"/>
		<path class="pswp__zoom-icn-bar-v" d="M14 10v8" fill="none" stroke="currentColor" stroke-linecap="round" stroke-width="1.5"/>
	</svg>
`

interface LightboxUiOptions {
	nextImageLabel: string
	previousImageLabel: string
	productName: string
	zoomInLabel: string
	zoomOutLabel: string
}

interface PointerStart {
	clientX: number
	clientY: number
	hasMoved: boolean
	pointerType: string
}

interface TouchTap {
	clientX: number
	clientY: number
	time: number
}

function createArrow(
	direction: 'previous' | 'next',
	label: string,
	onClick: () => void,
): UIElementData {
	const isPrevious = direction === 'previous'
	return {
		className: `product-image-lightbox__arrow product-image-lightbox__arrow--${direction}`,
		isButton: true,
		appendTo: 'wrapper',
		order: 10,
		title: label,
		ariaLabel: label,
		html: `
			<svg aria-hidden="true" class="product-image-lightbox__arrow-icon" viewBox="0 0 32 70">
				<path d="${isPrevious ? 'M25 4L7 35l18 31' : 'M7 4l18 31L7 66'}" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5"/>
			</svg>
		`,
		onClick,
	}
}

function updateZoomButtonLabel(photoswipe: PhotoSwipe, options: LightboxUiOptions) {
	const zoomButton = photoswipe.element?.querySelector<HTMLButtonElement>('.pswp__button--zoom')
	const slide = photoswipe.currSlide
	if (!zoomButton || !slide) return

	const isZoomedIn = slide.currZoomLevel > slide.zoomLevels.initial + 0.01
	const label = isZoomedIn ? options.zoomOutLabel : options.zoomInLabel
	zoomButton.title = label
	zoomButton.setAttribute('aria-label', label)
}

export function createLightboxSlides(images: readonly GalleryImage[]): SlideData[] {
	return images.map(image => ({
		src: image.fullSizeUrl,
		msrc: image.url,
		alt: image.alt,
		width: image.width > 0 ? image.width : 1200,
		height: image.height > 0 ? image.height : 1200,
	}))
}

export function fixUnknownImageDimensions(photoswipe: PhotoSwipe) {
	const updateCurrentSlide = () => {
		const slide = photoswipe.currSlide
		const content = slide?.content
		const image = content?.element
		if (
			!slide
			|| !content
			|| !(image instanceof HTMLImageElement)
			|| image.naturalWidth <= 0
			|| image.naturalHeight <= 0
			|| (content.width === image.naturalWidth && content.height === image.naturalHeight)
		) return

		content.data.width = image.naturalWidth
		content.data.height = image.naturalHeight
		content.width = image.naturalWidth
		content.height = image.naturalHeight
		slide.width = image.naturalWidth
		slide.height = image.naturalHeight
		slide.zoomLevels.update(slide.width, slide.height, slide.panAreaSize)
		slide.zoomAndPanToInitial()
		slide.applyCurrentZoomPan()
		slide.updateContentSize(true)
		photoswipe.updateSize(true)
	}

	photoswipe.on('loadComplete', updateCurrentSlide)
	photoswipe.on('change', updateCurrentSlide)
}

export function registerLightboxUi(photoswipe: PhotoSwipe, options: LightboxUiOptions) {
	photoswipe.on('uiRegister', () => {
		photoswipe.ui?.registerElement(createArrow('previous', options.previousImageLabel, () => photoswipe.prev()))
		photoswipe.ui?.registerElement(createArrow('next', options.nextImageLabel, () => photoswipe.next()))
		photoswipe.ui?.registerElement({
			className: 'product-image-lightbox__caption',
			appendTo: 'wrapper',
			order: 20,
			onInit: (element) => {
				element.textContent = options.productName
			},
		})
	})

	photoswipe.on('zoomPanUpdate', () => updateZoomButtonLabel(photoswipe, options))
	photoswipe.on('change', () => updateZoomButtonLabel(photoswipe, options))
}

export function applyInitialHoverZoom(
	photoswipe: PhotoSwipe,
	initialZoomPoint: GalleryZoomPoint | undefined,
	initialIndex: number,
) {
	if (!initialZoomPoint) return

	photoswipe.on('initialZoomPan', ({ slide }) => {
		if (!slide.isActive || slide.index !== initialIndex || !slide.isZoomable()) return
		const centerPoint = {
			x: photoswipe.viewportSize.x * initialZoomPoint.x,
			y: photoswipe.viewportSize.y * initialZoomPoint.y,
		}
		slide.zoomTo(1, centerPoint, 0)
	})
}

export function bindLightboxIdleControls(photoswipe: PhotoSwipe) {
	const scrollWrap = photoswipe.scrollWrap
	if (!scrollWrap || !globalThis.matchMedia('(hover: hover) and (pointer: fine)').matches) {
		return () => undefined
	}

	let hideControlsTimeout: ReturnType<typeof setTimeout> | undefined
	const showControls = () => {
		if (hideControlsTimeout !== undefined) clearTimeout(hideControlsTimeout)
		scrollWrap.classList.remove('product-image-lightbox--idle')
	}
	const hideControlsAfter = (delay: number) => {
		showControls()
		hideControlsTimeout = setTimeout(() => {
			scrollWrap.classList.add('product-image-lightbox--idle')
		}, delay)
	}
	const onMouseMove = () => hideControlsAfter(CONTROL_IDLE_TIMEOUT)
	const onMouseLeave = () => hideControlsAfter(CONTROL_MOUSE_LEAVE_TIMEOUT)
	const onMouseEnter = () => hideControlsAfter(CONTROL_IDLE_TIMEOUT)

	scrollWrap.addEventListener('mousemove', onMouseMove)
	scrollWrap.addEventListener('mouseleave', onMouseLeave)
	scrollWrap.addEventListener('mouseenter', onMouseEnter)
	hideControlsAfter(CONTROL_IDLE_TIMEOUT)

	return () => {
		if (hideControlsTimeout !== undefined) clearTimeout(hideControlsTimeout)
		scrollWrap.removeEventListener('mousemove', onMouseMove)
		scrollWrap.removeEventListener('mouseleave', onMouseLeave)
		scrollWrap.removeEventListener('mouseenter', onMouseEnter)
	}
}

function getPhotoSwipePoint(photoswipe: PhotoSwipe, event: PointerEvent): Point {
	return {
		x: event.pageX - photoswipe.offset.x,
		y: event.pageY - photoswipe.offset.y,
	}
}

function isTap(start: PointerStart, event: PointerEvent) {
	return !start.hasMoved
		&& Math.hypot(event.clientX - start.clientX, event.clientY - start.clientY) <= TAP_MOVEMENT_TOLERANCE
}

function isMainContentTarget(target: Element) {
	return target.closest('.pswp__container') !== null
}

function toggleControls(photoswipe: PhotoSwipe) {
	photoswipe.scrollWrap?.classList.toggle('product-image-lightbox--controls-hidden')
}

function handleMouseClick(photoswipe: PhotoSwipe, target: Element, event: PointerEvent) {
	if (target.closest('.pswp__button, .product-image-lightbox__caption')) return

	if (target.closest('.pswp__img')) {
		const slide = photoswipe.currSlide
		if (slide?.isZoomable() && Math.abs(slide.zoomLevels.secondary - slide.zoomLevels.initial) >= 0.01) {
			slide.toggleZoom(getPhotoSwipePoint(photoswipe, event))
		} else {
			photoswipe.close()
		}
		return
	}

	if (target.closest('.pswp__item, .pswp__zoom-wrap, .pswp__bg, .pswp__container, .pswp__scroll-wrap')) {
		photoswipe.close()
	}
}

export function bindShadowDomLightboxActions(photoswipe: PhotoSwipe, root: HTMLElement) {
	// PhotoSwipe handles pointerup on window, where Shadow DOM retargets an image click to the slot host.
	// Listening inside the shadow root preserves the real target for click and tap actions.
	const pointerStarts = new Map<number, PointerStart>()
	let hadMultipleTouchPointers = false
	let lastTouchTap: TouchTap | undefined
	let singleTapTimeout: ReturnType<typeof setTimeout> | undefined

	const onPointerDown = (event: PointerEvent) => {
		if (event.pointerType === 'mouse' && event.button !== 0) return
		pointerStarts.set(event.pointerId, {
			clientX: event.clientX,
			clientY: event.clientY,
			hasMoved: false,
			pointerType: event.pointerType,
		})
		const touchPointerCount = [...pointerStarts.values()].filter(pointer => pointer.pointerType !== 'mouse').length
		if (touchPointerCount > 1) hadMultipleTouchPointers = true
	}
	const onPointerMove = (event: PointerEvent) => {
		const start = pointerStarts.get(event.pointerId)
		if (
			start
			&& Math.hypot(event.clientX - start.clientX, event.clientY - start.clientY) > TAP_MOVEMENT_TOLERANCE
		) {
			start.hasMoved = true
		}
	}

	const onPointerUp = (event: PointerEvent) => {
		const start = pointerStarts.get(event.pointerId)
		pointerStarts.delete(event.pointerId)
		if (!start || !isTap(start, event)) {
			if (pointerStarts.size === 0) hadMultipleTouchPointers = false
			return
		}

		const target = event.target
		if (!(target instanceof Element)) {
			if (pointerStarts.size === 0) hadMultipleTouchPointers = false
			return
		}
		if (start.pointerType === 'mouse') {
			handleMouseClick(photoswipe, target, event)
			return
		}
		if (hadMultipleTouchPointers || !isMainContentTarget(target)) {
			if (pointerStarts.size === 0) hadMultipleTouchPointers = false
			return
		}

		const now = Date.now()
		const isDoubleTap = lastTouchTap !== undefined
			&& now - lastTouchTap.time <= DOUBLE_TAP_TIMEOUT
			&& Math.hypot(event.clientX - lastTouchTap.clientX, event.clientY - lastTouchTap.clientY) <= DOUBLE_TAP_DISTANCE
		if (isDoubleTap) {
			if (singleTapTimeout !== undefined) clearTimeout(singleTapTimeout)
			singleTapTimeout = undefined
			lastTouchTap = undefined
			photoswipe.currSlide?.toggleZoom(getPhotoSwipePoint(photoswipe, event))
		} else {
			if (singleTapTimeout !== undefined) clearTimeout(singleTapTimeout)
			lastTouchTap = { clientX: event.clientX, clientY: event.clientY, time: now }
			singleTapTimeout = setTimeout(() => {
				toggleControls(photoswipe)
				lastTouchTap = undefined
				singleTapTimeout = undefined
			}, DOUBLE_TAP_TIMEOUT)
		}
		if (pointerStarts.size === 0) hadMultipleTouchPointers = false
	}

	const onPointerCancel = (event: PointerEvent) => {
		pointerStarts.delete(event.pointerId)
		if (pointerStarts.size === 0) hadMultipleTouchPointers = false
	}

	root.addEventListener('pointerdown', onPointerDown)
	root.addEventListener('pointermove', onPointerMove)
	root.addEventListener('pointerup', onPointerUp)
	root.addEventListener('pointercancel', onPointerCancel)

	return () => {
		if (singleTapTimeout !== undefined) clearTimeout(singleTapTimeout)
		pointerStarts.clear()
		root.removeEventListener('pointerdown', onPointerDown)
		root.removeEventListener('pointermove', onPointerMove)
		root.removeEventListener('pointerup', onPointerUp)
		root.removeEventListener('pointercancel', onPointerCancel)
	}
}
