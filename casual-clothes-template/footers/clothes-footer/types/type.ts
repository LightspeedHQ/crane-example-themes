import {
	BaseCard,
	ButtonContent,
	ImageContent,
	InputBoxContent,
	SelectBoxContent,
} from '../../../shared/types/type.ts'
import { EditorTypes } from '@lightspeed/crane'
import { createFieldConfig, field } from '../../../shared/composables'
import { ComputedRef, InjectionKey } from 'vue'

interface LinksGroup extends BaseCard {
    buttonLink?: ButtonContent;
}

export const LinksGroupDeckConfig = createFieldConfig({
	buttonLink: field(EditorTypes.BUTTON, 'buttonLink'),
})

interface SocialMediaLink extends BaseCard {
    socialMediaIcons?: SelectBoxContent;
    siteName?: InputBoxContent;
}

export const SocialMediaLinkDeckConfig = createFieldConfig({
	socialMediaIcons: field(EditorTypes.SELECTBOX, 'socialMediaIcons'),
	siteName: field(EditorTypes.INPUTBOX, 'siteName'),
})

interface LinksGroupContext {
    linksGroupAccountTitle: InputBoxContent,
    accounts:  ComputedRef<LinksGroup[]>,
    linksGroupCustomerCareTitle: InputBoxContent,
    customerCares:  ComputedRef<LinksGroup[]>,
    linksGroupCompanyTitle: InputBoxContent,
    companyCares:  ComputedRef<LinksGroup[]>,
}

interface MadeWith {
    poweredBy?: string;
    company?: string;
    url?: string;
    target?: string;
}

interface SiteInfoContext {
    copyrightNotice: InputBoxContent,
    contactUsTitle: InputBoxContent,
    contactUsTelephone: ButtonContent,
    contactUsMail: ButtonContent,
    legalAndTechnicalLinks: ComputedRef<LinksGroup[]>
    socialMediaLinks: ComputedRef<SocialMediaLink[]>
    madeWith?: MadeWith
}

interface SiteDesign {
    title: TextDesignData,
    link: TextDesignData,
    background: BackgroundDesignData
    footerTextDesign: TextDesignData
    rawTitle?: ComputedRef<unknown>
    rawLink?: ComputedRef<unknown>
    rawFooterText?: ComputedRef<unknown>
}

interface FooterImageContext{
    footerImage: ImageContent
    footerText: InputBoxContent
}

interface ElementsVisibleDesign{
    isLinksGroup: ToggleDesignData
    isContactUs: ToggleDesignData
    isLegalAndTechnicalLinks: ToggleDesignData
    isSocialMediaLinks: ToggleDesignData
    isFooterImageAndText: ToggleDesignData
}

export const linksGroupKey: InjectionKey<LinksGroupContext> = Symbol('LinksGroup')
export const siteInfoKey: InjectionKey<SiteInfoContext> = Symbol('SiteInfo')
export const footerDesignKey: InjectionKey<SiteDesign> = Symbol('FooterDesign')
export const footerImageKey: InjectionKey<FooterImageContext> = Symbol('FooterImage')
export const isElementsVisibleDesignKey: InjectionKey<ElementsVisibleDesign> = Symbol('ElementsVisibleDesign')

export type {
	LinksGroup,
	SocialMediaLink,
	LinksGroupContext,
}