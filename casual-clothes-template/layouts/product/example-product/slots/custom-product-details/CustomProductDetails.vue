<template>
	<section class="product-section" :style="sectionStyle" @click.capture="blockPreviewNavigation">
		<ProductLoadState
			v-if="isLoading && !product"
			state="loading"
			:loading-label="t('$label.loading')"
			:error-label="t('$label.load_error')"
			:retry-label="t('$label.retry')"
			@retry="retry"
		/>

		<ProductLoadState
			v-else-if="error && !product"
			state="error"
			:loading-label="t('$label.loading')"
			:error-label="t('$label.load_error')"
			:retry-label="t('$label.retry')"
			@retry="retry"
		/>

		<div
			v-else-if="product"
			class="product-shell"
			itemscope
			itemtype="https://schema.org/Product"
		>
			<ProductBreadcrumbs
				:visible="design.breadcrumbs.visible !== false"
				:catalog-label="labels.catalog"
				:categories="breadcrumbCategories"
				:product-name="product.name"
				:is-preview-mode="isPreviewMode"
			/>

			<div class="product-grid">
				<ProductGallery
					:images="galleryImages"
					:active-image="activeImage"
					:product-name="product.name"
					:navigation-enabled="design.galleryNavigation.enabled === true"
					:zoom-enabled="!isPreviewMode"
					:close-label="t('$label.close_gallery')"
					:zoom-in-label="t('$label.zoom_in')"
					:zoom-out-label="t('$label.zoom_out')"
					:previous-image-label="t('$label.previous_image')"
					:next-image-label="t('$label.next_image')"
					:select-image-label="t('$label.select_image')"
					@select-image="selectImage"
				/>

				<div class="product-info">
					<ProductOverview
						:name="product.name"
						:subtitle="product.subtitle"
						:price="displayedPrice"
						:compare-price="displayedComparePrice"
						:title-visible="design.productTitle.visible !== false"
						:subtitle-visible="design.productSubtitle.visible !== false"
						:price-visible="design.productPrice.visible !== false"
						:compare-price-visible="design.productComparePrice.visible !== false"
						:is-purchasable="isPurchasable"
					/>

					<ProductOptions
						:options="currentOptions"
						:selected-options="selectedOptions"
						:labels-visible="design.productOptionLabels.visible !== false"
						@update-selected-options="updateSelectedOptions"
					/>

					<ProductPurchaseActions
						:quantity="quantity"
						:minimum-quantity="minimumQuantity"
						:maximum-quantity="maximumQuantity"
						:quantity-visible="design.quantity.visible !== false"
						:quantity-label="labels.quantity"
						:quantity-limit-label="quantityLimitLabel"
						:message="purchaseMessage"
						:add-to-cart-visible="design.addToCart.visible !== false"
						:add-to-cart-disabled="!isPurchasable || isAdding"
						:add-to-cart-label="addToCartLabel"
						:favorite-enabled="design.favoriteButton.enabled === true"
						:favorite-active="isFavorite"
						:favorite-busy="isFavoriteBusy"
						:favorite-label="t('$label.favorite')"
						@update-quantity="quantity = $event"
						@normalize-quantity="normalizeQuantity"
						@add-to-cart="addToCart"
						@toggle-favorite="toggleFavorite"
					/>

					<ProductDetailsPanel
						:visible="design.productDetails.visible !== false"
						:title="labels.productDetails"
						:sku-enabled="design.productSku.enabled === true"
						:sku="displayedSku"
						:sku-label="t('$label.sku')"
						:stock-enabled="design.productStock.enabled === true"
						:stock="displayedStock"
						:stock-label="t('$label.stock')"
						:attributes-enabled="design.productAttributes.enabled === true"
						:attributes="configuration?.attributes ?? product.attributes"
						:description-enabled="design.productDescription.enabled === true"
						:description="product.description"
						:read-more-label="labels.readMore"
						:read-less-label="labels.readLess"
					/>

					<ProductShareLinks
						:visible="design.share.visible !== false"
						:label="labels.share"
						:product-url="product.urls.proxyLinkUrl || product.urls.directPageUrl || ''"
						:product-name="product.name"
						:image-url="activeImage?.url"
					/>
				</div>
			</div>
		</div>
	</section>
</template>

<script setup lang="ts">
import { usePreviewMode } from '../../../../../shared/composables/crane/use-preview-mode.ts'
import ProductBreadcrumbs from './components/ProductBreadcrumbs.vue'
import ProductDetailsPanel from './components/ProductDetailsPanel.vue'
import ProductGallery from './components/ProductGallery.vue'
import ProductLoadState from './components/ProductLoadState.vue'
import ProductOptions from './components/ProductOptions.vue'
import ProductOverview from './components/ProductOverview.vue'
import ProductPurchaseActions from './components/ProductPurchaseActions.vue'
import ProductShareLinks from './components/ProductShareLinks.vue'
import { useCurrentProduct } from './use-current-product.ts'
import { useProductDetailsModel } from './composables/use-product-details-model.ts'
import { useProductSectionSettings } from './composables/use-product-section-settings.ts'

const { isPreviewMode } = usePreviewMode()
const {
	product,
	productMediaIndex,
	productCategoryId,
	isLoading,
	error,
	retry,
} = useCurrentProduct()
const { t, labels, design, sectionStyle } = useProductSectionSettings()
const {
	configuration,
	selectedOptions,
	currentOptions,
	galleryImages,
	activeImage,
	selectImage,
	breadcrumbCategories,
	displayedPrice,
	displayedComparePrice,
	displayedSku,
	displayedStock,
	purchaseMessage,
	quantity,
	minimumQuantity,
	maximumQuantity,
	quantityLimitLabel,
	isAdding,
	isPurchasable,
	addToCartLabel,
	normalizeQuantity,
	addToCart,
	isFavorite,
	isFavoriteBusy,
	toggleFavorite,
	updateSelectedOptions,
} = useProductDetailsModel({
	product,
	productMediaIndex,
	productCategoryId,
	isPreviewMode,
	translate: t,
	labels,
})

function blockPreviewNavigation(event: MouseEvent) {
	if (!isPreviewMode.value) return
	const target = event.target
	if (target instanceof Element && target.closest('a')) event.preventDefault()
}
</script>

<style lang="scss" src="./custom-product-details-host.scss"></style>
<style scoped lang="scss" src="./custom-product-details.scss"></style>
