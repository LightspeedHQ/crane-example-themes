import { EditorTypes } from '@lightspeed/crane'
import { createFieldConfig, field } from '../../../shared/composables'
import { BaseCard, InputBoxContent, TextAreaContent } from '../../../shared/types/type'

/**
 * Location card from the locations DECK
 */
export interface LocationCard extends BaseCard {
	location_name?: InputBoxContent
	location_address?: TextAreaContent
	location_phone?: InputBoxContent
}

/**
 * Configuration for mapping location deck fields
 */
export const LocationDeckConfig = createFieldConfig({
	location_name: field(EditorTypes.INPUTBOX, 'location_name'),
	location_address: field(EditorTypes.TEXTAREA, 'location_address'),
	location_phone: field(EditorTypes.INPUTBOX, 'location_phone'),
})
