<template>
	<button
		v-if="hasPromoContent"
		class="catalog-promo-banner"
		:aria-label="getPromoAriaLabel()"
		@click="handlePromoClick">
		<div v-if="hasValidImage" class="catalog-promo-banner__image">
			<img :src="promoImage.highResolutionDesktopImage" :alt="promoImageAlt" />
		</div>
		<div class="catalog-promo-banner__link">
			<span>{{ promoLink.title }}</span>
			<span class="catalog-promo-banner__arrow" v-html="ForwardArrowIcon"></span>
		</div>
	</button>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { useImageElementContent, useButtonElementContent, useToggleElementDesign } from '@lightspeed/crane'
import type { Content, Design } from '../../type'
import { useHeaderDesign, useHeaderTranslations, useHeaderState } from '../../composables'
import ForwardArrowIcon from '../../assets/forward-arrow.svg?raw'
import { hasValidImageContent } from '../../../../shared/utils'

const { closeCatalog } = useHeaderState()

// Promo banner visibility toggle
const catalogPromoBannerVisibility = useToggleElementDesign<Design>('CatalogPromoBannerVisibility')

// Promo banner content
const promoImage = useImageElementContent<Content>('CatalogPromoImage')
const promoLink = useButtonElementContent<Content>('CatalogPromoLink')

const { headerTextColor } = useHeaderDesign()
const { translate } = useHeaderTranslations()

const promoImageAlt = translate('$label.aria.promo_image', 'Promotional image')

const hasValidImage = computed(() => promoImage.hasContent && hasValidImageContent(promoImage))

const hasPromoContent = computed(() => {
	// Check if the promo banner is enabled
	if (!catalogPromoBannerVisibility.enabled) return false
	// Check if we have valid content (at least a title or an image)
	return hasValidImage.value || !!promoLink.hasTitle
})

const getPromoAriaLabel = (): string => {
	if (promoLink.title) {
		return translate('$label.aria.view_promo', 'View {promo} promotional offer')
			.replace('{promo}', promoLink.title)
	}
	return translate('$label.aria.promo_image', 'Promotional image')
}

const handlePromoClick = () => {
	if (promoLink?.performAction) {
		promoLink.performAction()
	}
	closeCatalog()
}
</script>

<style scoped lang="scss">
@use '../../constants' as c;

.catalog-promo-banner {
  display: flex;
  flex-direction: column;
  gap: 10px;
  text-decoration: none;
  cursor: pointer;
  transition: opacity 0.2s ease;
  flex: 1 0 auto;
  justify-content: center;
  background: transparent;
  border: none;
  padding: 0;
  width: 100%;
  text-align: left;

  // On mobile, don't grow
  @media (max-width: c.$MOBILE_STORE_HEADER_BREAKPOINT) {
    flex: 0 0 auto; /* Don't grow on mobile */
  }

  &:hover {
    opacity: 0.8;
  }

  &:focus-visible {
    outline: 2px solid v-bind(headerTextColor);
    outline-offset: 2px;
    border-radius: 8px;
  }

  &:active {
    opacity: 0.6;
  }
}

.catalog-promo-banner__image {
  width: 100%;
  border-radius: 8px;
  overflow: hidden;
  position: relative;
  flex-shrink: 0; /* Prevent shrinking */

  img {
    width: 100%;
    aspect-ratio: 3 / 4; /* Fixed 300:400 aspect ratio from Figma */
    display: block;
    object-fit: cover;
    object-position: center;

    // On mobile, constrain dimensions
    @media (max-width: c.$MOBILE_STORE_HEADER_BREAKPOINT) {
      max-height: 384px; /* Max height constraint */
    }
  }
}

.catalog-promo-banner__link {
  display: flex;
  align-items: center;
  justify-content: space-between;
  color: v-bind(headerTextColor);
  font-family: var(--header-font-family, var(--body-font-family));
  font-size: inherit;
  font-style: inherit;
  font-weight: 400; /* Regular weight per Figma design */
  line-height: 150%;
  letter-spacing: -0.08px;

  // When image exists, add margin-top
  .catalog-promo-banner__image + & {
    margin-top: 12px;
  }
}

.catalog-promo-banner__arrow {
  flex-shrink: 0;
  width: 24px;
  height: 24px;
  display: flex;
  align-items: center;
  justify-content: center;

  :deep(svg) {
    width: 19px;
    height: 14px;

    path {
      fill: v-bind(headerTextColor);
    }
  }
}
</style>
