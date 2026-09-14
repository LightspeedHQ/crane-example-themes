import {
	Cart,
	type StorefrontProduct,
	type StorefrontProductConfiguration,
	type StorefrontProductOption,
} from '@lightspeed/ecom-headless'
import { computed, ref, type Ref, watch } from 'vue'

import type { SelectedOptionValue } from '../product-details-types.ts'
import { interpolate, positiveNumber } from '../product-details-utils.ts'

interface ProductPurchaseOptions {
	product: Readonly<Ref<StorefrontProduct | undefined>>,
	configuration: Readonly<Ref<StorefrontProductConfiguration | undefined>>,
	currentOptions: Readonly<Ref<readonly StorefrontProductOption[]>>,
	selectedOptions: Readonly<Ref<Readonly<Record<string, SelectedOptionValue>>>>,
	isConfigurationLoading: Readonly<Ref<boolean>>,
	requiredOptionsAreSelected: Readonly<Ref<boolean>>,
	configurationMatchesSelection: Readonly<Ref<boolean>>,
	selectedOptionsAreValid: Readonly<Ref<boolean>>,
	hasUnsupportedOptions: Readonly<Ref<boolean>>,
	stockIsAvailable: Readonly<Ref<boolean>>,
	productGeneration: Readonly<Ref<number>>,
	isPreviewMode: Readonly<Ref<boolean>>,
	message: Ref<string>,
	translate: (key: string) => string,
	labels: {
		readonly addToCart: string,
		readonly adding: string,
		readonly added: string,
		readonly outOfStock: string,
	},
}

export function useProductPurchase(options: ProductPurchaseOptions) {
	const quantity = ref(1)
	const isAdding = ref(false)
	const wasAdded = ref(false)

	const cartOptions = computed<Record<string, SelectedOptionValue>>(() => Object.fromEntries(
		options.currentOptions.value.flatMap((option) => {
			const value = options.selectedOptions.value[option.optionId]
			if (value === undefined || value === '' || (Array.isArray(value) && value.length === 0)) return []
			const choiceName = (choiceId: string) => (
				option.choices.find(choice => choice.choiceId === choiceId)?.choiceName ?? choiceId
			)
			const displayedValue = typeof value === 'string'
				? choiceName(value)
				: value.map(choiceName)
			return [[option.optionText, displayedValue]]
		}),
	))
	const minimumQuantity = computed(() => positiveNumber(
		options.configuration.value?.inventory.minPurchaseQuantity,
	) ?? 1)
	const maximumQuantity = computed(() => {
		const configuredMaximum = positiveNumber(options.configuration.value?.inventory.maxPurchaseQuantity)
		const stockMaximum = positiveNumber(options.configuration.value?.inventory.quantity)

		if (configuredMaximum && stockMaximum) return Math.min(configuredMaximum, stockMaximum)
		return configuredMaximum ?? stockMaximum
	})
	const hasQuantityLimit = computed(() => minimumQuantity.value > 1 || maximumQuantity.value !== undefined)
	const quantityLimitLabel = computed(() => hasQuantityLimit.value
		? interpolate(options.translate('$label.limit'), {
			min: minimumQuantity.value,
			max: maximumQuantity.value ?? minimumQuantity.value,
		})
		: undefined)
	const isPurchasable = computed(() => Boolean(
		options.product.value
		&& options.configuration.value?.purchaseKind === 'NORMAL'
		&& options.configuration.value.isPurchasable
		&& options.configurationMatchesSelection.value
		&& options.selectedOptionsAreValid.value
		&& options.requiredOptionsAreSelected.value
		&& options.stockIsAvailable.value
		&& !options.hasUnsupportedOptions.value
		&& !options.isConfigurationLoading.value,
	))
	const addToCartLabel = computed(() => {
		if (isAdding.value) return options.labels.adding
		if (wasAdded.value) return options.labels.added
		if (!options.stockIsAvailable.value) return options.labels.outOfStock
		return options.labels.addToCart
	})

	const normalizeQuantity = () => {
		const numericQuantity = Number.isFinite(quantity.value) ? Math.round(quantity.value) : minimumQuantity.value
		quantity.value = Math.max(
			minimumQuantity.value,
			maximumQuantity.value ? Math.min(numericQuantity, maximumQuantity.value) : numericQuantity,
		)
	}

	const addToCart = async () => {
		if (!options.product.value || options.isPreviewMode.value) return
		const productId = options.product.value.id
		const productGeneration = options.productGeneration.value
		options.message.value = ''
		wasAdded.value = false

		if (!options.requiredOptionsAreSelected.value) {
			options.message.value = options.translate('$label.choose_options')
			return
		}
		if (!isPurchasable.value) return

		normalizeQuantity()
		isAdding.value = true
		try {
			await Cart.addProduct({
				id: productId,
				quantity: quantity.value,
				options: cartOptions.value,
			})
			if (
				productGeneration === options.productGeneration.value
				&& options.product.value?.id === productId
			) {
				wasAdded.value = true
			}
		}
		catch {
			if (
				productGeneration === options.productGeneration.value
				&& options.product.value?.id === productId
			) {
				options.message.value = options.translate('$label.add_error')
			}
		}
		finally {
			if (
				productGeneration === options.productGeneration.value
				&& options.product.value?.id === productId
			) {
				isAdding.value = false
			}
		}
	}

	watch(options.product, (nextProduct, previousProduct) => {
		if (nextProduct?.id === previousProduct?.id) return
		isAdding.value = false
		wasAdded.value = false
	}, { immediate: true })
	watch(options.configuration, normalizeQuantity)

	return {
		quantity,
		minimumQuantity,
		maximumQuantity,
		quantityLimitLabel,
		isAdding,
		wasAdded,
		isPurchasable,
		addToCartLabel,
		normalizeQuantity,
		addToCart,
		resetAddedState: () => {
			wasAdded.value = false
		},
	}
}
