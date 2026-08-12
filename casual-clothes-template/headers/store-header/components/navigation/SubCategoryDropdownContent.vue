<template>
	<div class="catalog-submenu__grid">
		<!-- Reserve SUBMENU_COLUMN_LIMIT columns for subcategories -->
		<template v-for="index in SUBMENU_COLUMN_LIMIT" :key="index">
			<div
				v-if="visibleSubcategories[index - 1]"
				class="catalog-submenu__column"
				role="group"
				:aria-label="visibleSubcategories[index - 1].name"
			>
				<!-- All subcategories are clickable links -->
				<a
					:href="visibleSubcategories[index - 1].urlPath || '#'"
					:class="['catalog-submenu__header', 'catalog-submenu__header--link']">
					{{ visibleSubcategories[index - 1].name }}
				</a>

				<div class="catalog-submenu__items">
					<a
						v-for="productCategory in (visibleSubcategories[index - 1].children || [])"
						:key="productCategory.id"
						:href="productCategory.urlPath || '#'"
						class="catalog-submenu__item">
						{{ productCategory.name }}
					</a>
				</div>
			</div>
			<div v-else class="catalog-submenu__column catalog-submenu__column--empty"></div>
		</template>

		<!-- Promo Banner Column (always in 5th position) -->
		<div class="catalog-submenu__column catalog-submenu__column--promo">
			<CatalogPromoBanner />
		</div>
	</div>
</template>

<script setup lang="ts">
import { toRef } from 'vue'
import type { Category } from '../../types'
import { useVisibleSubcategories, useHeaderDesign } from '../../composables'
import CatalogPromoBanner from '../catalog/CatalogPromoBanner.vue'
import { SUBMENU_COLUMN_LIMIT } from '../../constants'
interface CategoryProps {
  category: Category | null;
}
const props = defineProps<CategoryProps>()

const visibleSubcategories = useVisibleSubcategories(toRef(props, 'category'))
const { headerTextColor } = useHeaderDesign()

</script>

<style scoped lang="scss">
@use '../../constants' as c;

.catalog-submenu__grid {
  display: grid;
  grid-template-columns: repeat(#{c.$SUBMENU_GRID_COLUMNS}, 1fr);
  gap: 20px;
  align-items: start;
}

.catalog-submenu__column {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;
  gap: 10px;
  min-width: 0;
  /* Prevent overflow */
}

.catalog-submenu__column--empty {
  /* Empty placeholder column to maintain grid layout */
  visibility: hidden;
}

.catalog-submenu__column--promo {
  /* Promo banner should stretch to fill the column */
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: stretch;
}

.catalog-submenu__header {
  color: v-bind(headerTextColor);
  font-family: var(--header-font-family, var(--body-font-family));
  font-size: var(--header-font-size, inherit);
  font-style: inherit;
  font-weight: 700;
  /* Intentionally bold for category headers */
  line-height: 150%;
  letter-spacing: -0.08px;
  /* Text truncation */
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  max-width: 100%;
}

.catalog-submenu__header--link {
  text-decoration: none;
  transition: color 0.2s ease, opacity 0.2s ease;
  display: block;
  cursor: pointer;

  &:hover {
    opacity: 0.8;
  }

  &:focus-visible {
    outline: 2px solid currentColor;
    outline-offset: 2px;
  }

  &:active {
    opacity: 0.6;
  }
}

.catalog-submenu__items {
  display: flex;
  flex-direction: column;
  gap: 8px;
  min-width: 0;
  /* Allow flex items to shrink below content size */
  width: 100%;
  /* Constrain to parent width */
}

.catalog-submenu__item {
  color: v-bind(headerTextColor);
  font-family: var(--header-font-family, var(--body-font-family));
  font-size: var(--header-font-size, inherit);
  font-style: inherit;
  font-weight: inherit;
  line-height: 150%;
  letter-spacing: -0.08px;
  text-decoration: none;
  display: block;
  transition: color 0.2s ease, opacity 0.2s ease;
  cursor: pointer;
  /* Text truncation */
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  max-width: 100%;

  &:hover {
    opacity: 0.8;
  }

  &:focus-visible {
    outline: 2px solid currentColor;
    outline-offset: 2px;
  }

  &:active {
    opacity: 0.6;
  }
}
</style>
