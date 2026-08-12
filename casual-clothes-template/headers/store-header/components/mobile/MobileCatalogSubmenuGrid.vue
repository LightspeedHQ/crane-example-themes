<template>
	<div class="mobile-catalog-submenu-grid">
		<div
			v-for="subcategory in visibleSubcategories"
			:key="subcategory.id"
			class="mobile-catalog-submenu-grid__column"
		>
			<!-- All subcategories are clickable links -->
			<a
				:href="subcategory.urlPath || '#'"
				class="mobile-catalog-submenu-grid__header-cell mobile-catalog-submenu-grid__header-cell--link"
				@click="closeAllCatalogs"
			>
				{{ subcategory.name }}
			</a>

			<div
				v-if="subcategory.children && subcategory.children.length > 0"
				class="mobile-catalog-submenu-grid__separator"
			></div>

			<div
				v-if="subcategory.children && subcategory.children.length > 0"
				class="mobile-catalog-submenu-grid__items"
			>
				<a
					v-for="productCategory in subcategory.children"
					:key="productCategory.id"
					:href="productCategory.urlPath || '#'"
					class="mobile-catalog-submenu-grid__item"
					@click="closeAllCatalogs"
				>
					{{ productCategory.name }}
				</a>
			</div>
		</div>
	</div>
</template>

<script setup lang="ts">
import { toRef } from 'vue'
import type { Category } from '../../types'
import { useVisibleSubcategories, useHeaderDesign, useHeaderState } from '../../composables'

const props = defineProps<{
	category: Category | null
}>()

const { closeAllCatalogs } = useHeaderState()

const { headerTextColor } = useHeaderDesign()
const visibleSubcategories = useVisibleSubcategories(toRef(props, 'category'))
</script>

<style scoped lang="scss">
.mobile-catalog-submenu-grid {
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: flex-start;
  gap: 32px;
  align-self: stretch;
  flex: 0 0 auto;
  padding-bottom: 16px;
  overflow-y: auto;
  scrollbar-width: thin;
  scrollbar-color: #888 #f1f1f1;

  &::-webkit-scrollbar {
    width: 6px;
  }

  &::-webkit-scrollbar-track {
    background: #f1f1f1;
  }

  &::-webkit-scrollbar-thumb {
    background: #888;
    border-radius: 3px;

    &:hover {
      background: #555;
    }
  }
}

.mobile-catalog-submenu-grid__column {
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: flex-start;
  gap: 16px;
  align-self: stretch;
  flex: 0 0 auto;
}

.mobile-catalog-submenu-grid__header-cell {
  color: v-bind(headerTextColor);
  font-family: var(--header-font-family, var(--body-font-family));
  font-size: inherit;
  font-style: inherit;
  font-weight: 700;
  line-height: 150%;
  align-self: stretch;
  flex: 0 0 auto;
  position: relative;
  text-decoration: none;
  cursor: default;

  &--link {
    cursor: pointer;
    transition: opacity 0.2s ease;

    &:hover {
      opacity: 0.8;
    }

    &:active {
      opacity: 0.6;
    }

    &:focus-visible {
      outline: 2px solid currentColor;
      outline-offset: 2px;
    }
  }
}

.mobile-catalog-submenu-grid__separator {
  height: 1px;
  background: v-bind(headerTextColor);
  opacity: 0.16;
  align-self: stretch;
  flex: 0 0 auto;
}

.mobile-catalog-submenu-grid__items {
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: flex-start;
  gap: 16px;
  align-self: stretch;
  flex: 0 0 auto;
}

.mobile-catalog-submenu-grid__item {
  color: v-bind(headerTextColor);
  font-family: var(--header-font-family, var(--body-font-family));
  font-size: inherit;
  font-style: inherit;
  font-weight: inherit;
  line-height: 150%;
  align-self: stretch;
  flex: 0 0 auto;
  position: relative;
  text-decoration: none;
  cursor: pointer;
  transition: opacity 0.2s ease;

  &:hover {
    opacity: 0.8;
  }

  &:active {
    opacity: 0.6;
  }

  &:focus-visible {
    outline: 2px solid currentColor;
    outline-offset: 2px;
  }
}
</style>
