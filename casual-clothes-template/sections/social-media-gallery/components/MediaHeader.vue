<template>
	<header class="social-media-gallery__header" :style="headerVars">
		<h2 v-show="sectionTitleDesign?.visible !== false" class="social-media-gallery__title">
			{{ sectionTitle?.value }}
		</h2>
		<p v-show="sectionSubtitleDesign?.visible !== false" class="social-media-gallery__subtitle">
			<template v-for="(segment, index) in subtitleSegments" :key="index">
				<strong v-if="segment.isHashtag">
					{{ segment.text }}
				</strong>
				<template v-else>
					{{ segment.text }}
				</template>
			</template>
		</p>
	</header>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import {
	useInputboxElementContent,
	useTextareaElementContent,
	useTextElementDesign,
	useVueBaseProps,
} from '@lightspeed/crane'
import type { Content, Design } from '../type.ts'
import { TextSegment } from '../types'
import { parseSubtitleSegments } from '../utils/utils.ts'
import { createTextVars } from '../../../shared/utils/design-vars'

const { design: rawDesign } = useVueBaseProps<unknown, Design>()

const sectionTitle = useInputboxElementContent<Content>('section_title')
const sectionSubtitle = useTextareaElementContent<Content>('section_subtitle')

const sectionTitleDesign = useTextElementDesign<Design>('section_title') as TextDesignData
const sectionSubtitleDesign = useTextElementDesign<Design>('section_subtitle') as TextDesignData

const headerVars = computed(() =>
	Object.fromEntries([
		...createTextVars('media-title', sectionTitleDesign, rawDesign.value?.section_title),
		...createTextVars(
			'media-subtitle',
			sectionSubtitleDesign,
			rawDesign.value?.section_subtitle,
		),
	]),
)

const subtitleSegments = computed<TextSegment[]>(() => parseSubtitleSegments(sectionSubtitle.value))
</script>

<style scoped lang="scss">
.social-media-gallery {
	&__header {
		display: flex;
		flex-direction: column;
		gap: 8px;
	}

	&__title {
		font-family: var(--media-title-font-family, var(--heading-font-family));
		color: var(--media-title-color, var(--fg-color));
		font-size: var(--media-title-font-size, var(--heading-2-font-size));
		font-weight: var(--media-title-font-weight, var(--heading-font-weight));
		font-style: var(--media-title-font-style, normal);
		line-height: 1.5;
		letter-spacing: -0.12px;
	}

	&__subtitle {
		font-family: var(--media-subtitle-font-family, var(--body-font-family));
		color: var(--media-subtitle-color, var(--fg-color));
		font-size: var(--media-subtitle-font-size, var(--body-2-font-size));
		font-weight: var(--media-subtitle-font-weight, var(--body-font-weight));
		font-style: var(--media-subtitle-font-style, var(--body-font-style));
		line-height: 1.5;
		letter-spacing: -0.08px;
		white-space: pre-line;

		& strong {
			font-weight: 700;
		}
	}
}

@media (min-width: 768px) {
	.social-media-gallery {
		&__header {
			gap: 24px;
		}

		&__title {
			font-size: var(--media-title-font-size, var(--heading-2-font-size));
			letter-spacing: -0.16px;
		}
	}
}
</style>
