<template>
	<div class="banner-background">
		<img
			v-if="hasValidBackgroundImage"
			:src="backgroundImage.highResolutionDesktopImage"
			alt=""
			class="banner-background__image" />
		<div v-show="overlayBackgroundDesign.enabled" class="banner-background__overlay"></div>
	</div>
</template>

<script setup lang="ts">
import { useImageElementContent, useToggleElementDesign } from '@lightspeed/crane'
import { Content, Design } from '../type.ts'
import { hasValidImageContent } from '../../../shared/utils'
import { computed } from 'vue'

const backgroundImage = useImageElementContent<Content>('background_image')

const hasValidBackgroundImage = computed(() => backgroundImage.hasContent && hasValidImageContent(backgroundImage))
const overlayBackgroundDesign = useToggleElementDesign<Design>('overlay_background') as ToggleDesignData
</script>

<style scoped lang="scss">
@use '../constants' as c;

// Overlay gradient stops: darkens the bottom of the image for text legibility
$overlay-start: rgba(0, 0, 0, 0);     // fully transparent at top
$overlay-mid: rgba(0, 0, 0, 0.25);    // 25% dark at midpoint
$overlay-end: rgba(0, 0, 0, 0.45);    // 45% dark at bottom

.banner-background {
  position: absolute;
  inset: 0;
  pointer-events: none;

  &__image {
    position: absolute;
    inset: 0;
    width: 100%;
    height: 100%;
    object-fit: cover;
    object-position: center center;

    @media (min-width: c.$MOBILE_BREAKPOINT) {
      object-position: right center;
    }
  }

  &__overlay {
    position: absolute;
    inset: 0;
    z-index: 1;
    pointer-events: none;
    background: linear-gradient(
      to bottom,
      $overlay-start 40%,
      $overlay-mid 60%,
      $overlay-end 100%
    );
  }
}
</style>
