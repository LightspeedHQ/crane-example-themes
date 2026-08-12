<template>
	<a
		v-if="title"
		v-text="title"
		@click.prevent="performAction"
		:style="linkVars"> </a>
</template>

<script lang="ts" setup>
import { computed, inject } from 'vue'
import { footerDesignKey } from '../../types/type.ts'
import { createTextVars } from '../../../../shared/utils/design-vars'

interface ILinkButtonProps {
	performAction?: () => void
	title?: string
}
defineProps<ILinkButtonProps>()

const siteDesign = inject(footerDesignKey)

const linkVars = computed(() =>
	Object.fromEntries(createTextVars('footer-link', siteDesign?.link, siteDesign?.rawLink?.value)),
)
</script>

<style scoped>
a {
	position: relative;
	display: inline-block;
	text-decoration: none;
	cursor: pointer;
	padding-bottom: 2px;
	font-family: var(--footer-link-font-family, var(--body-font-family));
	color: var(--footer-link-color, var(--fg-color));
	font-size: var(--footer-link-font-size, var(--body-2-font-size));
	font-weight: var(--footer-link-font-weight, var(--body-font-weight));
	font-style: var(--footer-link-font-style, normal);
}

a::after {
	content: '';
	position: absolute;
	bottom: 0;
	left: 0;
	width: 0;
	height: 1px;
	background-color: currentColor;
	transition: width 0.3s ease;
}

a:hover::after {
	width: 100%;
}
</style>
