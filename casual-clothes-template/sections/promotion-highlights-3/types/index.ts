import { EditorTypes } from '@lightspeed/crane'
import { createFieldConfig, field } from '../../../shared/composables'
import { BaseCard, ImageContent, InputBoxContent } from '../../../shared/types/type.ts'

export interface GalleryItemCard extends BaseCard {
	image?: ImageContent
	alt_text?: InputBoxContent
}

export const GalleryItemDeckConfig = createFieldConfig({
	image: field(EditorTypes.IMAGE, 'image'),
	alt_text: field(EditorTypes.INPUTBOX, 'alt_text'),
})
