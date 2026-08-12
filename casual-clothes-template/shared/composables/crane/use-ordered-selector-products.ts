/**
 * useOrderedSelectorProducts
 *
 * Reorders the products returned by `useProductSelectorElementContent` to match the
 * order the merchant chose in the editor (drag-and-drop).
 *
 * Why this is needed: `useProductSelectorElementContent` builds its `products` list by
 * filtering the storefront's products by id, so the result comes back in *catalog* order
 * and the editor's drag-and-drop order is lost. The chosen order is preserved separately
 * in the raw content as `products.productIds`; we read that and re-sort to match.
 *
 * Falls back to the composable's original order when `productIds` is unavailable
 * (e.g. `ALL`/`CATEGORY` selection, or no manual selection yet).
 *
 * @example
 * ```ts
 * const selector = useProductSelectorElementContent<Content>('featured_products')
 * const products = useOrderedSelectorProducts(selector, 'featured_products')
 * // render `products.value` instead of `selector.products`
 * ```
 *
 * @param selectorContent - the reactive object returned by `useProductSelectorElementContent`
 * @param elementName - the PRODUCT_SELECTOR element name (the same string passed to the composable)
 * @returns a `ComputedRef` of the products in the merchant's chosen order
 */
import { computed, type ComputedRef } from 'vue'
import { useVueBaseProps } from '@lightspeed/crane'

export function useOrderedSelectorProducts(
	selectorContent: { products: ProductListComponentItem[] },
	elementName: string,
): ComputedRef<ProductListComponentItem[]> {
	const baseProps = useVueBaseProps()

	const selectedProductIds = computed<number[]>(() => {
		const selector = (baseProps.content?.value as Record<string, unknown> | undefined)
			?.[elementName] as ProductSelectorData | undefined
		if (selector?.products?.productIds?.length) return selector.products.productIds
		if (typeof selector?.product?.id === 'number') return [selector.product.id]
		return []
	})

	return computed<ProductListComponentItem[]>(() => {
		const items = selectorContent.products
		const ids = selectedProductIds.value
		if (!ids.length) return items
		const byId = new Map(items.map((p) => [p.id, p]))
		const ordered = ids
			.map((id) => byId.get(id))
			.filter((p): p is ProductListComponentItem => p !== undefined)
		return ordered.length ? ordered : items
	})
}
