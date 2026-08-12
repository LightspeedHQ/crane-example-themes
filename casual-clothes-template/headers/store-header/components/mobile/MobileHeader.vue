<template>
	<div>
		<MobileHeaderTop
			:is-menu-open="isMobileSiteMenuOpen"
			@toggle-menu="toggleMobileSiteMenu"
		/>

		<MobileHeaderActions />

		<MobileHeaderDivider v-if="hasTopActions" />

		<MobileHeaderBottom v-if="hasBottomContent" />

		<MobileSiteMenu :is-open="isMobileSiteMenuOpen" />

		<MobileCatalogOverlay
			v-if="categoriesShow.enabled"
			:is-open="isMobileCatalogOverlayOpen"
		/>
	</div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import MobileHeaderTop from './MobileHeaderTop.vue'
import MobileHeaderActions from './MobileHeaderActions.vue'
import MobileHeaderDivider from './MobileHeaderDivider.vue'
import MobileHeaderBottom from './MobileHeaderBottom.vue'
import MobileSiteMenu from './MobileSiteMenu.vue'
import MobileCatalogOverlay from './MobileCatalogOverlay.vue'
import { useHeaderToggles, useHeaderState } from '../../composables'

const {
	isMobileSiteMenuOpen,
	isMobileCatalogOverlayOpen,
	toggleMobileSiteMenu,
} = useHeaderState()

const { accountShow, wishlistShow, cartShow, searchShow, categoriesShow } = useHeaderToggles()

const hasTopActions = computed(() => {
	return accountShow.enabled || wishlistShow.enabled || cartShow.enabled
})

const hasBottomContent = computed(() => {
	return searchShow.enabled || categoriesShow.enabled
})
</script>
