import type { StorefrontProduct } from '@lightspeed/ecom-headless'
import { computed, onBeforeUnmount, ref, type Ref, watch } from 'vue'

import type { SelectedOptionValue } from '../product-details-types.ts'
import { useProductConfiguration } from './use-product-configuration.ts'
import { useProductFavorites } from './use-product-favorites.ts'
import { useProductGallery } from './use-product-gallery.ts'
import { useProductPurchase } from './use-product-purchase.ts'

interface ProductDetailsModelOptions {
	product: Readonly<Ref<StorefrontProduct | undefined>>,
	productMediaIndex: Readonly<Ref<number | undefined>>,
	productCategoryId: Readonly<Ref<number | undefined>>,
	isPreviewMode: Readonly<Ref<boolean>>,
	translate: (key: string) => string,
	labels: {
		readonly addToCart: string,
		readonly adding: string,
		readonly added: string,
		readonly outOfStock: string,
	},
}

export function useProductDetailsModel(options: ProductDetailsModelOptions) {
	const purchaseMessage = ref('')
	const productGeneration = ref(0)

	watch(options.product, (nextProduct, previousProduct) => {
		if (nextProduct?.id !== previousProduct?.id) productGeneration.value += 1
		purchaseMessage.value = ''
	}, { immediate: true })

	onBeforeUnmount(() => {
		productGeneration.value += 1
	})

	const configurationModel = useProductConfiguration({
		product: options.product,
		translate: options.translate,
		onError: (message) => {
			purchaseMessage.value = message
		},
	})
	watch(options.product, configurationModel.reset, { immediate: true })

	const galleryModel = useProductGallery({
		product: options.product,
		configuration: configurationModel.configuration,
		productMediaIndex: options.productMediaIndex,
	})
	const purchaseModel = useProductPurchase({
		product: options.product,
		configuration: configurationModel.configuration,
		currentOptions: configurationModel.currentOptions,
		selectedOptions: configurationModel.selectedOptions,
		isConfigurationLoading: configurationModel.isConfigurationLoading,
		requiredOptionsAreSelected: configurationModel.requiredOptionsAreSelected,
		configurationMatchesSelection: configurationModel.configurationMatchesSelection,
		selectedOptionsAreValid: configurationModel.selectedOptionsAreValid,
		hasUnsupportedOptions: configurationModel.hasUnsupportedOptions,
		stockIsAvailable: configurationModel.stockIsAvailable,
		productGeneration,
		isPreviewMode: options.isPreviewMode,
		message: purchaseMessage,
		translate: options.translate,
		labels: options.labels,
	})
	const favoritesModel = useProductFavorites({
		product: options.product,
		productGeneration,
		isPreviewMode: options.isPreviewMode,
		message: purchaseMessage,
		translate: options.translate,
	})

	const breadcrumbCategories = computed(() => {
		const paths = options.product.value?.categoryPaths ?? []
		const currentCategoryId = options.productCategoryId.value
		const currentPath = currentCategoryId === undefined
			? undefined
			: paths.find(path => path.items[path.items.length - 1]?.id === currentCategoryId)
		return (currentPath ?? paths.find(path => path.isDefault) ?? paths[0])?.items
			.filter(category => category.id !== 0 && category.name.trim().length > 0)
			.slice(0, 3) ?? []
	})
	const displayedPrice = computed(() => configurationModel.configuration.value?.price.priceFormatted ?? '')
	const displayedComparePrice = computed(() => (
		configurationModel.configuration.value?.price.compareToPriceFormatted ?? ''
	))
	const displayedSku = computed(() => (
		configurationModel.configuration.value?.sku ?? options.product.value?.sku
	))
	const displayedStock = computed(() => configurationModel.configuration.value?.inventory.quantity)
	const updateSelectedOptions = (value: Record<string, SelectedOptionValue>) => {
		purchaseMessage.value = ''
		purchaseModel.resetAddedState()
		void configurationModel.updateSelectedOptions(value)
	}

	return {
		configuration: configurationModel.configuration,
		selectedOptions: configurationModel.selectedOptions,
		currentOptions: configurationModel.currentOptions,
		galleryImages: galleryModel.galleryImages,
		activeImage: galleryModel.activeImage,
		selectImage: galleryModel.selectImage,
		breadcrumbCategories,
		displayedPrice,
		displayedComparePrice,
		displayedSku,
		displayedStock,
		purchaseMessage,
		quantity: purchaseModel.quantity,
		minimumQuantity: purchaseModel.minimumQuantity,
		maximumQuantity: purchaseModel.maximumQuantity,
		quantityLimitLabel: purchaseModel.quantityLimitLabel,
		isAdding: purchaseModel.isAdding,
		isPurchasable: purchaseModel.isPurchasable,
		addToCartLabel: purchaseModel.addToCartLabel,
		normalizeQuantity: purchaseModel.normalizeQuantity,
		addToCart: purchaseModel.addToCart,
		isFavorite: favoritesModel.isFavorite,
		isFavoriteBusy: favoritesModel.isFavoriteBusy,
		toggleFavorite: favoritesModel.toggleFavorite,
		updateSelectedOptions,
	}
}
