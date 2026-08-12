<template>
	<div class="contact-me-container" v-if="siteInfo">
		<div class="copyright-section">
			<div class="copyright">
				{{ siteInfo.copyrightNotice.value }}
			</div>
			<a
				v-if="siteInfo.madeWith"
				rel="noopener noreferrer"
				:target="siteInfo.madeWith?.target"
				class="powered-by"
				:href="siteInfo.madeWith?.url"
			>
				{{ siteInfo.madeWith?.poweredBy }} <u>{{ siteInfo.madeWith?.company }}</u>
			</a>
		</div>
	</div>
	<Divider
		v-if="toglers?.isLegalAndTechnicalLinks.enabled || toglers?.isSocialMediaLinks.enabled"
	/>
	<div
		class="legal-social-container"
		v-if="
			siteInfo &&
				(toglers?.isLegalAndTechnicalLinks.enabled || toglers?.isSocialMediaLinks.enabled)
		"
	>
		<div
			class="legal-items"
			:style="{ '--footer-link-color': 'var(--fg-muted-color)' }"
			v-if="toglers?.isLegalAndTechnicalLinks?.enabled"
		>
			<template
				v-for="(legal, index) in siteInfo.legalAndTechnicalLinks.value"
				:key="legal.id"
			>
				<LinkButton
					v-if="legal.buttonLink !== undefined"
					:title="legal.buttonLink.title"
					:perform-action="legal.buttonLink.performAction"
				/>

				<p
					class="separator"
					v-if="index < siteInfo.legalAndTechnicalLinks.value.length - 1"
					v-text="'|'"
				></p>
			</template>
		</div>

		<div
			class="social-links"
			v-if="toglers?.isSocialMediaLinks?.enabled && siteInfo?.socialMediaLinks?.value?.length"
		>
			<a
				v-for="social in siteInfo.socialMediaLinks.value"
				:key="social.id"
				:href="`${social.socialMediaIcons?.value}${social.siteName?.value}`"
				class="social-icon"
				target="_blank"
				rel="noopener"
				:title="social.siteName?.value"
			>
				<Instagram v-if="social.socialMediaIcons?.value?.includes('instagram')" />
				<Facebook v-if="social.socialMediaIcons?.value?.includes('facebook')" />
				<TikTok v-if="social.socialMediaIcons?.value?.includes('tiktok')" />
				<X v-if="social.socialMediaIcons?.value?.includes('x.com')" />
			</a>
		</div>
	</div>
</template>

<script lang="ts" setup>
import Divider from '../layout/Divider.vue'
import { inject } from 'vue'
import { isElementsVisibleDesignKey, siteInfoKey } from '../../types/type.ts'
import LinkButton from '../links/LinkButton.vue'
import Instagram from './Icons/Instagram.vue'
import Facebook from './Icons/Facebook.vue'
import TikTok from './Icons/TikTok.vue'
import X from './Icons/X.vue'

const siteInfo = inject(siteInfoKey)
const toglers = inject(isElementsVisibleDesignKey)
</script>

<style scoped>
.contact-me-container {
	display: grid;
	grid-template-columns: 1fr 1fr;
	gap: 32px;
	align-items: end;
	width: 100%;
}

.legal-social-container {
	display: grid;
	grid-template-columns: 1fr 1fr;
	gap: 32px;
	width: 100%;
	align-items: center;
	font-family: var(--body-font-family);
}

.legal-items {
	display: flex;
	align-items: center;
	gap: 32px;
	flex-wrap: wrap;
	font-size: var(--body-2-font-size);
}

.copyright-section {
	display: flex;
	flex-direction: column;
	gap: 4px;
	justify-self: start;
	font-family: var(--body-font-family);
	font-size: var(--body-2-font-size);
	color: var(--fg-muted-color);
}

.copyright {
	display: flex;
	align-items: center;
	justify-self: start;
}

.powered-by {
	font-size: inherit;
	line-height: 150%;
	color: inherit;
	text-decoration: none;
}

.separator {
	color: var(--fg-muted-color);
}

.social-links {
	display: flex;
	gap: 32px;
	flex-wrap: wrap;
	font-size: var(--body-2-font-size);
	color: var(--fg-accented-color);
}

.social-icon {
	display: flex;
	align-items: center;
	justify-content: center;
}

@media (max-width: 768px) {
	.contact-me-container {
		grid-template-columns: 1fr;
		gap: 24px;
		align-items: start;
	}

	.copyright {
		width: 100%;
		justify-self: start;
	}

	.legal-social-container {
		grid-template-columns: 1fr;
		gap: 24px;
	}

	.social-links {
		justify-self: start;
		margin-top: 8px;
	}

	.separator {
		display: none;
	}

	.legal-items {
		display: flex;
		align-items: flex-start;
		gap: 0;
		flex-wrap: wrap;
		flex-direction: column;
	}

	.social-links {
		justify-self: start;
	}
}
</style>
