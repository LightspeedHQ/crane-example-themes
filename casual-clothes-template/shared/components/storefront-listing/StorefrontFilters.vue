<template>
	<div class="catalog-filters">
		<div v-for="filter in visibleFilters" :key="filterKey(filter)" class="catalog-filter">
			<button
				type="button"
				class="catalog-filter__trigger"
				:aria-expanded="openFilterKey === filterKey(filter)"
				:aria-controls="filterPanelId(filter)"
				@click="$emit('toggle-panel', filterKey(filter))"
			>
				{{ filterLabel(filter) }}
				<span class="catalog-filter__chevron" aria-hidden="true">⌄</span>
			</button>
			<div
				v-if="openFilterKey === filterKey(filter)"
				:id="filterPanelId(filter)"
				class="catalog-filter__panel"
				:class="{ 'catalog-filter__panel--price': filter.type === 'PRICE' }"
			>
				<template v-if="filter.type === 'PRICE'">
					<label>
						<span>{{ minimumPriceLabel }}</span>
						<input
							type="number"
							:min="filter.values?.min"
							:max="filter.values?.max"
							:value="modelValue.priceFrom"
							@change="setPrice('priceFrom', $event, filter)"
						>
					</label>
					<label>
						<span>{{ maximumPriceLabel }}</span>
						<input
							type="number"
							:min="filter.values?.min"
							:max="filter.values?.max"
							:value="modelValue.priceTo"
							@change="setPrice('priceTo', $event, filter)"
						>
					</label>
				</template>
				<label
					v-for="value in getStorefrontFilterValues(filter)"
					v-else
					:key="String(value.filterId)"
					class="catalog-filter__option">
					<input
						type="checkbox"
						:checked="isSelected(filter, value.filterId)"
						@change="toggleValue(filter, value.filterId)"
					>
					<span>{{ value.filterName || value.filterId }}</span>
					<small>{{ value.productCount }}</small>
				</label>
			</div>
		</div>
	</div>
</template>

<script setup lang="ts">
import type {
	StorefrontCatalogFilter,
	StorefrontProductFilters,
} from '@lightspeed/ecom-headless'
import { computed, useId } from 'vue'

import {
	getStorefrontFilterKey,
	getStorefrontFilterValues,
	isStorefrontFilterValueSelected,
	parseStorefrontPriceFilterValue,
	toggleStorefrontFilterValue,
} from '../../utils/storefront-listing.ts'
import type { StorefrontFilterLabels } from './storefront-listing-types.ts'

const props = defineProps<{
	filters: readonly StorefrontCatalogFilter[],
	modelValue: StorefrontProductFilters,
	labels: StorefrontFilterLabels,
	minimumPriceLabel: string,
	maximumPriceLabel: string,
	openFilterKey?: string,
}>()
const emit = defineEmits<{
	'update:modelValue': [value: StorefrontProductFilters],
	'toggle-panel': [key: string],
}>()

const componentId = useId()
const visibleFilters = computed(() => props.filters.filter(filter => filter.type !== 'SEARCH' && filter.type !== 'SKU'))

function filterKey(filter: StorefrontCatalogFilter) {
	return getStorefrontFilterKey(filter)
}

function filterPanelId(filter: StorefrontCatalogFilter) {
	return `${componentId}-filter-${encodeURIComponent(filterKey(filter))}`
}

function filterLabel(filter: StorefrontCatalogFilter) {
	if (filter.type === 'OPTION' || filter.type === 'SWATCH') return filter.optionName
	if (filter.type === 'ATTRIBUTE') return filter.attributeName
	return filter.type in props.labels
		? props.labels[filter.type as keyof StorefrontFilterLabels]
		: filter.type
}

function isSelected(filter: StorefrontCatalogFilter, value: string | number) {
	return isStorefrontFilterValueSelected(filter, props.modelValue, value)
}

function toggleValue(filter: StorefrontCatalogFilter, value: string | number) {
	emit('update:modelValue', toggleStorefrontFilterValue(props.modelValue, filter, value))
}

function setPrice(key: 'priceFrom' | 'priceTo', event: Event, filter?: StorefrontCatalogFilter) {
	const rawValue = (event.target as HTMLInputElement).value
	emit('update:modelValue', {
		...props.modelValue,
		[key]: parseStorefrontPriceFilterValue(
			rawValue,
			filter?.type === 'PRICE' ? filter.values : undefined,
		),
	})
}
</script>

<style scoped lang="scss">
.catalog-filters { display: flex; flex-wrap: wrap; align-items: center; gap: 20px; }
.catalog-filter { position: relative; }
.catalog-filter__trigger {
	display: inline-flex;
	align-items: center;
	padding: 0;
	border: 0;
	background: transparent;
	color: inherit;
	font: inherit;
	gap: 8px;
	cursor: pointer;
}
.catalog-filter__chevron { display: inline-block; transition: transform 160ms ease; }
.catalog-filter__trigger[aria-expanded='true'] .catalog-filter__chevron { transform: rotate(180deg); }
.catalog-filter__panel {
	position: absolute;
	z-index: 5;
	top: calc(100% + 10px);
	left: 0;
	display: grid;
	min-width: 220px;
	max-height: 320px;
	padding: 16px;
	border: 1px solid #d8d8d8;
	background: var(--bg-color, #fff);
	box-shadow: 0 12px 32px rgb(0 0 0 / 10%);
	gap: 12px;
	overflow: auto;
}
.catalog-filter__panel--price { width: 300px; grid-template-columns: repeat(2, minmax(0, 1fr)); }
.catalog-filter__panel label { display: grid; min-width: 0; gap: 6px; }
.catalog-filter__panel input[type='number'] {
	box-sizing: border-box;
	width: 100%;
	min-width: 0;
	padding: 8px;
	border: 1px solid #bdbdbd;
}
.catalog-filter__option { grid-template-columns: auto 1fr auto; align-items: center; }
@media (max-width: 640px) { .catalog-filter__panel { position: fixed; top: auto; right: 16px; bottom: 16px; left: 16px; } }
</style>
