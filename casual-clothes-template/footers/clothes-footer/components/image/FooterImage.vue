<template>
	<div class="image-container" v-if="shouldShowSection">
		<img
			v-if="hasImage"
			:src="footerData?.footerImage?.highResolutionDesktopImage"
			alt="footer image"
		/>
		<div class="footer-text" :style="footerTextVars">{{ footerData?.footerText?.value }}</div>
	</div>
</template>

<script setup lang="ts">
import { computed, inject } from 'vue'
import { footerDesignKey, footerImageKey } from '../../types/type.ts'
import { createTextVars } from '../../../../shared/utils/design-vars'
import { hasValidImageContent } from '../../../../shared/utils'

const footerData = inject(footerImageKey)
const siteDesign = inject(footerDesignKey)

const hasImage = computed(
	() => footerData?.footerImage.hasContent && hasValidImageContent(footerData?.footerImage),
)

const hasText = computed(() => {
	return footerData?.footerText?.value && siteDesign?.footerTextDesign?.visible
})

const shouldShowSection = computed(() => hasImage.value || hasText.value)

const footerTextVars = computed(() =>
	Object.fromEntries(
		createTextVars(
			'footer-caption',
			siteDesign?.footerTextDesign,
			siteDesign?.rawFooterText?.value,
		),
	),
)

const footerTextSize = computed(() =>
	siteDesign?.footerTextDesign.size ? `${siteDesign?.footerTextDesign.size}vw` : '10vw',
)
</script>

<style scoped>
.image-container {
	position: relative;
	width: 100%;
	aspect-ratio: 16 / 4;
	max-height: 228px;
	overflow: hidden;
	background: var(--footer-background, var(--bg-color));
}

img {
	width: 100%;
	height: 100%;
	object-fit: cover;
	object-position: top;
}

.footer-text {
	position: absolute;
	bottom: 2px;
	left: 0;
	width: 100%;
	padding-top: 20px;
	padding-bottom: 20px;
	text-align: center;
	box-sizing: border-box;

	font-family: var(--footer-caption-font-family, var(--body-font-family));
	color: var(--footer-caption-color, #eee);
	font-weight: var(--footer-caption-font-weight, var(--body-font-weight));
	font-style: var(--footer-caption-font-style, var(--body-font-style));
	font-size: v-bind(footerTextSize);

	line-height: 56%;
	letter-spacing: -0.8px;
	text-transform: uppercase;

	white-space: nowrap;
	overflow: hidden;
	text-overflow: ellipsis;
}
</style>
