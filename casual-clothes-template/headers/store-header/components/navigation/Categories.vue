<template>
	<ul class="categories-menu__list">
		<li v-for="levelOneCategory in visibleCategories" :key="levelOneCategory.id">
			<DropdownPortalMenu v-if="levelOneCategory.hasChildren">
				<template #trigger="{ isDropdownOpen, isTouchDevice }">
					<div
						:class="[isDesktop ? '' : 'categories-menu__item_containerBottom'
							, 'categories-menu__item_containerRight']"
						:style="{ display: 'flex', alignItems: 'center' }"
						@click="handleCategoryClick($event, levelOneCategory)"
						@mouseenter="maybeCloseSearchOverlay">
						<NavigationLink
							class="categories-menu__item categories-menu__link categories-menu__link--submenu"
							:class="{ 'categories-menu__link--active': isActiveCategory(levelOneCategory),
								'navigation-menu__item--active': isDropdownOpen}"
							:aria-label="getOpenSubmenuLabel(levelOneCategory.name)"
							:aria-expanded="isDropdownOpen"
							:text="levelOneCategory.name"
							:url="levelOneCategory.urlPath || '#'"
							:is-bold="true"
						/>
						<DropdownArrowIcon
							v-if="!isDesktop && isTouchDevice"
							:style="{transform: 'rotate(270deg)', marginLeft : '15px'}">
						</DropdownArrowIcon>
						<DropdownArrowIcon
							v-else
							:style="{transform: `${isDropdownOpen ? '': 'rotate(180deg)'}`, marginLeft : '15px'}">
						</DropdownArrowIcon>
					</div>

				</template>
				<template #content>
					<div
						v-if="isDesktop"
						:style="{'background-color': headerBackgroundColor, padding:'16px'}">
						<SubCategoryDropdownContent :category="levelOneCategory" />
					</div>
				</template>
			</DropdownPortalMenu>

			<NavigationLink
				v-else
				:class="[isDesktop ? '' :'categories-menu__item_containerBottom', 'categories-menu__item'
					, 'categories-menu__item_containerRight']"
				:text="levelOneCategory.name"
				:url="levelOneCategory.urlPath || '#'"
				:is-bold="true" />
		</li>
	</ul>
</template>

<script setup lang="ts">
import NavigationLink from '../ui/navigation-link'
import type { Category } from '../../types'
import type { ActiveCategoryProps } from '../../types'
import { useCategoryTree, useHeaderDesign, useHeaderTranslations, useHeaderViewport, useHeaderState } from '../../composables'
import SubCategoryDropdownContent from './SubCategoryDropdownContent.vue'
import { DropdownPortalMenu } from '../ui/dropdown'
import { DropdownArrowIcon } from '../ui/icons'

const props = defineProps<ActiveCategoryProps>()

const { openCatalog, isSearchOverlayOpen, closeSearchOverlay } = useHeaderState()
const { isDesktop } = useHeaderViewport()

const handleCategoryClick = (event: MouseEvent, levelOneCategory: Category) => {
	if (!isDesktop.value) {
		event.preventDefault()
		event.stopPropagation()
		openCatalog(levelOneCategory)
	}
}

function maybeCloseSearchOverlay() {
	if (isSearchOverlayOpen.value && isDesktop.value) {
		closeSearchOverlay()
	}
}

const { visibleCategories } = useCategoryTree()
const { translate } = useHeaderTranslations()

const { headerBackgroundColor } = useHeaderDesign()

const getOpenSubmenuLabel = (categoryName: string): string => {
	return translate('$label.aria.open_submenu', 'Open {category} submenu').replace('{category}', categoryName)
}

const isActiveCategory = (category: Category) => {
	return props.activeCategory?.id === category.id
}

</script>

<style scoped lang="scss">
@use '../../constants' as c;

.categories-menu__list {
  display: flex;
  list-style: none;
  margin: 0;
  padding: 0;
  align-items: center;
  flex-wrap: wrap;

  @media (max-width: c.$MOBILE_STORE_HEADER_BREAKPOINT) {
    flex-direction: column;
    justify-content: center;
    align-items: flex-start;
  }
}

.categories-menu__item_containerRight {
  margin-right: clamp(12px, 1.5rem, 24px);
}

.categories-menu__item_containerBottom {
  margin-bottom: clamp(12px, 1.5rem, 24px);
}

.categories-menu__item {
  display: flex;
  align-items: center;
  position: relative;

  // Add underline effect for NavigationLink items (categories without children)
  :deep(.navigation-link a) {
    position: relative;
    padding-bottom: 2px;
    font-weight: 600;

    &::after {
      content: '';
      position: absolute;
      bottom: -2px;
      left: 0;
      width: 0;
      height: 2px;
      background-color: currentColor;
      transition: width 0.3s ease;
    }

    &:hover::after {
      width: 100%;
    }
  }
}

.categories-menu__link {
  display: flex;
  align-items: center;
  gap: 4px;
  background: none;
  border: none;
  color: inherit;
  font: inherit;
  padding: 0;
  cursor: pointer;
  position: relative;
  padding-bottom: 2px;
  transition: opacity 0.2s ease;

  &::after {
    content: '';
    position: absolute;
    bottom: -2px;
    left: 0;
    width: 0;
    height: 2px;
    background-color: currentColor;
    transition: width 0.3s ease;
  }

  &:hover {
    opacity: 0.8;

    &::after {
      width: 100%;
    }
  }

  &:focus-visible {
    outline: 2px solid currentColor;
    outline-offset: 2px;
  }

  &:active {
    opacity: 0.6;
  }

  &--submenu {
    font-weight: 600;
  }

  &--active {
    color: currentColor;

    &::after {
      width: 100%;
    }
  }
}

.categories-submenu-overlay__content {
  box-shadow: 0 8px 16px 0 rgba(0, 0, 0, 0.2);
  padding: 16px;
  max-height: 80vh;
  overflow-y: auto;
}

.navigation-menu__item--active::after {
  width: 100%;
}
</style>
