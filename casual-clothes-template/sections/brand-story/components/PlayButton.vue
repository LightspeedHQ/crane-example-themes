<template>
	<button
		v-if="isClient"
		v-show="playButtonDesign?.visible !== false"
		class="brand-story__play-button"
		:style="playButtonVars"
		@click="togglePlay"
	>
		<div class="brand-story__play-text">
			<span class="brand-story__play-text--mobile">{{ mobilePlayText }}</span>
			<span class="brand-story__play-text--desktop">{{ desktopPlayText }}</span>
		</div>
		<div class="brand-story__play-icon" v-html="isPlaying ? PauseIcon : PlayIcon" />
	</button>
</template>

<script setup lang="ts">
import PlayIcon from '../assets/play-icon.svg?raw'
import PauseIcon from '../assets/pause-icon.svg?raw'
import { computed } from 'vue'
import {
	useButtonElementDesign,
	useInputboxElementContent,
	useVueBaseProps,
} from '@lightspeed/crane'
import { Content, Design } from '../type.ts'
import { createButtonVars } from '../../../shared/utils/design-vars'

const props = defineProps<{
	isPlaying: boolean
	hasPlayedOnce: boolean
	isClient: boolean
	togglePlay: () => void
}>()

const { design: rawDesign } = useVueBaseProps<unknown, Design>()

const playButtonText = useInputboxElementContent<Content>('play_button_text')
const pauseButtonText = useInputboxElementContent<Content>('pause_button_text')
const watchVideoText = useInputboxElementContent<Content>('watch_video_text')

const playButtonDesign = useButtonElementDesign<Design>('play_button')

const playButtonVars = computed(() =>
	Object.fromEntries(
		createButtonVars(
			'play-btn',
			playButtonDesign as Partial<ButtonDesignData> | undefined,
			rawDesign.value?.play_button,
		),
	),
)

const mobilePlayText = computed(() =>
	props.isPlaying ? pauseButtonText.value : watchVideoText.value,
)
const desktopPlayText = computed(() =>
	props.isPlaying ? pauseButtonText.value : playButtonText.value,
)
</script>

<style scoped lang="scss">
.brand-story__play {
	&-button {
		position: absolute;
		bottom: 16px;
		left: 16px;
		display: inline-flex;
		justify-content: center;
		align-items: center;
		gap: 10px;
		padding: var(--play-btn-padding, 10px 20px);
		background: var(--play-btn-bg-color, #000);
		color: var(--play-btn-text-color, #fff);
		font-family: var(--play-btn-font-family, var(--body-font-family));
		font-size: var(--play-btn-font-size, 16px);
		border-width: var(--play-btn-border-width, 1px);
		border-style: solid;
		border-color: var(--play-btn-border-color, #000);
		border-radius: var(--play-btn-border-radius, 0);
		cursor: pointer;
		z-index: 2;

		@media (min-width: 768px) {
			bottom: 32px;
			left: 32px;
		}
	}

	&-text {
		display: flex;
		flex-direction: column;
		justify-content: center;
		word-wrap: break-word;

		&--mobile {
			@media (min-width: 768px) {
				display: none;
			}
		}

		&--desktop {
			@media (max-width: 767px) {
				display: none;
			}
		}
	}

	&-icon {
		display: flex;
		align-items: center;
		justify-content: center;
	}

	&-icon svg {
		display: block;
	}
}
</style>
