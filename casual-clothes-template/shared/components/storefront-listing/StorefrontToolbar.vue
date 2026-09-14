<template>
	<div ref="toolbarRef" class="catalog-toolbar" @keydown.esc.stop.prevent="closeMenuAndRestoreFocus">
		<div class="catalog-toolbar__filters">
			<strong>{{ filterByLabel }}</strong>
			<StorefrontFilters
				:filters="filters"
				:model-value="modelValue"
				:labels="filterLabels"
				:minimum-price-label="minimumPriceLabel"
				:maximum-price-label="maximumPriceLabel"
				:open-filter-key="openMenu"
				@update:model-value="$emit('update:modelValue', $event)"
				@toggle-panel="toggleMenu"
			/>
		</div>
		<div class="catalog-toolbar__right">
			<div class="catalog-toolbar__result">{{ resultLabel }}</div>
			<div class="catalog-toolbar__sort">
				<button
					type="button"
					class="catalog-toolbar__sort-trigger"
					:aria-expanded="openMenu === SORT_MENU_KEY"
					:aria-controls="sortMenuId"
					@click="toggleMenu(SORT_MENU_KEY)"
				>
					{{ sortByLabel }}
					<span class="catalog-toolbar__chevron" aria-hidden="true">⌄</span>
				</button>
				<div
					v-if="openMenu === SORT_MENU_KEY"
					:id="sortMenuId"
					class="catalog-toolbar__sort-menu"
					role="group"
					:aria-label="sortByLabel"
				>
					<button
						v-for="option in sortOptions"
						:key="option.value"
						type="button"
						:aria-pressed="option.value === sortBy"
						@click="selectSort(option.value)"
					>{{ option.label }}</button>
				</div>
			</div>
		</div>
	</div>
</template>

<script setup lang="ts">
import type {
	StorefrontCatalogFilter,
	StorefrontCatalogProductSortOrder,
	StorefrontProductFilters,
} from '@lightspeed/ecom-headless'
import { onMounted, onUnmounted, ref, useId } from 'vue'

import StorefrontFilters from './StorefrontFilters.vue'
import type { StorefrontFilterLabels, StorefrontSortOption } from './storefront-listing-types.ts'

defineProps<{
	filters: readonly StorefrontCatalogFilter[],
	modelValue: StorefrontProductFilters,
	sortBy: StorefrontCatalogProductSortOrder,
	sortOptions: readonly StorefrontSortOption[],
	filterLabels: StorefrontFilterLabels,
	filterByLabel: string,
	minimumPriceLabel: string,
	maximumPriceLabel: string,
	resultLabel: string,
	sortByLabel: string,
}>()
const emit = defineEmits<{
	'update:modelValue': [value: StorefrontProductFilters],
	'update:sortBy': [value: StorefrontCatalogProductSortOrder],
}>()

const SORT_MENU_KEY = 'sort'
const toolbarRef = ref<HTMLElement>()
const openMenu = ref<string>()
const sortMenuId = `${useId()}-sort-options`

function toggleMenu(key: string) {
	openMenu.value = openMenu.value === key ? undefined : key
}

function selectSort(value: StorefrontCatalogProductSortOrder) {
	openMenu.value = undefined
	emit('update:sortBy', value)
}

function closeMenuAndRestoreFocus() {
	const expandedTrigger = toolbarRef.value?.querySelector<HTMLButtonElement>('[aria-expanded="true"]')
	openMenu.value = undefined
	expandedTrigger?.focus()
}

function closeOnOutsideClick(event: PointerEvent) {
	const toolbar = toolbarRef.value
	if (toolbar !== undefined && !event.composedPath().includes(toolbar)) openMenu.value = undefined
}

onMounted(() => globalThis.document.addEventListener('pointerdown', closeOnOutsideClick))
onUnmounted(() => globalThis.document.removeEventListener('pointerdown', closeOnOutsideClick))
</script>

<style scoped lang="scss">
.catalog-toolbar {
	display: grid;
	grid-template-columns: minmax(0, 1fr) auto;
	align-items: center;
	padding-block: 18px;
	gap: 24px;
	font-size: 14px;
}
.catalog-toolbar__filters,
.catalog-toolbar__right { display: flex; align-items: center; gap: 16px; }
.catalog-toolbar__right { color: var(--fg-muted-color, #767676); }
.catalog-toolbar__sort { position: relative; }
.catalog-toolbar__sort-trigger {
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
.catalog-toolbar__chevron { display: inline-block; transition: transform 160ms ease; }
.catalog-toolbar__sort-trigger[aria-expanded='true'] .catalog-toolbar__chevron { transform: rotate(180deg); }
.catalog-toolbar__sort-menu {
	position: absolute;
	z-index: 5;
	top: calc(100% + 10px);
	right: 0;
	display: grid;
	min-width: 190px;
	padding: 8px;
	border: 1px solid #d8d8d8;
	background: var(--bg-color, #fff);
	box-shadow: 0 12px 32px rgb(0 0 0 / 10%);
}
.catalog-toolbar__sort-menu button {
	padding: 8px;
	border: 0;
	background: transparent;
	color: var(--fg-color, #191919);
	font: inherit;
	text-align: left;
	cursor: pointer;
}
.catalog-toolbar__sort-menu button:hover,
.catalog-toolbar__sort-menu button[aria-pressed='true'] { background: var(--container-bg-color, #f0ede5); }
@media (max-width: 850px) {
	.catalog-toolbar { align-items: start; }
	.catalog-toolbar__right { align-items: flex-end; flex-direction: column; }
}
@media (max-width: 560px) {
	.catalog-toolbar { grid-template-columns: 1fr; align-items: start; }
	.catalog-toolbar__right { align-items: flex-start; }
}
</style>
