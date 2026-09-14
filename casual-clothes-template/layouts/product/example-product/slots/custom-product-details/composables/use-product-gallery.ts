import type { StorefrontProduct, StorefrontProductConfiguration } from '@lightspeed/ecom-headless'
import { computed, ref, type Ref, watch } from 'vue'

import type { GalleryImage } from '../product-details-types.ts'

interface ProductGalleryOptions {
	product: Readonly<Ref<StorefrontProduct | undefined>>,
	configuration: Readonly<Ref<StorefrontProductConfiguration | undefined>>,
	productMediaIndex: Readonly<Ref<number | undefined>>,
}

export function useProductGallery(options: ProductGalleryOptions) {
	const activeImageUrl = ref('')
	let pendingProductMediaIndex: number | undefined
	let previousMainImageUrl = ''

	const galleryImages = computed<GalleryImage[]>(() => {
		if (!options.product.value) return []
		const media = options.configuration.value?.media.length
			? options.configuration.value.media
			: options.product.value.media
		const result: GalleryImage[] = media
			.filter(item => item.type === 'PICTURE')
			.flatMap((image) => {
				const url = image.image1500pxUrl
					|| image.image800pxUrl
					|| image.image400pxUrl
					|| image.imageOriginalUrl
				if (!url) return []
				return [{
					id: image.id,
					url,
					fullSizeUrl: image.imageOriginalUrl || image.image1500pxUrl || url,
					thumbnail: image.image400pxUrl || image.image160pxUrl || url,
					alt: image.alt || options.product.value?.name || '',
					width: image.width,
					height: image.height,
				}]
			})

		return result.filter((image, index, images) => (
			images.findIndex(candidate => candidate.url === image.url) === index
		))
	})
	const activeImage = computed<GalleryImage | undefined>(() => {
		return galleryImages.value.find(image => image.url === activeImageUrl.value)
			?? galleryImages.value[0]
	})

	watch(options.product, (product) => {
		pendingProductMediaIndex = product ? options.productMediaIndex.value : undefined
	}, { immediate: true })

	watch(options.configuration, () => {
		const mainImageUrl = galleryImages.value[0]?.url ?? ''
		const requestedImage = pendingProductMediaIndex === undefined
			? undefined
			: galleryImages.value[pendingProductMediaIndex]
		const activeImageIsAvailable = galleryImages.value.some(image => image.url === activeImageUrl.value)
		if (requestedImage || mainImageUrl !== previousMainImageUrl || !activeImageIsAvailable) {
			activeImageUrl.value = requestedImage?.url ?? mainImageUrl
		}
		previousMainImageUrl = mainImageUrl
		pendingProductMediaIndex = undefined
	})

	return {
		galleryImages,
		activeImage,
		selectImage: (url: string) => {
			activeImageUrl.value = url
		},
	}
}
