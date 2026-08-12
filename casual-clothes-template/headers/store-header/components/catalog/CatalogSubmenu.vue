<template>
	<Teleport to="body" v-if="isMounted">
		<div v-if="isOpen" :style="headerPresetVars">
			<div class="catalog-submenu-overlay" @click="closeCatalog" />
			<div
				class="catalog-submenu-overlay__content"
				:style="{ top: catalogSubmenuTopOffset }"
				@mouseleave="onMouseLeave">
				<div class="catalog-submenu__grid">
					<!-- Reserve 4 columns for subcategories -->
					<template v-for="index in 4" :key="index">
						<div v-if="visibleSubcategories[index - 1]" class="catalog-submenu__column">
							<!-- All subcategories are clickable links -->
							<a
								:href="visibleSubcategories[index - 1].urlPath || '#'"
								:class="['catalog-submenu__header', 'catalog-submenu__header--link']"
								@click="closeCatalog">
								{{ visibleSubcategories[index - 1].name }}
							</a>

							<div class="catalog-submenu__items">
								<a
									v-for="productCategory in (visibleSubcategories[index - 1].children || [])"
									:key="productCategory.id"
									:href="productCategory.urlPath || '#'"
									class="catalog-submenu__item"
									@click="closeCatalog">
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
			</div>
		</div>
	</Teleport>
</template>

<script setup lang="ts">
import { toRef } from 'vue'
import { useMounted } from '@vueuse/core'
import type { CatalogOverlayProps } from '../../types'
import { useVisibleSubcategories, useEscapeKey, useHeaderDesign, useSubmenuPosition, useHeaderViewport, useHeaderState } from '../../composables'
import CatalogPromoBanner from './CatalogPromoBanner.vue'

const props = defineProps<CatalogOverlayProps>()

const isMounted = useMounted()

// SSR-safe viewport detection
const { isDesktop } = useHeaderViewport()
const { closeCatalog } = useHeaderState()

const onMouseLeave = () => {
	if (isDesktop.value) {
		closeCatalog()
	}
}

const visibleSubcategories = useVisibleSubcategories(toRef(props, 'category'))
const { headerBackgroundColor, headerTextColor, headerPresetVars } = useHeaderDesign()

// Calculate submenu position dynamically
const { submenuTopOffset: catalogSubmenuTopOffset } = useSubmenuPosition(() => props.isOpen)

// Handle Escape key to close submenu
useEscapeKey(
	() => closeCatalog(),
	() => props.isOpen,
)
</script>

<style scoped lang="scss">
@use '../../constants' as c;

.catalog-submenu-overlay {
  position: fixed;
  inset: 0;
  background-color: transparent;
}

.catalog-submenu-overlay__content {
  position: fixed;
  left: 0;
  right: 0;
  background-color: v-bind(headerBackgroundColor);
  box-shadow: 0 8px 16px 0 rgba(0, 0, 0, 0.2);
  padding: 16px;
  z-index: c.$Z_INDEX_CATALOG_CONTENT;
  max-height: 80vh;
  overflow-y: auto;
}

.catalog-submenu__grid {
  display: grid;
  grid-template-columns: repeat(5, 1fr);
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
  font-size: inherit;
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

  &:focus {
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
  font-size: inherit;
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

  &:focus {
    outline: 2px solid currentColor;
    outline-offset: 2px;
  }

  &:active {
    opacity: 0.6;
  }
}
</style>
