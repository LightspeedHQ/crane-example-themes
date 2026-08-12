<template>
	<div class="mobile-catalog-submenu-header">
		<button
			class="mobile-catalog-submenu-header__back-btn"
			@click="closeCatalog"
			:aria-label="backLabel"
		>
			<span class="mobile-catalog-submenu-header__back-icon" v-html="BackArrowIcon"></span>
			<span class="mobile-catalog-submenu-header__title">{{ catalogLabel }}</span>
		</button>
		<a
			:href="searchUrl"
			class="mobile-catalog-submenu-header__search-btn"
			@click="closeAllCatalogs"
			:aria-label="searchLabel"
		>
			<span class="mobile-catalog-submenu-header__search-icon" v-html="SearchIcon"></span>
		</a>
	</div>
</template>

<script setup lang="ts">
import { useHeaderTranslations, useHeaderDesign, useHeaderState } from '../../composables'
import backArrowSvg from '../../assets/back-arrow.svg?raw'
import searchIconSvg from '../../assets/search-icon.svg?raw'

const BackArrowIcon = backArrowSvg
const SearchIcon = searchIconSvg

const { closeCatalog, closeAllCatalogs } = useHeaderState()

const { translations, makeUrlLanguageAware } = useHeaderTranslations()
const { headerTextColor } = useHeaderDesign()

const catalogLabel = translations.catalog
const backLabel = translations.back
const searchLabel = translations.search
const searchUrl = makeUrlLanguageAware('/products/search')
</script>

<style scoped lang="scss">
.mobile-catalog-submenu-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  align-self: stretch;
  padding-bottom: 32px;
  flex-shrink: 0;
}

.mobile-catalog-submenu-header__back-btn {
  display: flex;
  align-items: center;
  gap: 4px;
  color: v-bind(headerTextColor);
  font-weight: inherit;
  cursor: pointer;
  background: none;
  border: none;
  padding: 8px;
  border-radius: 4px;
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

.mobile-catalog-submenu-header__back-icon {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 24px;
  height: 24px;

  :deep(svg) {
    width: 100%;
    height: 100%;
    color: v-bind(headerTextColor);
  }
}

.mobile-catalog-submenu-header__title {
  color: v-bind(headerTextColor);
  font-family: var(--header-font-family, var(--body-font-family));
  font-size: inherit;
  font-style: inherit;
  font-weight: inherit;
  line-height: 24px;
}

.mobile-catalog-submenu-header__search-btn {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 4px;
  color: v-bind(headerTextColor);
  font-weight: inherit;
  cursor: pointer;
  text-decoration: none;
  padding: 8px;
  border-radius: 4px;
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

.mobile-catalog-submenu-header__search-icon {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 24px;
  height: 24px;

  :deep(svg) {
    width: 100%;
    height: 100%;
    color: v-bind(headerTextColor);
  }
}
</style>
