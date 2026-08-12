<template>
	<section class="hero-banner" :style="colorPresetVars">
		<BannerBackground />
		<BannerContent />
	</section>
</template>

<script setup lang="ts">
import { useVueBaseProps } from '@lightspeed/crane'
import BannerContent from './components/BannerContent.vue'
import BannerBackground from './components/BannerBackground.vue'
import { useColorPresetVars } from '../../shared/composables/design'
import type { Design } from './type'

const { design: rawDesign } = useVueBaseProps<unknown, Design>()
const colorPresetVars = useColorPresetVars(rawDesign)
</script>

<style scoped>
.hero-banner {
	position: relative;
	width: 100%;
	min-height: 500px;
	display: flex;
	align-items: center;
	justify-content: center;
	padding: 16px;
	overflow: hidden;

  @media (min-width: 768px) {
      min-height: 600px;
      padding: 16px;
  }
}
</style>
