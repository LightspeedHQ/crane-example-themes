<template>
	<div class="highlight-image">
		<div class="highlight-image__container">
			<img
				v-if="hasValidProductImage"
				:src="productImage.highResolutionDesktopImage"
				:alt="imageAlt"
				loading="lazy"
				class="highlight-image__image"
			/>
		</div>
		<div
			v-if="overlayHeadline?.value"
			class="highlight-image__overlay-text"
			:style="overlayHeadlineVars"
		>
			{{ overlayHeadline?.value }}
		</div>
	</div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { hasValidImageContent } from '../../../shared/utils'
import {
	useImageElementContent,
	useTextareaElementContent,
	useTextElementDesign,
	useVueBaseProps,
} from '@lightspeed/crane'
import type { Content, Design } from '../type.ts'
import { createTextVars } from '../../../shared/utils/design-vars'

const { design: rawDesign } = useVueBaseProps<unknown, Design>()

const productImage = useImageElementContent<Content>('product_image')
const overlayHeadline = useTextareaElementContent<Content>('overlay_headline')

const overlayHeadlineDesign = useTextElementDesign<Design>('overlay_headline') as TextDesignData

const hasValidProductImage = computed(
	() => productImage.hasContent && hasValidImageContent(productImage),
)

const imageAlt = computed(() => overlayHeadline?.value || 'Promotional product image')

const overlayHeadlineVars = computed(() => {
	if (!overlayHeadlineDesign.visible) return { display: 'none' }
	return Object.fromEntries(
		createTextVars(
			'overlay-headline',
			overlayHeadlineDesign,
			rawDesign.value?.overlay_headline,
		),
	)
})
</script>

<style scoped lang="scss">
.highlight-image {
	position: relative;
	width: 100%;
	display: flex;
	flex-direction: column;
	align-items: center;
	padding-bottom: 32px;

	&__container {
		position: relative;
		width: 150px;
		height: 150px;
		flex-shrink: 0;
		margin-bottom: -32px;
		z-index: 1;
	}

	&__image {
		width: 100%;
		height: 100%;
		object-fit: cover;
		object-position: center;
	}

	&__overlay-text {
		font-family: var(--overlay-headline-font-family, var(--heading-font-family));
		font-size: 48px;
		font-weight: var(--overlay-headline-font-weight, var(--heading-font-weight));
		font-style: var(--overlay-headline-font-style, var(--heading-font-style));
		line-height: 1;
		letter-spacing: -0.24px;
		text-align: center;
		color: var(--overlay-headline-color, #ffffff);
		pointer-events: none;
		mix-blend-mode: exclusion;
		white-space: pre-line;
		max-width: 304px;
		margin-bottom: -32px;
		z-index: 2;
		position: relative;
	}
}

@media (min-width: 768px) {
	.highlight-image {
		padding-bottom: 0;

		&__container {
			width: 700px;
			height: 700px;
			margin-bottom: 0;
		}

		&__overlay-text {
			position: absolute;
			top: 0;
			bottom: 0;
			left: 0;
			right: 0;
			font-size: var(--overlay-headline-font-size, 128px);
			letter-spacing: -0.64px;
			padding: 32px;
			max-width: none;
			margin-bottom: 0;
			display: flex;
			align-items: center;
			justify-content: center;
		}
	}
}
</style>
