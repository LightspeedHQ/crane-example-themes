<template>
	<div class="brand-story__content" :style="storyContentVars">
		<div class="brand-story__content-wrapper">
			<div v-show="sectionTitleDesign?.visible !== false" class="brand-story__title">
				{{ sectionTitle.value }}
			</div>
			<div class="brand-story__text-content">
				<div v-show="sectionDescriptionDesign?.visible !== false" class="brand-story__description">
					{{ sectionDescription.value }}
				</div>
				<Button
					:content="ctaButtonContent"
					:design="ctaButtonDesign"
					:raw-design="rawDesign?.cta_button"
					show-arrow
				/>
			</div>
		</div>
	</div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import Button from '../../../shared/components/Button.vue'
import { createTextVars } from '../../../shared/utils/design-vars'
import {
	useButtonElementContent,
	useButtonElementDesign,
	useInputboxElementContent,
	useTextareaElementContent,
	useTextElementDesign,
	useVueBaseProps,
} from '@lightspeed/crane'
import { Content, Design } from '../type.ts'

const { design: rawDesign } = useVueBaseProps<unknown, Design>()

const sectionTitle = useInputboxElementContent<Content>('section_title')
const sectionDescription = useTextareaElementContent<Content>('section_description')
const ctaButtonContent = useButtonElementContent<Content>('cta_button')

const sectionTitleDesign = useTextElementDesign<Design>('section_title') as TextDesignData
const sectionDescriptionDesign = useTextElementDesign<Design>(
	'section_description',
) as TextDesignData
const ctaButtonDesign = useButtonElementDesign<Design>('cta_button')

const storyContentVars = computed(() =>
	Object.fromEntries([
		...createTextVars('story-title', sectionTitleDesign, rawDesign.value?.section_title),
		...createTextVars(
			'story-desc',
			sectionDescriptionDesign,
			rawDesign.value?.section_description,
		),
	]),
)
</script>

<style scoped lang="scss">
.brand-story {
	&__content {
		align-self: stretch;
		display: flex;
		flex-direction: column;
		justify-content: flex-start;
		align-items: flex-start;
		gap: 8px;

		@media (min-width: 768px) {
			gap: 24px;
		}
	}

	&__content-wrapper {
		align-self: stretch;
		display: flex;
		flex-direction: column;
		justify-content: flex-start;
		align-items: flex-start;
		gap: 24px;

		@media (min-width: 768px) {
			flex-direction: row;
			align-items: flex-start;
		}
	}

	&__title {
		font-family: var(--story-title-font-family, var(--heading-font-family));
		color: var(--story-title-color, var(--fg-color));
		font-size: var(--story-title-font-size, var(--heading-2-font-size));
		font-weight: var(--story-title-font-weight, var(--heading-font-weight));
		font-style: var(--story-title-font-style, var(--heading-font-style));
		align-self: stretch;
		display: flex;
		flex-direction: column;
		justify-content: center;
		word-wrap: break-word;

		@media (min-width: 768px) {
			flex: 1 1 0;
		}
	}

	&__text-content {
		align-self: stretch;
		display: flex;
		flex-direction: column;
		justify-content: flex-start;
		align-items: flex-start;
		gap: 16px;

		@media (min-width: 768px) {
			flex: 1 1 0;
		}
	}

	&__description {
		font-family: var(--story-desc-font-family, var(--body-font-family));
		color: var(--story-desc-color, var(--fg-color));
		font-size: var(--story-desc-font-size, var(--body-2-font-size));
		font-weight: var(--story-desc-font-weight, var(--body-font-weight));
		font-style: var(--story-desc-font-style, var(--body-font-style));
		align-self: stretch;
		display: flex;
		flex-direction: column;
		justify-content: center;
		word-wrap: break-word;
		white-space: pre-line;
	}
}
</style>
