import type {
	StorefrontCatalogProductSortOrder,
	StorefrontListingRequest,
	StorefrontProduct,
} from '@lightspeed/ecom-headless'
import { computed, type Ref } from 'vue'

import type {
	StorefrontFilterLabels,
	StorefrontListingLabels,
	StorefrontProductCardLabels,
	StorefrontSortOption,
} from '../../components/storefront-listing/storefront-listing-types.ts'

interface StorefrontListingPresentationOptions {
	t: (key: string) => string,
	buyNowLabel: Readonly<Ref<string>>,
	listing: Readonly<Ref<StorefrontListingRequest | undefined>>,
	products: Readonly<Ref<readonly StorefrontProduct[]>>,
	totalProducts: Readonly<Ref<number>>,
}

export function useStorefrontListingPresentation(options: StorefrontListingPresentationOptions) {
	const filterLabels = computed<StorefrontFilterLabels>(() => ({
		CATEGORIES: options.t('$label.categories'),
		PRICE: options.t('$label.price'),
		INVENTORY: options.t('$label.inventory'),
		ON_SALE: options.t('$label.on_sale'),
		LOCATIONS: options.t('$label.locations'),
	}))
	const sortOptions = computed<readonly StorefrontSortOption[]>(() => [
		{ value: 'DEFINED_BY_STORE_OWNER', label: options.t('$label.sort_featured') },
		{ value: 'ADDED_TIME_DESC', label: options.t('$label.sort_newest') },
		{ value: 'IN_STORE_RECEIVED_DATE_DESC', label: options.t('$label.sort_received') },
		{ value: 'PRICE_ASC', label: options.t('$label.sort_price_low') },
		{ value: 'PRICE_DESC', label: options.t('$label.sort_price_high') },
		{ value: 'NAME_ASC', label: options.t('$label.sort_name_asc') },
		{ value: 'NAME_DESC', label: options.t('$label.sort_name_desc') },
	] satisfies readonly { value: StorefrontCatalogProductSortOrder, label: string }[])
	const resultLabel = computed(() => {
		const offset = options.listing.value?.pagination.offset ?? 0
		const from = options.products.value.length > 0 ? offset + 1 : 0
		const to = offset + options.products.value.length
		return options.t('$label.showing_results')
			.replace('{from}', String(from))
			.replace('{to}', String(to))
			.replace('{total}', String(options.totalProducts.value))
	})
	const cardLabels = computed<StorefrontProductCardLabels>(() => ({
		buyNowLabel: options.buyNowLabel.value,
		addingLabel: options.t('$label.adding'),
		addedLabel: options.t('$label.added'),
		chooseOptionsLabel: options.t('$label.choose_options'),
		outOfStockLabel: options.t('$label.out_of_stock'),
		addErrorLabel: options.t('$label.add_error'),
		skuLabel: options.t('$label.sku'),
		ratingOfFiveLabel: options.t('$label.rating_of_five'),
		reviewsLabel: options.t('$label.reviews'),
	}))
	const listingLabels = computed<StorefrontListingLabels>(() => ({
		filterByLabel: options.t('$label.filter_by'),
		minimumPriceLabel: options.t('$label.minimum_price'),
		maximumPriceLabel: options.t('$label.maximum_price'),
		resultLabel: resultLabel.value,
		sortByLabel: options.t('$label.sort_by'),
		emptyLabel: options.t('$label.empty'),
		previousLabel: options.t('$label.previous'),
		nextLabel: options.t('$label.next'),
		refreshErrorLabel: options.t('$label.load_error'),
		retryLabel: options.t('$label.retry'),
	}))

	return {
		filterLabels,
		sortOptions,
		cardLabels,
		listingLabels,
	}
}
