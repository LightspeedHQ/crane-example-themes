<template>
	<ul class="navigation-menu__list">
		<li v-if="hasLocations">
			<DropdownPortalMenu>
				<template #trigger="{ isDropdownOpen }">
					<button
						type="button"
						class="navigation-menu__item navigation-menu__button"
						:class="{ 'navigation-menu__item--active': isDropdownOpen }"
						:aria-expanded="isDropdownOpen"
						:aria-haspopup="true"
						@mouseenter="maybeCloseSearchOverlay"
					>
						{{ locationsLinkContent.value }}
					</button>
				</template>
				<template #content>
					<div
						:style="{'background-color': headerBackgroundColor}">
						<Locations/>
					</div>
				</template>
			</DropdownPortalMenu>
		</li>
		<li v-if="hasCustomerCare">
			<DropdownPortalMenu>
				<template #trigger="{ isDropdownOpen }">
					<button
						type="button"
						class="navigation-menu__item navigation-menu__button"
						:class="{ 'navigation-menu__item--active': isDropdownOpen }"
						@mouseenter="maybeCloseSearchOverlay"
						:aria-expanded="isDropdownOpen"
						:aria-haspopup="true"
					>
						{{ customerCareTitle }}
					</button>
				</template>
				<template #content>
					<div
						:style="{'background-color': headerBackgroundColor}">
						<CustomerCare />
					</div>
				</template>
			</DropdownPortalMenu>
		</li>
		<li class="navigation-menu__item">
			<NavigationLink :text="aboutLinkContent.title || ''" :url="aboutLinkContent.link || ''" />
		</li>
	</ul>
</template>

<script setup lang="ts">
import { useButtonElementContent, useInputboxElementContent } from '@lightspeed/crane'
import NavigationLink from '../ui/navigation-link'
import { Content } from '../../type'
import { useLocations, useCustomerCare, useHeaderDesign, useHeaderState, useHeaderViewport } from '../../composables'
import CustomerCare from '../customer-care/CustomerCare.vue'
import Locations from '../locations/Locations.vue'
import { DropdownPortalMenu } from '../ui/dropdown'

const { hasLocations } = useLocations()
const { hasCustomerCare, customerCareTitle } = useCustomerCare()

const locationsLinkContent = useInputboxElementContent<Content>('HeaderLocationsLink')
const aboutLinkContent = useButtonElementContent<Content>('HeaderAboutLink')

const { headerBackgroundColor } = useHeaderDesign()
const { isSearchOverlayOpen, closeSearchOverlay } = useHeaderState()
const { isDesktop } = useHeaderViewport()

function maybeCloseSearchOverlay() {
	if (isSearchOverlayOpen.value && isDesktop.value) {
		closeSearchOverlay()
	}
}

</script>

<style scoped lang="scss">
@use '../../constants' as c;

.navigation-menu__list {
  display: flex;
  gap: clamp(16px, 2rem, 32px);
  list-style: none;
  margin: 0;
  padding: 0;
  align-items: center;

  @media (max-width: c.$MOBILE_STORE_HEADER_BREAKPOINT) {
    flex-direction: column;
    justify-content: center;
    align-items: flex-start;
    gap: 24px;
  }
}

.navigation-menu__item {
  display: flex;
  align-items: center;
  position: relative;
}

.navigation-menu__item::after {
  content: '';
  position: absolute;
  bottom: -2px;
  left: 0;
  width: 0;
  height: 2px;
  background-color: currentColor;
  transition: width 0.3s ease;
}

.navigation-menu__item:hover::after {
  width: 100%;
}

.navigation-menu__item--active::after {
  width: 100%;
}

.navigation-menu__button {
  background: none;
  border: none;
  color: inherit;
  font-family: inherit;
  font-size: inherit;
  font-weight: inherit;
  cursor: pointer;
  padding: 0;
  text-decoration: none;
  display: inline-flex;
  align-items: center;
  transition: opacity 0.2s ease;

  &:hover {
    opacity: 0.8;
  }

  &:focus-visible {
    outline: 2px solid currentColor;
    outline-offset: 2px;
  }

  &:active {
    opacity: 0.6;
  }
}

.customer-care-submenu-overlay__content {
  box-shadow: 0 8px 16px 0 rgba(0, 0, 0, 0.2);
  padding: 16px;
  overflow-y: auto;
}
</style>
