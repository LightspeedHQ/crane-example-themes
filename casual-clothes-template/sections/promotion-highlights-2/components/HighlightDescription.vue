<template>
	<p v-if="description?.value && descriptionDesign?.visible !== false" class="highlight-description" :style="descriptionVars">
		{{ description?.value }}
	</p>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { useTextareaElementContent, useTextElementDesign, useVueBaseProps } from '@lightspeed/crane'
import type { Content, Design } from '../type.ts'
import { createTextVars } from '../../../shared/utils/design-vars'

const { design: rawDesign } = useVueBaseProps<unknown, Design>()
const description = useTextareaElementContent<Content>('description')
const descriptionDesign = useTextElementDesign<Design>('description') as TextDesignData

const descriptionVars = computed(() =>
	Object.fromEntries(
		createTextVars('highlight-desc', descriptionDesign, rawDesign.value?.description),
	),
)
</script>

<style scoped lang="scss">
.highlight-description {
	font-family: var(--highlight-desc-font-family, var(--body-font-family));
	color: var(--highlight-desc-color, var(--fg-color));
	font-size: var(--highlight-desc-font-size, var(--body-2-font-size));
	font-weight: var(--highlight-desc-font-weight, var(--body-font-weight));
	font-style: var(--highlight-desc-font-style, var(--body-font-style));
	line-height: 1.5;
	letter-spacing: -0.08px;
	text-align: center;
	width: 100%;
	white-space: pre-line;
}

@media (min-width: 768px) {
	.highlight-description {
		width: auto;
	}
}
</style>
