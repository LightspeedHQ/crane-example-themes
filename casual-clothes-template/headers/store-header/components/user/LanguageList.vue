<template>
	<ul>
		<li v-for="language in languages" :key="language.code">
			<a
				tabindex="0"
				:aria-label="getDisplayCode(language.code)"
				:class="[
					'language-selector-link',
					{ 'language-selector-link--active': language.selected },
				]"
				@click.prevent="$emit('select', language)"
			>
				{{ getDisplayCode(language.code) }}
			</a>
		</li>
	</ul>
</template>

<script setup lang="ts">
import type { Language } from '../../composables'
import { useHeaderDesign } from '../../composables'

defineProps<{
	languages: Language[]
	getDisplayCode: (code: string) => string
}>()

defineEmits<{
	(e: 'select', language: Language): void
}>()

const { headerTextColor } = useHeaderDesign()
</script>

<style scoped lang="scss">
ul {
  list-style: none;
  padding: 0;
  margin: 0;
}

li {
  margin: 0;
  padding: 0;
}

.language-selector-link {
  color: v-bind(headerTextColor);
  font-family: var(--header-font-family, var(--body-font-family));
  font-size: var(--header-font-size, inherit);
  font-style: inherit;
  font-weight: inherit;
  line-height: 150%;
  letter-spacing: -0.08px;
  text-decoration: none;
  display: block;
  padding: 8px 12px;
  cursor: pointer;
  transition: opacity 0.2s ease, background-color 0.2s ease;
  border-radius: 4px;
  position: relative;

  &:hover {
    opacity: 0.8;
    background-color: rgba(0, 0, 0, 0.03);
  }

  &:active {
    opacity: 0.6;
  }

  &:focus-visible {
    outline: 2px solid currentColor;
    outline-offset: 2px;
  }

  &--active {
    cursor: default;
    font-weight: bold;
    color: currentColor;
    background-color: rgba(0, 0, 0, 0.05);
    position: relative;

    &::before {
      content: '';
      position: absolute;
      left: 0;
      top: 50%;
      transform: translateY(-50%);
      width: 3px;
      height: 20px;
      background-color: currentColor;
      border-radius: 2px;
    }
  }
}
</style>
