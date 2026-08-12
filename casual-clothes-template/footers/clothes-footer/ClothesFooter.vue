<template>
	<div :style="footerVars">
		<BaseFooter />
	</div>
</template>

<script setup lang="ts">
import {
	useBackgroundElementDesign,
	useButtonElementContent,
	useDeckElementContent,
	useImageElementContent,
	useInputboxElementContent,
	useTextElementDesign,
	useToggleElementDesign,
	useVueBaseProps,
} from '@lightspeed/crane'
import { useMappedDeckCards } from '../../shared/composables'
import { useColorPresetVars } from '../../shared/composables/design'
import { createBackgroundVars } from '../../shared/utils/design-vars'
import {
	footerDesignKey,
	footerImageKey,
	isElementsVisibleDesignKey,
	LinksGroup,
	LinksGroupDeckConfig,
	linksGroupKey,
	siteInfoKey,
	SocialMediaLink,
	SocialMediaLinkDeckConfig,
} from './types/type.ts'
import { Content, Design } from './type.ts'
import BaseFooter from './components/layout/BaseFooter.vue'
import { provide, computed } from 'vue'

const linksGroupAccountTitle = useInputboxElementContent('linksGroupAccountTitle')
const linksGroupAccountRaw = useDeckElementContent('linksGroupAccount')

const linksGroupCustomerCareTitle = useInputboxElementContent('linksGroupCustomerCareTitle')
const linksGroupCustomerCareRaw = useDeckElementContent('linksGroupCustomerCare')

const copyrightNotice = useInputboxElementContent('copyrightNotice')
const linksGroupCompanyTitle = useInputboxElementContent('linksGroupCompanyTitle')
const linksGroupCompanyCareRaw = useDeckElementContent('linksGroupCompanyCare')
const legalAndTechnicalLinksRaw = useDeckElementContent('legalAndTechnicalLinks')
const socialMediaLinksRaw = useDeckElementContent('socialMediaLinks')

const accounts = useMappedDeckCards<LinksGroup, Content>(linksGroupAccountRaw, LinksGroupDeckConfig)
const customerCares = useMappedDeckCards<LinksGroup, Content>(linksGroupCustomerCareRaw, LinksGroupDeckConfig)
const companyCares = useMappedDeckCards<LinksGroup, Content>(linksGroupCompanyCareRaw, LinksGroupDeckConfig)

const contactUsTitle = useInputboxElementContent('contactUsTitle')
const contactUsTelephone = useButtonElementContent('contactUsTelephone')
const contactUsMail = useButtonElementContent('contactUsMail')

const legalAndTechnicalLinks = useMappedDeckCards<LinksGroup, Content>(legalAndTechnicalLinksRaw, LinksGroupDeckConfig)
const socialMediaLinks = useMappedDeckCards<SocialMediaLink, Content>(socialMediaLinksRaw, SocialMediaLinkDeckConfig)

const baseProps = useVueBaseProps<unknown, Design>()
const colorPresetVars = useColorPresetVars(baseProps.design)
const madeWith = baseProps.site?.value?.madeWith

const footerImage = useImageElementContent<Content>('footer_image')
const footerText = useInputboxElementContent<Content>('footer_text')

provide(footerImageKey, {
	footerImage,
	footerText,
})

provide(linksGroupKey, {
	linksGroupAccountTitle,
	linksGroupCustomerCareTitle,
	linksGroupCompanyTitle,
	accounts,
	customerCares,
	companyCares,
})

provide(siteInfoKey, {
	copyrightNotice,
	contactUsTitle,
	contactUsTelephone,
	contactUsMail,
	legalAndTechnicalLinks,
	socialMediaLinks,
	madeWith,
})

const title = useTextElementDesign<Design>('title') as TextDesignData
const link = useTextElementDesign<Design>('link') as TextDesignData
const footerTextDesign = useTextElementDesign<Design>('footer_text') as TextDesignData
const background = useBackgroundElementDesign<Design>('background') as BackgroundDesignData

const rawTitle = computed(() => baseProps.design.value?.title)
const rawLink = computed(() => baseProps.design.value?.link)
const rawFooterText = computed(() => baseProps.design.value?.footer_text)
const rawBackground = computed(() => baseProps.design.value?.background)

const footerVars = computed(() => ({
	...colorPresetVars.value,
	...Object.fromEntries(createBackgroundVars('footer', background, rawBackground.value)),
}))

provide(footerDesignKey, {
	title,
	link,
	background,
	footerTextDesign,
	rawTitle,
	rawLink,
	rawFooterText,
})

const isLinksGroup = useToggleElementDesign<Design>('isLinksGroup') as ToggleDesignData
const isContactUs = useToggleElementDesign<Design>('isContactUs') as ToggleDesignData
const isLegalAndTechnicalLinks = useToggleElementDesign<Design>('isLegalAndTechnicalLinks') as ToggleDesignData
const isSocialMediaLinks = useToggleElementDesign<Design>('isSocialMediaLinks') as ToggleDesignData
const isFooterImageAndText = useToggleElementDesign<Design>('isFooterImageAndText') as ToggleDesignData

provide(isElementsVisibleDesignKey,{
	isLinksGroup,
	isContactUs,
	isLegalAndTechnicalLinks,
	isSocialMediaLinks,
	isFooterImageAndText,
})
</script>

<style scoped lang="scss">

</style>
