import type { StorefrontExpandedCategory, StorefrontListingRequest } from '@lightspeed/ecom-headless'

import { copyStorefrontFilters } from '../../../../../../shared/utils/storefront-listing.ts'

export function shouldShowCategoryProducts(
	category: StorefrontExpandedCategory | undefined,
	listing: StorefrontListingRequest | undefined,
): boolean {
	if (category === undefined || listing === undefined) return false
	if (category.subcategories.length === 0 || category.products.length > 0 || category.totalProductsCount > 0) return true
	// Keep empty results and controls for active filters or an out-of-range product page.
	if (listing.pagination.offset > 0) return true
	return Object.values(copyStorefrontFilters(listing.filters))
		.some(value => value !== undefined && value !== false && value !== '')
}
