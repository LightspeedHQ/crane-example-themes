import {
	Products,
	type StorefrontProduct,
	type StorefrontProductRequest,
} from '@lightspeed/ecom-headless'
import {
	isStorefrontPageContextV1,
	useStorefrontPageContext,
} from '@lightspeed/crane-api'
import { onMounted, onUnmounted, ref, shallowRef, watch, type WatchStopHandle } from 'vue'

function createMissingContextError() {
	return new Error('The current Storefront product is unavailable in this custom slot')
}

function createMissingProductError(productId: number) {
	return new Error(`Storefront product ${productId} is unavailable`)
}

export function useCurrentProduct() {
	const pageContext = useStorefrontPageContext()
	const product = shallowRef<StorefrontProduct>()
	const productMediaIndex = ref<number>()
	const productCategoryId = ref<number>()
	const isLoading = ref(true)
	const error = shallowRef<unknown>()
	let activeRequest = 0
	let currentRequest: StorefrontProductRequest | undefined
	let disposed = false
	let stopContextWatch: WatchStopHandle | undefined
	let stopDataChanges: (() => void) | undefined

	const load = async (requestData: StorefrontProductRequest, mediaIndex?: number, categoryId?: number) => {
		const request = ++activeRequest
		currentRequest = {
			...requestData,
			selectedOptionIndexes: requestData.selectedOptionIndexes === undefined
				? undefined
				: [...requestData.selectedOptionIndexes],
		}
		productMediaIndex.value = mediaIndex
		productCategoryId.value = categoryId
		if (product.value?.id !== requestData.productId) product.value = undefined
		isLoading.value = true
		error.value = undefined

		try {
			const response = await Products.get(currentRequest)
			if (disposed || request !== activeRequest) return
			if (!response) throw createMissingProductError(requestData.productId)
			product.value = response
		}
		catch (loadError: unknown) {
			if (disposed || request !== activeRequest) return
			error.value = loadError
		}
		finally {
			if (!disposed && request === activeRequest) isLoading.value = false
		}
	}

	const showMissingContext = () => {
		activeRequest += 1
		currentRequest = undefined
		product.value = undefined
		productMediaIndex.value = undefined
		productCategoryId.value = undefined
		isLoading.value = false
		error.value = createMissingContextError()
	}

	const waitForContext = () => {
		activeRequest += 1
		currentRequest = undefined
		product.value = undefined
		productMediaIndex.value = undefined
		productCategoryId.value = undefined
		isLoading.value = true
		error.value = undefined
	}

	onMounted(() => {
		stopContextWatch = watch(pageContext, (context) => {
			if (context === undefined) {
				waitForContext()
				return
			}

			if (!isStorefrontPageContextV1(context) || context.pageType !== 'PRODUCT') {
				showMissingContext()
				return
			}

			void load({
				productId: context.productId,
				variationId: context.variationId,
				selectedOptionIndexes: context.selectedOptionIndexes,
			}, context.productMediaIndex, context.categoryId)
		}, { immediate: true })

		void Products.subscribeChanges(() => {
			if (currentRequest !== undefined) {
				void load(currentRequest, productMediaIndex.value, productCategoryId.value)
			}
		}).then((dispose) => {
			if (disposed) dispose()
			else stopDataChanges = dispose
		}).catch(() => {
			// Product loading remains available even when change subscriptions are unsupported.
		})
	})

	onUnmounted(() => {
		disposed = true
		activeRequest += 1
		stopContextWatch?.()
		stopDataChanges?.()
	})

	return {
		product,
		productMediaIndex,
		productCategoryId,
		isLoading,
		error,
		retry: () => {
			if (isStorefrontPageContextV1(pageContext.value) && pageContext.value.pageType === 'PRODUCT') {
				void load({
					productId: pageContext.value.productId,
					variationId: pageContext.value.variationId,
					selectedOptionIndexes: pageContext.value.selectedOptionIndexes,
				}, pageContext.value.productMediaIndex, pageContext.value.categoryId)
				return
			}

			showMissingContext()
		},
	}
}
