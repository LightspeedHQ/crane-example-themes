<template>
	<FullScreenOverlay
		:is-open="isOpen"
		:background-color="headerBackgroundColor"
		:text-color="headerTextColor"
		:preset-vars="headerPresetVars"
		@close="closeMobileSiteMenu"
	>
		<div class="mobile-site-menu__header">
			<div class="mobile-site-menu__language">
				<LanguageSelector v-if="languageSwitcherShow.enabled" />
			</div>
			<button class="mobile-site-menu__close" :aria-label="closeMobileMenuLabel" @click="closeMobileSiteMenu">
				<span class="mobile-site-menu__close-icon" v-html="CloseIcon"></span>
			</button>
		</div>

		<div class="mobile-site-menu__content">
			<MobileNavigationMenu />
		</div>
	</FullScreenOverlay>
</template>

<script setup lang="ts">
import LanguageSelector from '../user/LanguageSelector.vue'
import MobileNavigationMenu from './MobileNavigationMenu.vue'
import { FullScreenOverlay } from '../ui/overlay'
import type { OverlayProps } from '../../types/common'
import { useHeaderToggles, useHeaderDesign, useHeaderTranslations, useHeaderState } from '../../composables'
import CloseIcon from '../../../../shared/assets/close-icon.svg?raw'

defineProps<OverlayProps>()

const { closeMobileSiteMenu } = useHeaderState()

const { translate } = useHeaderTranslations()
const { languageSwitcherShow } = useHeaderToggles()
const { headerBackgroundColor, headerTextColor, headerPresetVars } = useHeaderDesign()
const closeMobileMenuLabel = translate('$label.aria.close_mobile_menu', 'Close mobile menu')
</script>

<style scoped lang="scss">
.mobile-site-menu__header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: 100%;
}

.mobile-site-menu__language {
    color: v-bind(headerTextColor);
    font-weight: inherit;
    text-transform: uppercase;
}

.mobile-site-menu__close {
    background: none;
    border: none;
    cursor: pointer;
    padding: 8px;
    border-radius: 4px;
    transition: opacity 0.2s ease;
    color: v-bind(headerTextColor);

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

.mobile-site-menu__close-icon {
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

.mobile-site-menu__content {
    display: flex;
    flex-direction: column;
    gap: 24px;
    flex: 1;
    overflow-y: auto;
    width: 100%;
    justify-content: flex-start;
    align-items: flex-start;
    align-self: stretch;
}
</style>
