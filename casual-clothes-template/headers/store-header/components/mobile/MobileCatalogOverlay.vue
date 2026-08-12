<template>
	<FullScreenOverlay
		:is-open="isOpen"
		:background-color="headerBackgroundColor"
		:text-color="headerTextColor"
		:preset-vars="headerPresetVars"
		@close="closeMobileCatalogOverlay"
	>
		<div class="catalog-overlay">
			<div class="catalog-overlay__header">
				<button
					class="catalog-overlay__close"
					:aria-label="closeCatalogLabel"
					@click="closeMobileCatalogOverlay"
				>
					<span class="catalog-overlay__close-icon" v-html="CloseIcon"></span>
				</button>
				<Search v-if="searchShow.enabled" :icon-only="true" />
			</div>

			<div class="catalog-overlay__content">
				<div class="catalog-overlay__categories">
					<Categories />
				</div>

				<div class="catalog-overlay__promo">
					<CatalogPromoBanner />
				</div>
			</div>
		</div>
	</FullScreenOverlay>
</template>

<script setup lang="ts">
import Search from '../user/Search.vue'
import Categories from '../navigation/Categories.vue'
import CatalogPromoBanner from '../catalog/CatalogPromoBanner.vue'
import { FullScreenOverlay } from '../ui/overlay'
import type { OverlayProps } from '../../types/common'
import { useHeaderToggles, useHeaderDesign, useHeaderTranslations, useHeaderState } from '../../composables'
import CloseIcon from '../../../../shared/assets/close-icon.svg?raw'

defineProps<OverlayProps>()

const { closeMobileCatalogOverlay } = useHeaderState()

const { searchShow } = useHeaderToggles()
const { headerBackgroundColor, headerTextColor, headerPresetVars } = useHeaderDesign()
const { translate } = useHeaderTranslations()
const closeCatalogLabel = translate('$label.aria.close_catalog', 'Close catalog')
</script>

<style scoped lang="scss">
.catalog-overlay {
  display: flex;
  flex-direction: column;
  height: 100%;
  width: 100%;
}

.catalog-overlay__header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  align-self: stretch;
  padding-bottom: 32px;
  flex-shrink: 0;
}

.catalog-overlay__close {
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

.catalog-overlay__close-icon {
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

.catalog-overlay__content {
  min-height: 0;
  display: flex;
  flex-direction: column;
}

.catalog-overlay__categories {
  display: flex;
  flex-direction: column;
  gap: 24px;
  width: 100%;
  flex: 1 0 auto;
  overflow-y: auto;
  margin-bottom: 32px;
}

.catalog-overlay__promo {
  display: flex;
  justify-content: center;
  width: 100%;
  flex: 1 0 auto;
}
</style>
