<template>
	<div v-if="ctaButton?.hasTitle && ctaButtonDesign?.visible" class="highlight-cta">
		<Button
			:content="ctaButton"
			:design="ctaButtonDesign"
			:raw-design="rawDesign?.cta_button"
			show-arrow
			class="highlight-cta__button"
		/>
	</div>
</template>

<script setup lang="ts">
import Button from '../../../shared/components/Button.vue'
import { useButtonElementContent, useButtonElementDesign, useVueBaseProps } from '@lightspeed/crane'
import type { Content, Design } from '../type.ts'

const { design: rawDesign } = useVueBaseProps<unknown, Design>()

const ctaButton = useButtonElementContent<Content>('cta_button')
const ctaButtonDesign = useButtonElementDesign<Design>('cta_button')
</script>

<style scoped lang="scss">
.highlight-cta {
  width: 100%;

  &__button {
    display: flex;
    width: 100%;
  }
}

@media (min-width: 768px) {
  .highlight-cta {
    width: auto;

    &__button {
      display: inline-flex;
      width: auto;
    }
  }
}
</style>
