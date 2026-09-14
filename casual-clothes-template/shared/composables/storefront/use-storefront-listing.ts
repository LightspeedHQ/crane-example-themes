import {
	Catalog,
	type StorefrontCatalogFilter,
	type StorefrontCatalogPage,
	type StorefrontCatalogPageRequest,
	type StorefrontCatalogProductSortOrder,
	type StorefrontListingRequest,
	type StorefrontProductFilters,
} from '@lightspeed/ecom-headless'
import { computed, onMounted, onUnmounted, ref, shallowRef } from 'vue'

import {
	copyStorefrontCatalogPageRequest,
	copyStorefrontFilters,
	mergeAvailableStorefrontFilters,
} from '../../utils/storefront-listing.ts'

export function useStorefrontListing() {
	const page = shallowRef<StorefrontCatalogPage>()
	const availableFilters = shallowRef<readonly StorefrontCatalogFilter[]>([])
	const listing = ref<StorefrontListingRequest>()
	const currentRequest = shallowRef<StorefrontCatalogPageRequest>()
	const committedRequest = shallowRef<StorefrontCatalogPageRequest>()
	const isLoading = ref(true)
	const isRefreshing = ref(false)
	const error = shallowRef<unknown>()
	const canRetry = computed(() => currentRequest.value !== undefined)
	let activeRequest = 0
	let disposed = false
	let stopDataChanges: (() => void) | undefined

	const load = async (nextRequest: StorefrontCatalogPageRequest) => {
		const request = ++activeRequest
		const requestSnapshot = copyStorefrontCatalogPageRequest(nextRequest)
		currentRequest.value = requestSnapshot
		isLoading.value = page.value === undefined
		isRefreshing.value = page.value !== undefined
		error.value = undefined

		const filtersPromise = Catalog.getFilters({
			categoryId: requestSnapshot.categoryId,
			isArtificialCategory: requestSnapshot.isArtificialCategory,
			filters: requestSnapshot.listing.filters,
		})
			.catch(() => {
				// Filter metadata is optional and must not keep the product list loading.
				return undefined
			})

		try {
			const nextPage = await Catalog.getPage(requestSnapshot)
			if (disposed || request !== activeRequest) return
			page.value = nextPage
			listing.value = requestSnapshot.listing
			committedRequest.value = requestSnapshot
			void filtersPromise.then((nextFilters) => {
				if (disposed || request !== activeRequest || nextFilters === undefined) return
				// Keep only selected filters omitted by a response so users can still clear them.
				availableFilters.value = mergeAvailableStorefrontFilters(
					availableFilters.value,
					nextFilters.filters,
					requestSnapshot.listing.filters,
				)
			})
		}
		catch (loadError: unknown) {
			if (disposed || request !== activeRequest) return
			error.value = loadError
		}
		finally {
			if (!disposed && request === activeRequest) {
				isLoading.value = false
				isRefreshing.value = false
			}
		}
	}

	const clear = (nextError?: unknown) => {
		activeRequest += 1
		page.value = undefined
		availableFilters.value = []
		listing.value = undefined
		currentRequest.value = undefined
		committedRequest.value = undefined
		isLoading.value = nextError === undefined
		isRefreshing.value = false
		error.value = nextError
	}

	const updateListing = (nextListing: StorefrontListingRequest) => {
		if (committedRequest.value === undefined) return
		void load({ ...committedRequest.value, listing: nextListing })
	}

	const setFilters = (filters: StorefrontProductFilters) => {
		if (listing.value === undefined) return
		updateListing({
			...listing.value,
			filters: copyStorefrontFilters(filters),
			pagination: { ...listing.value.pagination, offset: 0 },
		})
	}

	const setSortBy = (sortBy: StorefrontCatalogProductSortOrder) => {
		if (listing.value === undefined) return
		updateListing({
			...listing.value,
			sortBy,
			pagination: { ...listing.value.pagination, offset: 0 },
		})
	}

	const setOffset = (offset: number) => {
		if (listing.value === undefined) return
		updateListing({
			...listing.value,
			pagination: {
				...listing.value.pagination,
				offset: Number.isFinite(offset) ? Math.max(0, Math.floor(offset)) : 0,
			},
		})
	}

	const retry = () => {
		if (currentRequest.value !== undefined) void load(currentRequest.value)
	}

	onMounted(() => {
		void Catalog.subscribeChanges(retry).then((dispose) => {
			if (disposed) dispose()
			else stopDataChanges = dispose
		}).catch(() => {
			// Listing remains available when subscriptions are unsupported.
		})
	})

	onUnmounted(() => {
		disposed = true
		activeRequest += 1
		stopDataChanges?.()
	})

	return {
		page,
		availableFilters,
		listing,
		isLoading,
		isRefreshing,
		error,
		canRetry,
		load,
		clear,
		setFilters,
		setSortBy,
		setOffset,
		retry,
	}
}
