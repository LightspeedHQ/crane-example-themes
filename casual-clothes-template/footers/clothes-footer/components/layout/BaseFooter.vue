<template>
	<footer>
		<LinksGroups />
		<SiteInfo />
	</footer>
	<FooterImage v-if="toglers?.isFooterImageAndText?.enabled" />
</template>

<script lang="ts" setup>
import LinksGroups from '../links/LinksGroups.vue'
import SiteInfo from '../social/SiteInfo.vue'
import FooterImage from '../image/FooterImage.vue'
import { inject } from 'vue'
import { isElementsVisibleDesignKey } from '../../types/type.ts'

const toglers = inject(isElementsVisibleDesignKey)
</script>

<style scoped>
footer {
	display: flex;
	padding: 32px;
	flex-direction: column;
	align-items: flex-start;
	gap: 32px;
	align-self: stretch;
	font-family: var(--body-font-family);
	background: var(--footer-background, var(--bg-color));
}
</style>
