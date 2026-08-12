<template>
	<header class="promotion-highlights-3__header" :style="headerVars">
		<h2 v-show="sectionTitleDesign?.visible !== false" class="promotion-highlights-3__title">{{ sectionTitle?.value }}</h2>
	</header>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { useInputboxElementContent, useTextElementDesign, useVueBaseProps } from '@lightspeed/crane'
import type { Content, Design } from '../type.ts'
import { createTextVars } from '../../../shared/utils/design-vars'

const { design: rawDesign } = useVueBaseProps<unknown, Design>()
const sectionTitle = useInputboxElementContent<Content>('section_title')
const sectionTitleDesign = useTextElementDesign<Design>('section_title') as TextDesignData

const headerVars = computed(() =>
	Object.fromEntries(
		createTextVars('highlight-title', sectionTitleDesign, rawDesign.value?.section_title),
	),
)
</script>

<style scoped lang="scss">
.promotion-highlights-3 {
  &__header {
    display: flex;
    flex-direction: column;
  }

  &__title {
    font-family: var(--highlight-title-font-family, var(--heading-font-family));
    color: var(--highlight-title-color, var(--fg-color));
    font-size: var(--highlight-title-font-size, var(--heading-2-font-size));
    font-weight: var(--highlight-title-font-weight, var(--heading-font-weight));
    font-style: var(--highlight-title-font-style, var(--heading-font-style));
    line-height: 1.5;
    letter-spacing: -0.12px;
  }
}

@media (min-width: 768px) {
  .promotion-highlights-3__title {
    font-size: var(--highlight-title-font-size, var(--heading-2-font-size));
    letter-spacing: -0.16px;
  }
}
</style>
