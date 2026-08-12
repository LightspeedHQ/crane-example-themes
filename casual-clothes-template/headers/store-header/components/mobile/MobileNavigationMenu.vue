<template>
	<ul class="navigation-menu__list">
		<li v-if="hasLocations" class="navigation-menu__item">
			<button
				class="navigation-menu__button"
				@click="toggleFindStore"
			>
				{{ locationsLinkContent.value }}
			</button>
		</li>
		<li v-if="hasCustomerCare" class="navigation-menu__item">
			<button
				class="navigation-menu__button"
				@click="toggleCustomerCare"
			>
				{{ customerCareTitle }}
			</button>
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
import { useLocations, useCustomerCare, useHeaderState } from '../../composables'

const { toggleFindStore, toggleCustomerCare } = useHeaderState()

const { hasLocations } = useLocations()
const { hasCustomerCare, customerCareTitle } = useCustomerCare()

const locationsLinkContent = useInputboxElementContent<Content>('HeaderLocationsLink')
const aboutLinkContent = useButtonElementContent<Content>('HeaderAboutLink')
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
</style>
