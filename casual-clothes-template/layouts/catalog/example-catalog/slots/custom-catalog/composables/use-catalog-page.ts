import { isStorefrontPageContextV1, useStorefrontPageContext } from '@lightspeed/crane-api'
import type { StorefrontCatalogPage } from '@lightspeed/ecom-headless'
import { computed, onMounted, onUnmounted, watch, type WatchStopHandle } from 'vue'

import { useStorefrontListing } from '../../../../../../shared/composables/storefront/use-storefront-listing.ts'

const CATALOG_PAGE_SIZE = 12
const MOCK_CATALOG_RATING_QUERY_PARAM = 'mockCatalogRating'

function shouldMockCatalogRating(): boolean {
	return typeof globalThis.location !== 'undefined'
		&& new URLSearchParams(globalThis.location.search).get(MOCK_CATALOG_RATING_QUERY_PARAM) === '1'
}

function createMissingContextError() {
	return new Error('The current Storefront Catalog context is unavailable')
}

function selectCatalogListing(page: StorefrontCatalogPage | undefined) {
	// Catalog.getPage returns the requested root listing first; the remaining entries provide category cards.
	return page?.expandedCategories[0]
}

export function useCatalogPage() {
	const pageContext = useStorefrontPageContext()
	const storefrontListing = useStorefrontListing()
	const { page, load, clear } = storefrontListing
	let stopContextWatch: WatchStopHandle | undefined

	onMounted(() => {
		stopContextWatch = watch(pageContext, (context) => {
			if (context === undefined) {
				clear()
				return
			}
			if (!isStorefrontPageContextV1(context) || context.pageType !== 'CATALOG') {
				clear(createMissingContextError())
				return
			}
			const { isUncategorized, ...contextFilters } = context.listing.filters

			void load({
				listing: {
					filters: {
						...contextFilters,
						uncategorized: isUncategorized,
					},
					sortBy: context.listing.sortBy,
					pagination: {
						offset: context.listing.pagination.offset,
						limit: CATALOG_PAGE_SIZE,
					},
				},
			})
		}, { deep: true, immediate: true })
	})

	onUnmounted(() => {
		stopContextWatch?.()
	})

	const catalogListing = computed(() => selectCatalogListing(page.value))
	const products = computed(() => {
		const items = catalogListing.value?.products ?? []
		if (!shouldMockCatalogRating()) return items
		return items.map(product => ({
			...product,
			rating: 5,
			reviewsPublishedCount: 12,
		}))
	})
	const categories = computed(() => {
		const allCategories = [
			...(catalogListing.value?.subcategories ?? []),
			...(page.value?.expandedCategories.slice(1).map(item => item.category) ?? []),
			...(page.value?.collapsedCategories ?? []),
		]
		return [...new Map(allCategories.map(category => [category.id, category])).values()]
	})
	const totalProducts = computed(() => catalogListing.value?.totalProductsCount ?? 0)

	return {
		...storefrontListing,
		products,
		categories,
		totalProducts,
	}
}
