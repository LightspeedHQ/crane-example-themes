<template>
	<header class="custom-header" role="banner" :style="headerVars">
		<KeyInfoBar v-if="keyInfoBarShow.enabled" />
		<MobileHeader class="mobile-header" />

		<div class="desktop-header">
			<nav class="header-navigation" role="navigation">
				<div class="header-container">
					<HeaderTopRow />
				</div>
				<div v-if="hasBottomRowContent" class="navigation-menu-spacer"></div>
				<div v-if="hasBottomRowContent" class="header-container">
					<HeaderBottomRow />
				</div>
			</nav>
		</div>

		<CatalogOverlay :is-open="isCatalogOverlayOpen" :category="selectedCategory" />

		<FindStoreOverlay :is-open="isFindStoreOpen" />

		<CustomerCareOverlay :is-open="isCustomerCareOpen" />

		<SearchOverlay :is-open="isSearchOverlayOpen" />

		<div id="portal-target"></div>
	</header>
</template>

<script setup lang="ts">
import { computed } from 'vue'

import KeyInfoBar from './components/layout/KeyInfoBar.vue'
import HeaderTopRow from './components/layout/HeaderTopRow.vue'
import HeaderBottomRow from './components/layout/HeaderBottomRow.vue'
import MobileHeader from './components/mobile/MobileHeader.vue'
import CatalogOverlay from './components/catalog/CatalogOverlay.vue'
import FindStoreOverlay from './components/locations/FindStoreOverlay.vue'
import CustomerCareOverlay from './components/customer-care/CustomerCareOverlay.vue'
import SearchOverlay from './components/user/SearchOverlay.vue'
import {
	useHeaderToggles,
	useHeaderDesign,
	useHeaderViewport,
	useBodyScrollLock,
	useHeaderState,
} from './composables'

const {
	isCatalogOpen: isCatalogOverlayOpen,
	selectedCategory,
	isFindStoreOpen,
	isCustomerCareOpen,
	isSearchOverlayOpen,
} = useHeaderState()

const { isDesktop } = useHeaderViewport()
useBodyScrollLock(
	[isCatalogOverlayOpen, isFindStoreOpen, isCustomerCareOpen, isSearchOverlayOpen],
	isDesktop,
)

const { keyInfoBarShow, searchShow, categoriesShow } = useHeaderToggles()
const { headerVars } = useHeaderDesign()

const hasBottomRowContent = computed(() => {
	return searchShow.enabled || categoriesShow.enabled
})
</script>

<style scoped lang="scss">
@use './constants' as c;

// Global focus-visible styles for keyboard navigation accessibility
// Uses :deep() to apply to all child components
:deep(*:focus-visible) {
	outline: 2px solid currentColor;
	outline-offset: 2px;
}

.custom-header {
	display: flex;
	flex-direction: column;
	background-color: var(--header-background, var(--bg-color));
	color: var(--header-color, var(--fg-color));
	font-family: var(--header-font-family, var(--body-font-family));
	font-weight: var(--header-font-weight, var(--body-font-weight));
	font-style: var(--header-font-style, var(--body-font-style));
	font-size: var(--header-font-size, var(--body-2-font-size));
}

.header-navigation {
	display: flex;
	flex-direction: column;
}

.header-container {
	--container-padding: 20px;

	margin: 0 auto;
	padding: 0 var(--container-padding);
	width: 100%;
	display: grid;
	grid-template-columns: 1fr;
	gap: 0;

	@media (max-width: c.$MOBILE_MAX_WIDTH) {
		--container-padding: 16px;
	}
}

.navigation-menu-spacer {
	height: 1px;
	background-color: #dbdbdb;
}

.mobile-header {
	display: none;
	flex-direction: column;
	/* Inherit background, color, and font from parent .custom-header */
	line-height: 150%;
	letter-spacing: -0.08px;

	@media (max-width: c.$MOBILE_STORE_HEADER_BREAKPOINT) {
		display: flex;
	}
}

.desktop-header {
	display: block;

	@media (max-width: c.$MOBILE_STORE_HEADER_BREAKPOINT) {
		display: none;
	}
}

#portal-target {
	z-index: 12000;
}
</style>
