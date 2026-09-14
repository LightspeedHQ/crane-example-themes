import { Favorites, type StorefrontFavoritesState, type StorefrontProduct } from '@lightspeed/ecom-headless'
import { computed, onBeforeUnmount, onMounted, ref, type Ref, watch } from 'vue'

interface ProductFavoritesOptions {
	product: Readonly<Ref<StorefrontProduct | undefined>>,
	productGeneration: Readonly<Ref<number>>,
	isPreviewMode: Readonly<Ref<boolean>>,
	message: Ref<string>,
	translate: (key: string) => string,
}

export function useProductFavorites(options: ProductFavoritesOptions) {
	const favoriteProductIds = ref<readonly number[]>([])
	const isFavoriteBusy = ref(false)
	let stopSubscription: (() => void) | undefined
	let isUnmounted = false

	const isFavorite = computed(() => Boolean(
		options.product.value && favoriteProductIds.value.includes(options.product.value.id),
	))
	const applyFavoritesState = (state: StorefrontFavoritesState) => {
		if (!isUnmounted) favoriteProductIds.value = state.productIds
	}
	const toggleFavorite = async () => {
		if (!options.product.value || isFavoriteBusy.value || options.isPreviewMode.value) return
		const productId = options.product.value.id
		const productGeneration = options.productGeneration.value

		isFavoriteBusy.value = true
		try {
			const state = isFavorite.value
				? await Favorites.remove(productId)
				: await Favorites.add(productId)
			applyFavoritesState(state)
		}
		catch {
			if (
				productGeneration === options.productGeneration.value
				&& options.product.value?.id === productId
			) {
				options.message.value = options.translate('$label.favorite_error')
			}
		}
		finally {
			if (
				productGeneration === options.productGeneration.value
				&& options.product.value?.id === productId
			) {
				isFavoriteBusy.value = false
			}
		}
	}

	watch(options.product, (nextProduct, previousProduct) => {
		if (nextProduct?.id !== previousProduct?.id) isFavoriteBusy.value = false
	}, { immediate: true })

	onMounted(() => {
		void Favorites.subscribe(applyFavoritesState).then((dispose) => {
			if (isUnmounted) dispose()
			else stopSubscription = dispose
		}).catch(() => {
			// The button remains usable and will retry through the mutation itself.
		})
	})

	onBeforeUnmount(() => {
		isUnmounted = true
		stopSubscription?.()
	})

	return {
		isFavorite,
		isFavoriteBusy,
		toggleFavorite,
	}
}
