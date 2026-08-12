import { EditorTypes } from '@lightspeed/crane'
import { createFieldConfig, field } from '../../../shared/composables'
import { BaseCard, InputBoxContent } from '../../../shared/types/type'

/**
 * Contact Us Info card from the ContactUsInfo DECK
 */
export interface ContactUsInfoCard extends BaseCard {
	contact_value?: InputBoxContent
}

/**
 * Useful Links card from the UsefulLinks DECK
 */
export interface UsefulLinksCard extends BaseCard {
	link_title?: InputBoxContent
	link_url?: InputBoxContent
}

/**
 * Configuration for mapping ContactUsInfo deck fields
 */
export const ContactUsInfoDeckConfig = createFieldConfig({
	contact_value: field(EditorTypes.INPUTBOX, 'contact_value'),
})

/**
 * Configuration for mapping UsefulLinks deck fields
 */
export const UsefulLinksDeckConfig = createFieldConfig({
	link_title: field(EditorTypes.INPUTBOX, 'link_title'),
	link_url: field(EditorTypes.INPUTBOX, 'link_url'),
})
