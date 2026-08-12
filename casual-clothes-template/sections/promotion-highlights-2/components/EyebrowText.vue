<template>
	<p v-if="eyebrowText?.value && eyebrowTextDesign?.visible !== false" class="promotion-highlights-eyebrow" :style="eyebrowVars">
		{{ eyebrowText?.value }}
	</p>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { useInputboxElementContent, useTextElementDesign, useVueBaseProps } from '@lightspeed/crane'
import type { Content, Design } from '../type.ts'
import { createTextVars } from '../../../shared/utils/design-vars'

const { design: rawDesign } = useVueBaseProps<unknown, Design>()
const eyebrowText = useInputboxElementContent<Content>('eyebrow_text')
const eyebrowTextDesign = useTextElementDesign<Design>('eyebrow_text') as TextDesignData

const eyebrowVars = computed(() =>
	Object.fromEntries(
		createTextVars('eyebrow-text', eyebrowTextDesign, rawDesign.value?.eyebrow_text),
	),
)
</script>

<style scoped lang="scss">
.promotion-highlights-eyebrow {
	font-family: var(--eyebrow-text-font-family, var(--heading-font-family));
	color: var(--eyebrow-text-color, var(--fg-color));
	font-size: var(--eyebrow-text-font-size, var(--body-2-font-size));
	font-weight: var(--eyebrow-text-font-weight, var(--body-font-weight));
	font-style: var(--eyebrow-text-font-style, var(--body-font-style));
	line-height: 1.5;
	letter-spacing: -0.08px;
	text-align: center;
	width: 100%;
}
</style>
