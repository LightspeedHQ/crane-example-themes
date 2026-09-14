import {
	Products,
	type StorefrontProduct,
	type StorefrontProductConfiguration,
} from '@lightspeed/ecom-headless'
import { computed, onBeforeUnmount, ref, shallowRef, type Ref } from 'vue'

import type { SelectedOptionValue } from '../product-details-types.ts'
import {
	cloneSelectedOptions,
	isChoiceDisabled,
	isValidDate,
	selectedOptionsAreEqual,
} from '../product-details-utils.ts'

interface ProductConfigurationOptions {
	product: Readonly<Ref<StorefrontProduct | undefined>>,
	onError: (message: string) => void,
	translate: (key: string) => string,
}

export function useProductConfiguration(options: ProductConfigurationOptions) {
	const configuration = shallowRef<StorefrontProductConfiguration>()
	const selectedOptions = ref<Record<string, SelectedOptionValue>>({})
	const isConfigurationLoading = ref(false)
	let activeRequest = 0

	const currentOptions = computed(() => configuration.value?.options ?? options.product.value?.options ?? [])
	const requiredOptionsAreSelected = computed(() => configuration.value?.isSelectionComplete ?? false)
	const configurationMatchesSelection = computed(() => selectedOptionsAreEqual(
		selectedOptions.value,
		configuration.value?.selectedOptions ?? {},
	))
	const selectedOptionsAreValid = computed(() => currentOptions.value.every((option) => {
		const value = selectedOptions.value[option.optionId]
		const values = Array.isArray(value) ? value : value ? [value] : []
		if (values.length === 0) return !option.required

		if (option.choices.length > 0) {
			return values.every(selectedValue => option.choices.some(
				choice => choice.choiceId === selectedValue && !isChoiceDisabled(choice),
			))
		}

		const text = values[0] ?? ''
		if (option.maxLength !== undefined && text.length > option.maxLength) return false
		if (option.type === 'EMAIL') return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(text)
		if (option.type === 'DATE') return isValidDate(text)
		return true
	}))
	// See the layout README for the Headless Storefront API gaps behind these purchase guards.
	const hasUnsupportedOptions = computed(() => currentOptions.value.some(
		option => option.type === 'FILES',
	))
	const stockIsAvailable = computed(() => {
		const inventory = configuration.value?.inventory
		return Boolean(inventory && (!inventory.isSoldOut || inventory.isPreorderAllowed))
	})

	const reset = (product: StorefrontProduct | undefined) => {
		activeRequest += 1
		isConfigurationLoading.value = false
		configuration.value = product?.defaultConfiguration
		selectedOptions.value = cloneSelectedOptions(product?.defaultConfiguration.selectedOptions ?? {})
	}

	const updateSelectedOptions = async (nextSelectedOptions: Record<string, SelectedOptionValue>) => {
		selectedOptions.value = nextSelectedOptions
		const currentProduct = options.product.value
		if (!currentProduct || selectedOptionsAreEqual(
			nextSelectedOptions,
			configuration.value?.selectedOptions ?? {},
		)) return

		const request = ++activeRequest
		isConfigurationLoading.value = true
		try {
			const nextConfiguration = await Products.resolveConfiguration({
				productId: currentProduct.id,
				selectedOptions: cloneSelectedOptions(nextSelectedOptions),
			})
			if (request === activeRequest && options.product.value?.id === currentProduct.id) {
				configuration.value = nextConfiguration
			}
		}
		catch {
			if (request === activeRequest) options.onError(options.translate('$label.configuration_error'))
		}
		finally {
			if (request === activeRequest) isConfigurationLoading.value = false
		}
	}

	onBeforeUnmount(() => {
		activeRequest += 1
	})

	return {
		configuration,
		selectedOptions,
		isConfigurationLoading,
		currentOptions,
		requiredOptionsAreSelected,
		configurationMatchesSelection,
		selectedOptionsAreValid,
		hasUnsupportedOptions,
		stockIsAvailable,
		reset,
		updateSelectedOptions,
	}
}
