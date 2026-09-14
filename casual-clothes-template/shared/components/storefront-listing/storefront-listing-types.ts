import type {
	StorefrontCatalogFilter,
	StorefrontCatalogProductSortOrder,
} from '@lightspeed/ecom-headless'

export type StorefrontFilterLabelKey = Extract<
	StorefrontCatalogFilter['type'],
	'CATEGORIES' | 'PRICE' | 'INVENTORY' | 'ON_SALE' | 'LOCATIONS'
>

export type StorefrontFilterLabels = Readonly<Record<StorefrontFilterLabelKey, string>>

export interface StorefrontProductCardLabels {
	readonly buyNowLabel: string,
	readonly addingLabel: string,
	readonly addedLabel: string,
	readonly chooseOptionsLabel: string,
	readonly outOfStockLabel: string,
	readonly addErrorLabel: string,
	readonly skuLabel: string,
	readonly ratingOfFiveLabel: string,
	readonly reviewsLabel: string,
}

export interface StorefrontListingLabels {
	readonly filterByLabel: string,
	readonly minimumPriceLabel: string,
	readonly maximumPriceLabel: string,
	readonly resultLabel: string,
	readonly sortByLabel: string,
	readonly emptyLabel: string,
	readonly previousLabel: string,
	readonly nextLabel: string,
	readonly refreshErrorLabel: string,
	readonly retryLabel: string,
}

export interface StorefrontSortOption {
	readonly value: StorefrontCatalogProductSortOrder,
	readonly label: string,
}
