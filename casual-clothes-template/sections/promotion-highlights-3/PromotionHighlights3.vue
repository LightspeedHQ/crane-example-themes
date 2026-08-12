<template>
	<section class="promotion-highlights-3" :style="sectionBackgroundStyle">
		<div class="promotion-highlights-3__wrapper">
			<HighlightHeader />

			<div class="promotion-highlights-3__container">
				<div
					ref="gallery"
					class="promotion-highlights-3__gallery"
					:class="{ 'promotion-highlights-3__gallery--centered': !hasOverflow }"
					role="region"
					aria-label="Promotion gallery"
				>
					<GalleryItem
						v-for="item in galleryItems"
						:key="item.id"
						:image-url="item.imageUrl"
						:alt-text="item.altText"
					/>
				</div>

				<NavigationButtons
					v-if="shouldShowControls"
					:prev-disabled="prevDisabled"
					:next-disabled="nextDisabled"
					:prev-label="t('$label.nav.previous')"
					:next-label="t('$label.nav.next')"
					padding-mobile="0"
					padding-desktop="19px"
					icon-size="sm"
					:show-hover="true"
					@prev="scrollCarousel('prev')"
					@next="scrollCarousel('next')"
				/>
			</div>

			<HighlightFooter />
		</div>
	</section>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import {
	useDeckElementContent,
	useBackgroundElementDesign,
	useVueBaseProps,
} from '@lightspeed/crane'
import GalleryItem from './components/GalleryItem.vue'
import NavigationButtons from '../../shared/components/NavigationButtons.vue'
import { useCarousel, useTranslations, useMappedDeckCards } from '../../shared/composables'
import { useColorPresetVars } from '../../shared/composables/design'
import { createBackgroundVars } from '../../shared/utils/design-vars'
import { GalleryItemCard, GalleryItemDeckConfig } from './types'
import translations from './settings/translations'
import type { Content, Design } from './type'
import HighlightHeader from './components/HighlightHeader.vue'
import HighlightFooter from './components/HighlightFooter.vue'
import { mapGalleryItem } from './utils/utils.ts'

const { t } = useTranslations(translations)

const { design: rawDesign } = useVueBaseProps<unknown, Design>()

const galleryItemsDeck = useDeckElementContent<Content>('gallery_items')

const sectionBackgroundDesign = useBackgroundElementDesign<Design>('section_background') as BackgroundDesignData
const colorPresetVars = useColorPresetVars(rawDesign)

const sectionBackgroundStyle = computed(() => ({
	...Object.fromEntries(createBackgroundVars('section', sectionBackgroundDesign, rawDesign.value?.section_background)),
	...colorPresetVars.value,
}))

const mappedGalleryItems = useMappedDeckCards<GalleryItemCard, Content>(
	galleryItemsDeck,
	GalleryItemDeckConfig,
)

const galleryItems = computed(() => mappedGalleryItems.value.map(mapGalleryItem))

const gallery = ref<HTMLElement | null>(null)
const totalItems = computed(() => galleryItems.value.length)
const { prevDisabled, nextDisabled, scrollCarousel, shouldShowControls, hasOverflow } = useCarousel(gallery, {
	totalItems,
	itemWidthMobile: 216,
	itemWidthDesktop: 696,
	gap: 16,
})
</script>

<style scoped lang="scss">
.promotion-highlights-3 {
	width: 100%;
	padding: 32px 8px;
	background: var(--section-background, var(--bg-color));
	display: flex;
	flex-direction: column;
	align-items: center;

  &__wrapper {
    width: 100%;
    max-width: 1440px;
    display: flex;
    flex-direction: column;
    gap: 32px;
  }

  &__container {
    position: relative;
    width: 100%;
  }

  &__gallery {
    display: flex;
    gap: 16px;
    overflow-x: auto;
    scroll-behavior: smooth;
    scrollbar-width: none;
    padding: 0 8px;
    scroll-snap-type: x mandatory;

    &--centered {
      justify-content: center; /* Center items only when there's no overflow */
    }

    &::-webkit-scrollbar {
      display: none;
    }
  }
}

@media (min-width: 768px) {
	.promotion-highlights-3 {
		padding: 48px 16px;

    &__wrapper {
      padding: 0 16px;
    }

    &__gallery {
      padding: 0 16px;
      scroll-snap-type: none; /* Disable snap on desktop for smoother programmatic scrolling */
    }
	}
}
</style>
