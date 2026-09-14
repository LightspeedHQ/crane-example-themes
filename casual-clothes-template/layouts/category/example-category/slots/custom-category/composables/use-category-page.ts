import { isStorefrontPageContextV1, useStorefrontPageContext } from '@lightspeed/crane-api'
import type { StorefrontCatalogPage, StorefrontExpandedCategory } from '@lightspeed/ecom-headless'
import { computed, onMounted, onUnmounted, shallowRef, watch, type WatchStopHandle } from 'vue'

import { useStorefrontListing } from '../../../../../../shared/composables/storefront/use-storefront-listing.ts'
import { shouldShowCategoryProducts } from '../utils/category-listing.ts'

const CATEGORY_PAGE_SIZE = 12

function createMissingContextError() {
	return new Error('The current Storefront Category context is unavailable')
}

interface CategoryIdentity {
	readonly categoryId?: number,
	readonly isArtificialCategory: boolean,
}

function isSameCategory(left: CategoryIdentity | undefined, right: CategoryIdentity): boolean {
	return left?.categoryId === right.categoryId
		&& left?.isArtificialCategory === right.isArtificialCategory
}

function selectCategoryListing(
	page: StorefrontCatalogPage | undefined,
	identity: CategoryIdentity | undefined,
): StorefrontExpandedCategory | undefined {
	if (identity?.categoryId !== undefined) {
		const requestedCategory = page?.expandedCategories.find(
			item => item.category.id === identity.categoryId,
		)
		if (requestedCategory !== undefined || !identity.isArtificialCategory) return requestedCategory
	}
	// Artificial/root categories do not always expose an ID that can be matched to the response.
	return page?.expandedCategories[0]
}

export function useCategoryPage() {
	const pageContext = useStorefrontPageContext()
	const storefrontListing = useStorefrontListing()
	const { page, load, clear } = storefrontListing
	const categoryIdentity = shallowRef<CategoryIdentity>()
	let stopContextWatch: WatchStopHandle | undefined

	onMounted(() => {
		stopContextWatch = watch(pageContext, (context) => {
			if (context === undefined) {
				categoryIdentity.value = undefined
				clear()
				return
			}
			if (!isStorefrontPageContextV1(context) || context.pageType !== 'CATEGORY') {
				categoryIdentity.value = undefined
				clear(createMissingContextError())
				return
			}
			const nextIdentity: CategoryIdentity = {
				categoryId: context.categoryId,
				isArtificialCategory: context.isArtificialCategory,
			}
			if (categoryIdentity.value !== undefined && !isSameCategory(categoryIdentity.value, nextIdentity)) {
				// Do not display the previous category while a different route is loading.
				clear()
			}
			categoryIdentity.value = nextIdentity
			const { isUncategorized, ...contextFilters } = context.listing.filters
			void load({
				categoryId: context.categoryId,
				isArtificialCategory: context.isArtificialCategory,
				listing: {
					filters: { ...contextFilters, uncategorized: isUncategorized },
					sortBy: context.listing.sortBy,
					pagination: {
						offset: context.listing.pagination.offset,
						limit: CATEGORY_PAGE_SIZE,
					},
				},
			})
		}, { deep: true, immediate: true })
	})

	onUnmounted(() => {
		stopContextWatch?.()
	})

	const categoryListing = computed(() => selectCategoryListing(page.value, categoryIdentity.value))
	const isCategoryMissing = computed(() => page.value !== undefined && categoryListing.value === undefined)
	const products = computed(() => categoryListing.value?.products ?? [])
	const totalProducts = computed(() => categoryListing.value?.totalProductsCount ?? 0)
	const subcategories = computed(() => categoryListing.value?.subcategories ?? [])
	const showProducts = computed(() => shouldShowCategoryProducts(categoryListing.value, storefrontListing.listing.value))

	return {
		...storefrontListing,
		categoryListing,
		isCategoryMissing,
		products,
		totalProducts,
		subcategories,
		showProducts,
	}
}
