import type {
	StorefrontCatalogFilter,
	StorefrontCatalogPageRequest,
	StorefrontFilterValue,
	StorefrontProductFilters,
} from '@lightspeed/ecom-headless'

export function getStorefrontFilterKey(filter: StorefrontCatalogFilter): string {
	if (filter.type === 'OPTION' || filter.type === 'SWATCH') return `${filter.type}:${filter.optionId}`
	if (filter.type === 'ATTRIBUTE') return `${filter.type}:${filter.attributeId}`
	return filter.type
}

function copyFilterMap(
	values: Readonly<Record<string, readonly string[]>> | undefined,
): Readonly<Record<string, readonly string[]>> | undefined {
	if (values === undefined) return undefined
	const entries = Object.entries(values)
		.filter(([, items]) => items.length > 0)
		.map(([key, items]) => [key, [...items]])
	return entries.length > 0 ? Object.fromEntries(entries) : undefined
}

export function copyStorefrontFilters(filters: StorefrontProductFilters): StorefrontProductFilters {
	return {
		...filters,
		categories: filters.categories?.length ? [...filters.categories] : undefined,
		attributes: copyFilterMap(filters.attributes),
		options: copyFilterMap(filters.options),
		swatch: copyFilterMap(filters.swatch),
		locations: filters.locations?.length ? [...filters.locations] : undefined,
	}
}

export function copyStorefrontCatalogPageRequest(
	request: StorefrontCatalogPageRequest,
): StorefrontCatalogPageRequest {
	return {
		categoryId: request.categoryId,
		isArtificialCategory: request.isArtificialCategory,
		listing: {
			filters: copyStorefrontFilters(request.listing.filters),
			sortBy: request.listing.sortBy,
			pagination: { ...request.listing.pagination },
		},
	}
}

export function getStorefrontFilterValues(
	filter: StorefrontCatalogFilter,
): readonly StorefrontFilterValue[] {
	return 'values' in filter && Array.isArray(filter.values) ? filter.values : []
}

export function getSelectedStorefrontFilterValues(
	filter: StorefrontCatalogFilter,
	filters: StorefrontProductFilters,
): readonly (string | number)[] {
	switch (filter.type) {
		case 'CATEGORIES': return filters.categories ?? []
		case 'LOCATIONS': return filters.locations ?? []
		case 'OPTION': return filters.options?.[filter.optionId] ?? []
		case 'SWATCH': return filters.swatch?.[filter.optionId] ?? []
		case 'ATTRIBUTE': return filters.attributes?.[filter.attributeId] ?? []
		case 'INVENTORY': return filters.inventory === undefined ? [] : [filters.inventory]
		case 'ON_SALE': return filters.onSale === undefined ? [] : [filters.onSale]
		default: return []
	}
}

export function isStorefrontFilterValueSelected(
	filter: StorefrontCatalogFilter,
	filters: StorefrontProductFilters,
	value: string | number,
): boolean {
	return getSelectedStorefrontFilterValues(filter, filters).map(String).includes(String(value))
}

function copyMapWithValue(
	map: Readonly<Record<string, readonly string[]>> | undefined,
	key: string,
	values: readonly (string | number)[],
): Readonly<Record<string, readonly string[]>> | undefined {
	const next = { ...map }
	if (values.length > 0) next[key] = values.map(String)
	else delete next[key]
	return Object.keys(next).length > 0 ? next : undefined
}

function isInventoryFilterValue(value: string | number | undefined): value is 'instock' | 'outofstock' {
	return value === 'instock' || value === 'outofstock'
}

function isOnSaleFilterValue(value: string | number | undefined): value is 'onsale' | 'notonsale' {
	return value === 'onsale' || value === 'notonsale'
}

export function toggleStorefrontFilterValue(
	filters: StorefrontProductFilters,
	filter: StorefrontCatalogFilter,
	value: string | number,
): StorefrontProductFilters {
	const current = getSelectedStorefrontFilterValues(filter, filters)
	const values = isStorefrontFilterValueSelected(filter, filters, value)
		? current.filter(item => String(item) !== String(value))
		: [...current, value]

	switch (filter.type) {
		case 'CATEGORIES': {
			const categories = values.map(Number).filter(Number.isFinite)
			return { ...filters, categories: categories.length > 0 ? categories : undefined }
		}
		case 'LOCATIONS':
			return { ...filters, locations: values.length > 0 ? values.map(String) : undefined }
		case 'INVENTORY': {
			const inventory = values[values.length - 1]
			return { ...filters, inventory: isInventoryFilterValue(inventory) ? inventory : undefined }
		}
		case 'ON_SALE': {
			const onSale = values[values.length - 1]
			return { ...filters, onSale: isOnSaleFilterValue(onSale) ? onSale : undefined }
		}
		case 'OPTION':
			return { ...filters, options: copyMapWithValue(filters.options, filter.optionId, values) }
		case 'SWATCH':
			return { ...filters, swatch: copyMapWithValue(filters.swatch, filter.optionId, values) }
		case 'ATTRIBUTE':
			return { ...filters, attributes: copyMapWithValue(filters.attributes, filter.attributeId, values) }
		default:
			return filters
	}
}

export function parseStorefrontPriceFilterValue(
	rawValue: string,
	range: { readonly min: number, readonly max: number } | undefined,
): number | undefined {
	if (rawValue.trim() === '') return undefined
	const value = Number(rawValue)
	if (!Number.isFinite(value)) return undefined
	return range === undefined ? value : Math.min(range.max, Math.max(range.min, value))
}

function isStorefrontFilterActive(
	filter: StorefrontCatalogFilter,
	filters: StorefrontProductFilters,
): boolean {
	if (filter.type === 'PRICE') return filters.priceFrom !== undefined || filters.priceTo !== undefined
	if (filter.type === 'SEARCH') return Boolean(filters.keyword)
	if (filter.type === 'SKU') return Boolean(filters.sku)
	return getSelectedStorefrontFilterValues(filter, filters).length > 0
}

export function mergeAvailableStorefrontFilters(
	current: readonly StorefrontCatalogFilter[],
	next: readonly StorefrontCatalogFilter[],
	selectedFilters: StorefrontProductFilters,
): readonly StorefrontCatalogFilter[] {
	if (current.length === 0) return next
	const nextByKey = new Map(next.map(filter => [getStorefrontFilterKey(filter), filter]))
	const merged = current.flatMap((filter) => {
		const replacement = nextByKey.get(getStorefrontFilterKey(filter))
		if (replacement !== undefined) return [replacement]
		return isStorefrontFilterActive(filter, selectedFilters) ? [filter] : []
	})
	const knownKeys = new Set(current.map(getStorefrontFilterKey))
	return [...merged, ...next.filter(filter => !knownKeys.has(getStorefrontFilterKey(filter)))]
}
