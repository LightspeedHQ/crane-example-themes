<template>
	<div
		class="navigation-link"
		:data-is-bold="isBold"
		:data-uppercase="uppercase"
		:data-variant="variant"
		:data-preview-mode="isPreviewMode">
		<a 
			:href="isPreviewMode ? 'javascript:void(0)' : linkUrl" 
			:class="[linkClass, { 'navigation-link--disabled': isPreviewMode }]"
			:title="description"
			:aria-label="description ? `${linkText}: ${description}` : linkText"
			:aria-expanded="ariaExpanded"
			@click="handleClick"
		>
			<slot>
				{{ linkText }}
			</slot>
		</a>
	</div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { useVueBaseProps } from '@lightspeed/crane'
import { makeLanguageAwareUrl, getCurrentLanguageFromSite } from '../../../../../shared/utils'
import { usePreviewMode } from '../../../../../shared/composables'

interface Props {
  text: string;
  url: string;
  description?: string;
  isBold?: boolean;
  uppercase?: boolean;
  variant?: 'default' | 'button' | 'icon';
  linkClass?: string;
  /** Pass true/false when this link acts as a dropdown trigger (announces expanded state to screen readers) */
  ariaExpanded?: boolean;
}

const props = withDefaults(defineProps<Props>(), {
	isBold: false,
	uppercase: false,
	variant: 'default',
	linkClass: '',
})

const baseProps = useVueBaseProps()
const siteContent = baseProps.site?.value

const { isPreviewMode } = usePreviewMode()

const linkText = computed(() => {
	return props.text
})

const linkUrl = computed(() => {
	const lang = getCurrentLanguageFromSite(siteContent)
	return makeLanguageAwareUrl(props.url, lang, siteContent?.languages)
})

/**
 * Handle click event - block navigation in preview mode
 */
const handleClick = (event: MouseEvent) => {
	if (isPreviewMode.value) {
		event.preventDefault()
	}
}
</script>

<style scoped>
.navigation-link a {
  /* Inherit color and font from parent (header sets these dynamically) */
  color: inherit;
  font-family: inherit;
  font-size: inherit;
  font-style: normal;
  font-weight: 400;
  line-height: 150%;
  letter-spacing: -0.08px;
  text-decoration: none;
  display: inline-flex;
  align-items: center;
  transition: opacity 0.2s ease;
}

.navigation-link a:visited {
  color: inherit;
}

.navigation-link a:hover {
  opacity: 0.8;
}

.navigation-link a:focus-visible {
  outline: 2px solid currentColor;
  outline-offset: 2px;
}

.navigation-link a:active {
  opacity: 0.6;
}

.navigation-link[data-is-bold="true"] a {
  font-weight: 700;
}

.navigation-link[data-uppercase="true"] a {
  text-transform: uppercase;
}

/* Variant styles */
.navigation-link[data-variant="button"] a {
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 8px 12px;
  border-radius: 6px;
  transition: opacity 0.2s ease, background-color 0.2s ease;
}

.navigation-link[data-variant="button"] a:hover {
  opacity: 0.8;
  background-color: rgba(0, 0, 0, 0.03);
}

.navigation-link[data-variant="button"] a:active {
  opacity: 0.6;
}

.navigation-link[data-variant="icon"] a {
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 4px 8px;
  border-radius: 4px;
  transition: opacity 0.2s ease;
}

.navigation-link[data-variant="icon"] a:hover {
  opacity: 0.8;
}

.navigation-link[data-variant="icon"] a:active {
  opacity: 0.6;
}
</style>
