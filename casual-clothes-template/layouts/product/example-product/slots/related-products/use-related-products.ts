import {
	Products,
	type StorefrontProduct,
} from '@lightspeed/ecom-headless'
import {
	isStorefrontPageContextV1,
	useStorefrontPageContext,
} from '@lightspeed/crane-api'
import { onMounted, onUnmounted, shallowRef, watch, type WatchStopHandle } from 'vue'

const MOCK_RELATED_RATING_QUERY_PARAM = 'mockRelatedRating'

function applyMockRating(products: readonly StorefrontProduct[]): readonly StorefrontProduct[] {
	if (
		typeof globalThis.location === 'undefined'
		|| new URLSearchParams(globalThis.location.search).get(MOCK_RELATED_RATING_QUERY_PARAM) !== '1'
	) return products

	return products.map(product => ({
		...product,
		rating: 5,
		reviewsPublishedCount: 12,
	}))
}

export function useRelatedProducts() {
	const pageContext = useStorefrontPageContext()
	const products = shallowRef<readonly StorefrontProduct[]>([])
	let activeRequest = 0
	let currentProductId: number | undefined
	let disposed = false
	let stopContextWatch: WatchStopHandle | undefined
	let stopDataChanges: (() => void) | undefined

	const clear = () => {
		activeRequest += 1
		currentProductId = undefined
		products.value = []
	}

	const load = async (productId: number) => {
		const request = ++activeRequest
		const isSameProduct = currentProductId === productId
		currentProductId = productId
		if (!isSameProduct) products.value = []

		try {
			const result = await Products.getRelated({ productId })
			if (!disposed && request === activeRequest) products.value = applyMockRating(result)
		}
		catch {
			// Related products are optional. A failed request must not break the product page.
			if (!disposed && request === activeRequest && !isSameProduct) products.value = []
		}
	}

	onMounted(() => {
		stopContextWatch = watch(pageContext, (context) => {
			if (
				context === undefined
				|| !isStorefrontPageContextV1(context)
				|| context.pageType !== 'PRODUCT'
			) {
				clear()
				return
			}

			void load(context.productId)
		}, { immediate: true })

		void Products.subscribeChanges(() => {
			if (currentProductId !== undefined) {
				void load(currentProductId)
			}
		}).then((dispose) => {
			if (disposed) dispose()
			else stopDataChanges = dispose
		}).catch(() => {
			// Related products remain optional when change subscriptions are unsupported.
		})
	})

	onUnmounted(() => {
		disposed = true
		activeRequest += 1
		stopContextWatch?.()
		stopDataChanges?.()
	})

	return { products }
}
