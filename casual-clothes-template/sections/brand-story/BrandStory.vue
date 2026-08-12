<template>
	<SectionWrapper :style="sectionBackgroundStyle">
		<div class="brand-story">
			<div v-if="!hasError" class="brand-story__hero-container">
				<VideoPlayer :player-id="playerId" :has-played-once="hasPlayedOnce" />
				<PlayButton
					:is-playing="isPlaying"
					:has-played-once="hasPlayedOnce"
					:is-client="isClient"
					:toggle-play="togglePlay"
				/>
			</div>

			<StoryContent />
		</div>
	</SectionWrapper>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import {
	useInputboxElementContent,
	useBackgroundElementDesign,
	useVueBaseProps,
} from '@lightspeed/crane'
import { Content, Design } from './type'
import SectionWrapper from '../../shared/components/SectionWrapper.vue'
import { useYouTubePlayer } from './composables/use-youtube-player.ts'
import { createBackgroundVars } from '../../shared/utils/design-vars'
import { useColorPresetVars } from '../../shared/composables/design'
import { extractYouTubeId } from './utils/utils.ts'
import PlayButton from './components/PlayButton.vue'
import StoryContent from './components/StoryContent.vue'
import VideoPlayer from './components/VideoPlayer.vue'

const { design: rawDesign } = useVueBaseProps<unknown, Design>()
const videoUrlRaw = useInputboxElementContent<Content>('video_url')
const sectionBackgroundDesign = useBackgroundElementDesign<Design>('section_background') as BackgroundDesignData
const colorPresetVars = useColorPresetVars(rawDesign)

const videoUrl = computed(() => extractYouTubeId(videoUrlRaw.value))
const { playerId, isPlaying, hasPlayedOnce, isClient, togglePlay, hasError } = useYouTubePlayer(videoUrl)
const sectionBackgroundStyle = computed(() => ({
	...Object.fromEntries(createBackgroundVars('section', sectionBackgroundDesign, rawDesign.value?.section_background)),
	...colorPresetVars.value,
}))

</script>
<style scoped lang="scss">
.brand-story {
	width: 100%;
	height: 100%;
	padding: 32px 8px;
	display: flex;
	flex-direction: column;
	justify-content: flex-start;
	align-items: flex-start;
	gap: 16px;

  @media (min-width: 768px) {
    padding: 48px 16px;
    gap: 32px;
  }

  &__hero-container {
    align-self: stretch;
    position: relative;
    width: 100%;
    height: 304px;
    background: #000;

    @media (min-width: 768px) {
      height: 696px;
    }
  }
}
</style>
