<template>
	<div class="link-container">
		<div class="link-item" v-if="linksGroups !== undefined && toglers?.isLinksGroup?.enabled">
			<div class="link-header" :style="titleVars">
				{{ linksGroups.linksGroupAccountTitle.value }}
			</div>

			<div class="link-body">
				<div v-for="acc in linksGroups.accounts.value" :key="acc.id">
					<LinkButton
						v-if="acc.buttonLink !== undefined"
						:title="acc.buttonLink.title"
						:perform-action="acc.buttonLink.performAction"
					/>
				</div>
			</div>
		</div>

		<div class="link-item" v-if="linksGroups !== undefined && toglers?.isLinksGroup?.enabled">
			<div class="link-header" :style="titleVars">
				{{ linksGroups.linksGroupCustomerCareTitle.value }}
			</div>

			<div class="link-body">
				<div v-for="cus in linksGroups.customerCares.value" :key="cus.id">
					<LinkButton
						v-if="cus.buttonLink !== undefined"
						:title="cus.buttonLink.title"
						:perform-action="cus.buttonLink.performAction"
					/>
				</div>
			</div>
		</div>

		<div class="link-item" v-if="linksGroups !== undefined && toglers?.isLinksGroup?.enabled">
			<div class="link-header" :style="titleVars">
				{{ linksGroups.linksGroupCompanyTitle.value }}
			</div>

			<div class="link-body">
				<div v-for="com in linksGroups.companyCares.value" :key="com.id">
					<LinkButton
						v-if="com.buttonLink !== undefined"
						:title="com.buttonLink.title"
						:perform-action="com.buttonLink.performAction"
					/>
				</div>
			</div>
		</div>

		<div class="contact-me" v-if="siteInfo && toglers?.isContactUs?.enabled">
			<div class="contact-me-header" :style="titleVars">
				{{ siteInfo.contactUsTitle.value }}
			</div>
			<div class="contact-me-info">
				<PhoneButton
					:phone="siteInfo.contactUsTelephone.phone!"
					:perform-action="siteInfo.contactUsTelephone.performAction"
				>
				</PhoneButton>
				<EmailButton
					:email="siteInfo.contactUsMail.email!"
					:perform-action="siteInfo.contactUsMail.performAction"
				>
				</EmailButton>
			</div>
		</div>
	</div>
</template>

<script lang="ts" setup>
import { computed, inject } from 'vue'
import {
	footerDesignKey,
	isElementsVisibleDesignKey,
	linksGroupKey,
	siteInfoKey,
} from '../../types/type.ts'
import LinkButton from './LinkButton.vue'
import EmailButton from '../contact/EmailButton.vue'
import PhoneButton from '../contact/PhoneButton.vue'
import { createTextVars } from '../../../../shared/utils/design-vars'

const linksGroups = inject(linksGroupKey)
const siteDesign = inject(footerDesignKey)
const siteInfo = inject(siteInfoKey)
const toglers = inject(isElementsVisibleDesignKey)

const titleVars = computed(() =>
	Object.fromEntries(
		createTextVars('footer-title', siteDesign?.title, siteDesign?.rawTitle?.value),
	),
)
</script>

<style scoped>
.link-container {
	display: grid;
	grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
	gap: 32px;
	width: 100%;
}

.link-item {
	display: flex;
	flex-direction: column;
	align-items: flex-start;
	gap: 16px;
}

.link-header {
	font-family: var(--footer-title-font-family, var(--body-font-family));
	color: var(--footer-title-color, var(--fg-color));
	font-size: var(--footer-title-font-size, var(--body-2-font-size));
	font-weight: var(--footer-title-font-weight, 700);
	font-style: var(--footer-title-font-style, normal);
	line-height: 150%;
	letter-spacing: -0.08px;
}

.link-body {
	display: flex;
	flex-direction: column;
	gap: 8px;
	line-height: 150%;
	letter-spacing: -0.08px;
}

.contact-me {
	display: flex;
	flex-direction: column;
	align-items: flex-start;
	gap: 16px;
	max-width: 420px;
	justify-self: start;
}

.contact-me-header {
	font-family: var(--footer-title-font-family, var(--body-font-family));
	color: var(--footer-title-color, var(--fg-color));
	font-size: var(--footer-title-font-size, var(--body-2-font-size));
	font-weight: var(--footer-title-font-weight, 700);
	font-style: var(--footer-title-font-style, normal);
	line-height: 150%;
	letter-spacing: -0.08px;
}

.contact-me-info {
	display: flex;
	flex-direction: column;
	align-items: flex-start;
	line-height: 150%;
	letter-spacing: -0.08px;
}

@media (max-width: 1000px) {
	.link-container {
		grid-template-columns: repeat(2, 1fr);
		gap: 32px;
	}
}

@media (max-width: 768px) {
	.link-container {
		grid-template-columns: repeat(1, 1fr);
		gap: 32px;
	}
}
</style>
