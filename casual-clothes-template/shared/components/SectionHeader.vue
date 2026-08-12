<template>
	<div :style="sectionHeaderVars">
		<p v-show="title?.hasContent && titleDesign?.visible !== false" class="head-text" v-text="title?.value"></p>
		<p
			v-show="description && description?.hasContent && descriptionDesign?.visible !== false"
			class="description-text"
			v-text="description?.value"
		></p>
	</div>
	<div class="gap-down"></div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { createTextVars } from '../utils/design-vars'

interface ContentItem {
	hasContent: boolean
	value: string | undefined
}

const props = defineProps<{
	title: ContentItem
	description: ContentItem | null
	titleDesign?: TextDesignData
	descriptionDesign?: TextDesignData
	rawTitleDesign?: unknown
	rawDescriptionDesign?: unknown
}>()

const sectionHeaderVars = computed(() =>
	Object.fromEntries([
		...createTextVars('section-title', props.titleDesign, props.rawTitleDesign),
		...createTextVars(
			'section-desc',
			props.descriptionDesign ?? undefined,
			props.rawDescriptionDesign,
		),
	]),
)
</script>

<style lang="scss" scoped>
.gap-down {
	margin-bottom: 32px;
}

.head-text {
	font-family: var(--section-title-font-family, var(--heading-font-family));
	color: var(--section-title-color, var(--fg-color));
	font-size: var(--section-title-font-size, var(--heading-2-font-size));
	font-weight: var(--section-title-font-weight, var(--heading-font-weight));
	font-style: var(--section-title-font-style, normal);
	line-height: 150%;
	letter-spacing: -0.16px;
	margin: 0;
}

.description-text {
	font-family: var(--section-desc-font-family, var(--body-font-family));
	color: var(--section-desc-color, var(--fg-color));
	font-size: var(--section-desc-font-size, var(--body-2-font-size));
	font-weight: var(--section-desc-font-weight, var(--body-font-weight));
	font-style: var(--section-desc-font-style, normal);
	margin-top: 24px;
	line-height: 150%;
	letter-spacing: -0.08px;
	white-space: pre-line;
}

@media (max-width: 768px) {
	.head-text {
		letter-spacing: -0.12px;
	}
}
</style>
