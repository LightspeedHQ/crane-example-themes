<template>
	<div class="banner-content" :style="bannerContentVars">
		<div class="banner-content__text">
			<p v-if="eyebrowText?.value && eyebrowTextDesign?.visible !== false" class="banner-content__eyebrow">
				{{ eyebrowText.value }}
			</p>
			<p v-if="heroTitle?.value && heroTitleDesign?.visible !== false" class="banner-content__title">
				{{ heroTitle.value }}
			</p>
		</div>

		<div v-if="ctaButton?.hasTitle && ctaButtonDesign?.visible" class="banner-content__cta">
			<Button
				:content="ctaButton"
				:design="ctaButtonDesign"
				:raw-design="rawDesign?.cta_button"
				show-arrow
			/>
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
import type { Content, Design } from '../type.ts'

const { design: rawDesign } = useVueBaseProps<unknown, Design>()

const eyebrowText = useInputboxElementContent<Content>('eyebrow_text')
const heroTitle = useTextareaElementContent<Content>('hero_title')
const ctaButton = useButtonElementContent<Content>('cta_button')

const eyebrowTextDesign = useTextElementDesign<Design>('eyebrow_text') as TextDesignData
const heroTitleDesign = useTextElementDesign<Design>('hero_title') as TextDesignData
const ctaButtonDesign = useButtonElementDesign<Design>('cta_button')

const bannerContentVars = computed(() =>
	Object.fromEntries([
		...createTextVars('eyebrow-text', eyebrowTextDesign, rawDesign.value?.eyebrow_text),
		...createTextVars('hero-title', heroTitleDesign, rawDesign.value?.hero_title),
	]),
)
</script>

<style scoped lang="scss">
.banner-content {
	position: relative;
	z-index: 1;
	width: 100%;
	max-width: 400px;
	display: flex;
	flex-direction: column;
	align-items: center;
	justify-content: end;
	gap: 32px;
	min-height: 468px;

	@media (min-width: 768px) {
		max-width: 600px;
	}

	&__text {
		display: flex;
		flex-direction: column;
		align-items: center;
		gap: 16px;
		width: 100%;
		text-align: center;
	}

	&__eyebrow {
		font-family: var(--eyebrow-text-font-family, var(--body-font-family));
		color: var(--eyebrow-text-color, var(--fg-color));
		font-size: var(--eyebrow-text-font-size, var(--body-2-font-size));
		font-weight: var(--eyebrow-text-font-weight, var(--body-font-weight));
		font-style: var(--eyebrow-text-font-style, var(--body-font-style));
		line-height: 1.5;
		letter-spacing: -0.08px;
		margin: 0;
	}

	&__title {
		font-family: var(--hero-title-font-family, var(--heading-font-family));
		color: var(--hero-title-color, var(--fg-color));
		font-size: var(--hero-title-font-size, var(--heading-1-font-size));
		font-weight: var(--hero-title-font-weight, var(--heading-font-weight));
		font-style: var(--hero-title-font-style, var(--heading-font-style));
		line-height: 1.5;
		letter-spacing: -0.16px;
		margin: 0;
		white-space: pre-wrap;
	}

	&__cta {
		display: flex;
		justify-content: center;
	}
}
</style>
