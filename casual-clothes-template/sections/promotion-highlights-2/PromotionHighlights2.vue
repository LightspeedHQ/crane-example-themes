<template>
	<section class="promotion-highlights-2" :style="sectionStyle">
		<div class="promotion-highlights-2__container">
			<EyebrowText />
			<HighlightImage />

			<div class="promotion-highlights-2__bottom">
				<HighlightDescription />
				<HighlightCTA />
			</div>
		</div>
	</section>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import {
	useBackgroundElementDesign,
	useVueBaseProps,
} from '@lightspeed/crane'
import { createBackgroundVars } from '../../shared/utils/design-vars'
import { useColorPresetVars } from '../../shared/composables/design'
import type { Design } from './type'
import EyebrowText from './components/EyebrowText.vue'
import HighlightImage from './components/HighlightImage.vue'
import HighlightDescription from './components/HighlightDescription.vue'
import HighlightCTA from './components/HighlightCTA.vue'

const { design: rawDesign } = useVueBaseProps<unknown, Design>()
const sectionBackgroundDesign = useBackgroundElementDesign<Design>('section_background') as BackgroundDesignData
const colorPresetVars = useColorPresetVars(rawDesign)

const sectionStyle = computed(() => ({
	...Object.fromEntries(createBackgroundVars('section', sectionBackgroundDesign, rawDesign.value?.section_background)),
	...colorPresetVars.value,
}))
</script>

<style scoped lang="scss">
.promotion-highlights-2 {
	width: 100%;
	padding: 32px 8px;
	background: var(--section-background, var(--bg-color));

  &__container {
    display: flex;
    flex-direction: column;
    gap: 32px;
    align-items: center;
    width: 100%;
  }

  &__bottom {
    display: flex;
    flex-direction: column;
    gap: 16px;
    align-items: center;
    width: 100%;
  }
}

@media (min-width: 768px) {
	.promotion-highlights-2 {
		padding: 48px 16px;

    &__container {
      gap: 32px;
    }
	}
}
</style>
