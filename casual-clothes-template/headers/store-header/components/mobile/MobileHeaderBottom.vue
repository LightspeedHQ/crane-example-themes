<template>
	<div v-if="hasContent" class="mobile-header-bottom__wrapper">
		<div class="mobile-header-bottom">
			<button
				v-if="categoriesShow.enabled"
				class="mobile-header-bottom__catalog-btn"
				@click="toggleMobileCatalogOverlay"
			>
				{{ catalogLabel }}
			</button>
			<Search v-if="searchShow.enabled" />
		</div>
	</div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import Search from '../user/Search.vue'
import { useHeaderToggles, useHeaderTranslations, useHeaderDesign, useHeaderState } from '../../composables'

const { toggleMobileCatalogOverlay } = useHeaderState()

const { searchShow, categoriesShow } = useHeaderToggles()
const { translations } = useHeaderTranslations()
const { headerTextColor } = useHeaderDesign()

const catalogLabel = translations.catalog

const hasContent = computed(() => {
	return searchShow.enabled || categoriesShow.enabled
})
</script>

<style scoped lang="scss">
@use '../../constants' as c;

.mobile-header-bottom__wrapper {
  display: flex;
  justify-content: center;
  width: 100%;

  > * {
    width: 100%;
    max-width: c.$MOBILE_MAX_WIDTH;
  }
}

.mobile-header-bottom {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 16px;
}

.mobile-header-bottom__catalog-btn {
  background: none;
  border: none;
  color: v-bind(headerTextColor);
  font-family: var(--header-font-family, var(--body-font-family));
  font-weight: 700;
  font-size: var(--header-font-size, inherit);
  cursor: pointer;
  padding: 0;
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
