import { BaseCard } from '../../../shared/types/type.ts'
import {
	ButtonContentData,
	EditorTypes, ImageContent,
	InputBoxContent,
	SelectBoxContent,
} from '@lightspeed/crane'
import { createFieldConfig, field } from '../../../shared/composables'
import { ComputedRef, InjectionKey } from 'vue'

interface LinksGroup extends BaseCard {
    buttonLink?: ButtonContentData;
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

interface SiteInfoContext {
    copyrightNotice: InputBoxContent,
    contactUsTitle: InputBoxContent,
    contactUsTelephone: ButtonContentData,
    contactUsMail: ButtonContentData,
    legalAndTechnicalLinks: ComputedRef<LinksGroup[]>
    socialMediaLinks: ComputedRef<SocialMediaLink[]>
}

interface SiteDesign {
    title: TextDesignData,
    link: TextDesignData,
    background: BackgroundDesignData
    footerTextDesign: TextDesignData
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