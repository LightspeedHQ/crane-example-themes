import { EditorTypes } from '@lightspeed/crane'
import { createFieldConfig, field } from '../../../shared/composables'
import { BaseCard, ImageContent, InputBoxContent, SelectBoxContent } from '../../../shared/types/type.ts'

/**
 * Product card with all the details
 */
export interface ProductCard extends BaseCard {
	product_tag?: InputBoxContent & { color?: string }
	item_image?: ImageContent
	item_title?: InputBoxContent
	item_price?: InputBoxContent
	item_original_price?: InputBoxContent
	item_rating?: SelectBoxContent
	item_link?: InputBoxContent
}

/**
 * Configuration for mapping card deck fields
 */
export const ProductCardConfig = createFieldConfig({
	product_tag: field(EditorTypes.INPUTBOX, 'product_tag'),
	item_image: field(EditorTypes.IMAGE, 'item_image'),
	item_title: field(EditorTypes.INPUTBOX, 'item_title'),
	item_price: field(EditorTypes.INPUTBOX, 'item_price'),
	item_original_price: field(EditorTypes.INPUTBOX, 'item_original_price'),
	item_rating: field(EditorTypes.SELECTBOX, 'item_rating'),
	item_link: field(EditorTypes.INPUTBOX, 'item_link'),
})
