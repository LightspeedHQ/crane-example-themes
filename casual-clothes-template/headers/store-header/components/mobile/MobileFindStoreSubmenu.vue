<template>
	<FullScreenOverlay
		:is-open="isOpen"
		:keep-mounted-when-closed="true"
		:background-color="headerBackgroundColor"
		:text-color="headerTextColor"
		:preset-vars="headerPresetVars"
		@close="closeFindStore"
	>
		<div class="mobile-find-store-submenu">
			<div class="mobile-find-store-submenu__header">
				<button class="mobile-find-store-submenu__back-btn" @click="closeFindStore" :aria-label="backLabel">
					<span class="mobile-find-store-submenu__back-icon" v-html="BackArrowIcon"></span>
					<span class="mobile-find-store-submenu__title">{{ backLabel }}</span>
				</button>
				<button class="mobile-find-store-submenu__close-btn" @click="closeAllFindStore" :aria-label="closeLabel">
					<span class="mobile-find-store-submenu__close-icon" v-html="CloseIcon"></span>
				</button>
			</div>

			<div class="mobile-find-store-submenu__content">
				<Locations />
			</div>
		</div>
	</FullScreenOverlay>
</template>

<script setup lang="ts">
import type { OverlayProps } from '../../types/common'
import { FullScreenOverlay } from '../ui/overlay'
import { useHeaderTranslations, useHeaderDesign, useHeaderState } from '../../composables'
import BackArrowIcon from '../../assets/back-arrow.svg?raw'
import CloseIcon from '../../../../shared/assets/close-icon.svg?raw'
import Locations from '../locations/Locations.vue'

defineProps<OverlayProps>()

const { closeFindStore, closeAllFindStore } = useHeaderState()

const { translate } = useHeaderTranslations()
const { headerBackgroundColor, headerTextColor, headerPresetVars } = useHeaderDesign()
const backLabel = translate('$label.aria.back', 'Back')
const closeLabel = translate('$label.aria.close', 'Close')
</script>

<style scoped lang="scss">
.mobile-find-store-submenu {
  display: flex;
  flex-direction: column;
  height: 100%;
  width: 100%;
}

.mobile-find-store-submenu__header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  align-self: stretch;
  padding-bottom: 32px;
  flex-shrink: 0;
}

.mobile-find-store-submenu__back-btn {
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

.mobile-find-store-submenu__back-icon {
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

.mobile-find-store-submenu__title {
  color: v-bind(headerTextColor);
  font-family: var(--header-font-family, var(--body-font-family));
  font-size: inherit;
  font-style: inherit;
  font-weight: inherit;
  line-height: 24px;
}

.mobile-find-store-submenu__close-btn {
  display: flex;
  align-items: center;
  justify-content: center;
  color: v-bind(headerTextColor);
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

.mobile-find-store-submenu__close-icon {
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

.mobile-find-store-submenu__content {
  flex: 1;
  min-height: 0; // Allow child to handle scrolling
  display: flex;
  flex-direction: column;
}
</style>
