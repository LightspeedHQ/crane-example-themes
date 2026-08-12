<template>
	<SectionWrapper :style="backgroundStyle">
		<!-- Section Header -->
		<SectionHeader
			:title="sectionTitle"
			:description="sectionDescription"
			:title-design="sectionTitleDesign"
			:description-design="sectionDescriptionDesign"
			:raw-title-design="rawDesign?.section_title"
			:raw-description-design="rawDesign?.section_description"
		/>

		<!-- Empty State -->
		<EmptyState
			v-if="!promotionProductsContent.hasProducts"
			:title="t('$label.empty.title')"
			:message="t('$label.empty.message')"
		/>

		<!-- Products Carousel -->
		<ProductsCarousel
			v-else
			:products="productCards"
			:product-title-design="productTitleDesign"
			:product-price="productPriceDesign"
			:product-price-sale="productSalePriceDesign"
			:button="viewAllButton"
			:button-design="btnDesign as ButtonDesignData"
			:raw-product-title-design="rawDesign?.product_title"
			:raw-product-price-design="rawDesign?.product_price"
			:raw-product-sale-price-design="rawDesign?.product_sale_price"
			:raw-button-design="rawDesign?.view_all_button"
			:prev-label="t('$label.nav.previous')"
			:next-label="t('$label.nav.next')"
			:current-language="currentLang"
		/>
	</SectionWrapper>
</template>

<script setup lang="ts">
import {
	useBackgroundElementDesign,
	useButtonElementDesign,
	useButtonElementContent,
	useInputboxElementContent,
	useTextareaElementContent,
	useTextElementDesign,
	useProductSelectorElementContent,
	useVueBaseProps,
} from '@lightspeed/crane'
import { Content, Design } from './type'
import { ProductCard } from './types'
import type { ImageContent } from '../../shared/types/type'
import translations from './settings/translations'

import SectionWrapper from '../../shared/components/SectionWrapper.vue'
import SectionHeader from '../../shared/components/SectionHeader.vue'
import ProductsCarousel from './components/ProductsCarousel.vue'
import EmptyState from '../../shared/components/EmptyState.vue'
import { computed } from 'vue'
import { useTranslations, useOrderedSelectorProducts } from '../../shared/composables'
import { useColorPresetVars } from '../../shared/composables/design'
import { createBackgroundVars } from '../../shared/utils/design-vars'

const { t, currentLang } = useTranslations(translations)

const promotionProductsContent = useProductSelectorElementContent<Content>('promotion_products')

const sectionTitle = useInputboxElementContent<Content>('section_title')
const sectionDescription = useTextareaElementContent<Content>('section_description')

const sectionTitleDesign = useTextElementDesign<Design>('section_title') as TextDesignData
const sectionDescriptionDesign = useTextElementDesign<Design>('section_description') as TextDesignData

const { design: rawDesign } = useVueBaseProps<unknown, Design>()
const productTitleDesign = useTextElementDesign<Design>('product_title') as TextDesignData
const productPriceDesign = useTextElementDesign<Design>('product_price') as TextDesignData
const productSalePriceDesign = useTextElementDesign<Design>('product_sale_price') as TextDesignData

const backgroundDesign = useBackgroundElementDesign<Design>('background') as BackgroundDesignData
const colorPresetVars = useColorPresetVars(rawDesign)
const backgroundStyle = computed(() => ({
	...Object.fromEntries(createBackgroundVars('section', backgroundDesign, rawDesign.value?.background)),
	...colorPresetVars.value,
}))

const viewAllButton = useButtonElementContent<Content>('view_all_button')
const btnDesign = useButtonElementDesign<Design>('view_all_button')

const orderedProducts = useOrderedSelectorProducts(promotionProductsContent, 'promotion_products')

const productCards = computed<ProductCard[]>(() =>
	orderedProducts.value.map((product, index) => ({
		id: product.id || index,
		product_tag: product.ribbon?.text && product.ribbon.color ? {
			value: product.ribbon.text,
			color: `rgba(${product.ribbon.color.red}, ${product.ribbon.color.green}, ${product.ribbon.color.blue}, ${product.ribbon.color.alpha})`,
			hasContent: true,
		} : undefined,
		item_image: product.imageUrl ? {
			highResolutionDesktopImage: product.imageUrl,
			lowResolutionDesktopImage: product.imageUrl,
			lowResolutionMobileImage: product.imageUrl,
			highResolutionMobileImage: product.imageUrl,
			hasContent: true,
		} satisfies ImageContent : undefined,
		item_title: {
			value: product.name,
			hasContent: true,
		},
		item_price: {
			value: product.formattedPrice,
			hasContent: true,
		},
		item_original_price: product.formattedComparePrice ? {
			value: product.formattedComparePrice,
			hasContent: true,
		} : undefined,
		item_rating: {
			value: product.productRating?.rating ? String(product.productRating.rating) : '0',
			hasContent: !!product.productRating?.rating,
		},
		item_link: {
			value: product.url,
			hasContent: true,
		},
	})),
)

</script>
