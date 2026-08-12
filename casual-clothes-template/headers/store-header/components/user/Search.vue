<template>
	<button
		v-if="iconOnly"
		type="button"
		class="search search--icon-only"
		:aria-label="ariaLabel"
		:aria-expanded="isSearchOverlayOpen"
		@click="toggleSearchOverlay"
	>
		<span class="search-icon" v-html="currentIcon"></span>
	</button>
	<button
		v-else
		type="button"
		class="search search--full"
		:aria-label="ariaLabel"
		:aria-expanded="isSearchOverlayOpen"
		@click="toggleSearchOverlay"
	>
		<span class="search-text">{{ searchText }}</span>
		<span class="search-icon" v-html="currentIcon"></span>
	</button>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import type { IconOnlyProps } from '../../types'
import { useHeaderTranslations, useHeaderDesign, useHeaderState } from '../../composables'
import SearchIcon from '../../assets/search-icon.svg?raw'
import CloseIcon from '../../../../shared/assets/close-icon.svg?raw'

withDefaults(defineProps<IconOnlyProps>(), {
	iconOnly: false,
})

const { translations, translate } = useHeaderTranslations()
const { headerTextColor } = useHeaderDesign()
const { isSearchOverlayOpen, toggleSearchOverlay } = useHeaderState()

const searchText = translations.search
const closeLabel = translate('$label.aria.close_search', 'Close search')

const currentIcon = computed(() => (isSearchOverlayOpen.value ? CloseIcon : SearchIcon))
const ariaLabel = computed(() => (isSearchOverlayOpen.value ? closeLabel : searchText))
</script>

<style scoped>
.search {
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
}

.search:hover {
  opacity: 0.8;
}

.search:active {
  opacity: 0.6;
}

.search:focus-visible {
  outline: 2px solid currentColor;
  outline-offset: 2px;
}

.search--icon-only {
  justify-content: center;
}

.search-icon {
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

.search-text {
  color: v-bind(headerTextColor);
  font-family: var(--header-font-family, var(--body-font-family));
  font-size: var(--header-font-size, inherit);
  font-style: inherit;
  font-weight: 700; /* Intentionally bold for emphasis */
  line-height: 150%;
  letter-spacing: -0.08px;
}
</style>
