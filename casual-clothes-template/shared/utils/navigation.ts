/**
 * Navigation utilities for handling product and category links with language awareness
 */

/**
 * Extracts the product slug from various URL formats
 * Handles full URLs, paths with language prefixes, and query params
 *
 * @param url - Product URL in various formats
 * @returns Product slug or null if extraction fails
 *
 * @example
 * extractProductSlug('https://mystore.com/products/wireless-earbuds') // 'wireless-earbuds'
 * extractProductSlug('/products/wireless-earbuds') // 'wireless-earbuds'
 * extractProductSlug('/fr/products/wireless-earbuds') // 'wireless-earbuds'
 * extractProductSlug('/products/wireless-earbuds?variant=123') // 'wireless-earbuds'
 * extractProductSlug('products/wireless-earbuds') // 'wireless-earbuds'
 * extractProductSlug('wireless-earbuds') // 'wireless-earbuds'
 */
export function extractProductSlug(url: string | undefined): string | null {
	if (!url || typeof url !== 'string') {
		return null
	}

	// Trim whitespace
	const trimmedUrl = url.trim()

	if (!trimmedUrl) {
		return null
	}

	try {
		// Remove query params and hash
		const cleanUrl = trimmedUrl.split('?')[0].split('#')[0]

		// Extract path from full URL or use as-is if it's already a path
		let path = cleanUrl
		if (cleanUrl.startsWith('http://') || cleanUrl.startsWith('https://')) {
			const urlObj = new URL(cleanUrl)
			path = urlObj.pathname
		}

		// Remove leading/trailing slashes
		path = path.replace(/^\/+|\/+$/g, '')

		// Split path into segments
		const segments = path.split('/').filter(segment => segment.length > 0)

		// Find 'products' segment and get the next one
		const productsIndex = segments.findIndex(seg => seg === 'products')

		if (productsIndex !== -1 && segments[productsIndex + 1]) {
			// Format: .../products/slug
			return segments[productsIndex + 1]
		}

		// If no 'products' segment found, check if it's just a slug
		// (single segment without slashes, not a language code)
		if (segments.length === 1) {
			const singleSegment = segments[0]
			// Common language codes to exclude
			const languageCodes = ['en', 'es', 'fr', 'nl', 'de', 'it', 'pt', 'pt_BR', 'de_CH', 'es_419']
			if (!languageCodes.includes(singleSegment)) {
				return singleSegment
			}
		}

		// If we have 'products' as the only segment or last segment, invalid
		if (segments.length === 1 && segments[0] === 'products') {
			return null
		}

		// Couldn't extract slug
		return null
	} catch (error) {
		console.error('Error extracting product slug:', error)
		return null
	}
}

/**
 * Opens a product page with language-aware URL
 * Automatically extracts slug and preserves current language
 *
 * @param productUrl - Product URL (full URL, path, or slug)
 * @param language - Current language code (e.g., 'en', 'fr', 'nl')
 *
 * @example
 * openProductLink('https://mystore.com/products/wireless-earbuds', 'fr')
 * // Navigates to: https://yourstore.com/fr/products/wireless-earbuds
 *
 * openProductLink('/products/wireless-earbuds', 'fr')
 * // Navigates to: https://yourstore.com/fr/products/wireless-earbuds
 *
 * openProductLink('wireless-earbuds', 'fr')
 * // Navigates to: https://yourstore.com/fr/products/wireless-earbuds
 */
export function openProductLink(productUrl: string | undefined, language: string = 'en'): void {
	const slug = extractProductSlug(productUrl)

	if (!slug) {
		console.warn('Could not extract product slug from URL:', productUrl)
		return
	}

	// Detect if current page has a language prefix (if no prefix, we're on default language)
	// eslint-disable-next-line no-restricted-globals -- SSR-safe: guarded by typeof check
	const currentPath = typeof window !== 'undefined' ? window.location.pathname : ''

	const hasCurrentLanguagePrefix = currentPath.split('/').filter(Boolean)[0]?.length <= 5 &&
		currentPath.split('/').filter(Boolean)[0] !== 'products'

	// Build URL with language prefix only if we're not on default language page
	let finalUrl = `/products/${slug}`
	if (hasCurrentLanguagePrefix && language) {
		finalUrl = `/${language}${finalUrl}`
	}

	// SSR guard: only navigate in browser
	// eslint-disable-next-line no-restricted-globals -- SSR-safe: typeof check
	if (typeof window === 'undefined') return

	// eslint-disable-next-line no-restricted-globals -- SSR-safe: guarded above
	window.location.href = `${window.location.origin}${finalUrl}`
}

/**
 * Extracts the category slug from various URL formats
 * Handles full URLs, paths with language prefixes, and query params
 * Supports both standard Ecwid format (/products/Category-Name-c{categoryId})
 * and custom category slugs (/products/custom-slug)
 *
 * @param url - Category URL in various formats
 * @returns Category slug or null if extraction fails
 *
 * @example
 * extractCategorySlug('https://mystore.com/products/Hoodies-&-Sweatshirts-c202471617') // 'Hoodies-&-Sweatshirts-c202471617'
 * extractCategorySlug('/products/Mens-Apparel-c123456') // 'Mens-Apparel-c123456'
 * extractCategorySlug('/fr/products/Womens-Clothing-c789012') // 'Womens-Clothing-c789012'
 * extractCategorySlug('/products/Accessories-c111222?sort=price') // 'Accessories-c111222'
 * extractCategorySlug('/products/new-arrivals') // 'new-arrivals'
 * extractCategorySlug('/products/sales') // 'sales'
 * extractCategorySlug('Hoodies-&-Sweatshirts-c202471617') // 'Hoodies-&-Sweatshirts-c202471617'
 */
export function extractCategorySlug(url: string | undefined): string | null {
	if (!url || typeof url !== 'string') {
		return null
	}

	// Trim whitespace
	const trimmedUrl = url.trim()

	if (!trimmedUrl) {
		return null
	}

	try {
		// Remove query params and hash
		const cleanUrl = trimmedUrl.split('?')[0].split('#')[0]

		// Extract path from full URL or use as-is if it's already a path
		let path = cleanUrl
		if (cleanUrl.startsWith('http://') || cleanUrl.startsWith('https://')) {
			const urlObj = new URL(cleanUrl)
			path = urlObj.pathname
		}

		// Remove leading/trailing slashes
		path = path.replace(/^\/+|\/+$/g, '')

		// Split path into segments
		const segments = path.split('/').filter(segment => segment.length > 0)

		// Find 'products' segment and get the next one
		const productsIndex = segments.findIndex(seg => seg === 'products')

		if (productsIndex !== -1 && segments[productsIndex + 1]) {
			// Format: .../products/category-slug
			// This handles both standard format (with -c{id}) and custom slugs
			return segments[productsIndex + 1]
		}

		// If no 'products' segment found, check if it's just a category slug
		// (single segment - could be standard format with -c{digits} or custom slug)
		if (segments.length === 1) {
			const singleSegment = segments[0]
			// Common language codes to exclude
			const languageCodes = ['en', 'es', 'fr', 'nl', 'de', 'it', 'pt', 'pt_BR', 'de_CH', 'es_419']
			if (!languageCodes.includes(singleSegment)) {
				return singleSegment
			}
		}

		// Couldn't extract category slug
		return null
	} catch (error) {
		console.error('Error extracting category slug:', error)
		return null
	}
}

/**
 * Opens a category page with language-aware URL
 * Automatically extracts slug and preserves current language
 *
 * @param categoryUrl - Category URL (full URL, path, or slug)
 * @param language - Current language code (e.g., 'en', 'fr', 'nl')
 *
 * @example
 * openCategoryLink('https://mystore.com/products/Hoodies-&-Sweatshirts-c202471617', 'nl')
 * // Navigates to: https://yourstore.com/nl/products/Hoodies-&-Sweatshirts-c202471617
 *
 * openCategoryLink('/products/Mens-Apparel-c123456', 'fr')
 * // Navigates to: https://yourstore.com/fr/products/Mens-Apparel-c123456
 *
 * openCategoryLink('Womens-Clothing-c789012', 'en')
 * // Navigates to: https://yourstore.com/products/Womens-Clothing-c789012
 */
export function openCategoryLink(categoryUrl: string | undefined, language: string = 'en'): void {
	const slug = extractCategorySlug(categoryUrl)

	if (!slug) {
		console.warn('Could not extract category slug from URL:', categoryUrl)
		return
	}

	// Detect if current page has a language prefix (if no prefix, we're on default language)
	// eslint-disable-next-line no-restricted-globals -- SSR-safe: guarded by typeof check
	const currentPath = typeof window !== 'undefined' ? window.location.pathname : ''

	const hasCurrentLanguagePrefix = currentPath.split('/').filter(Boolean)[0]?.length <= 5 &&
		currentPath.split('/').filter(Boolean)[0] !== 'products'

	// Build URL with language prefix only if we're not on default language page
	let finalUrl = `/products/${slug}`
	if (hasCurrentLanguagePrefix && language) {
		finalUrl = `/${language}${finalUrl}`
	}

	// SSR guard: only navigate in browser
	// eslint-disable-next-line no-restricted-globals -- SSR-safe: typeof check
	if (typeof window === 'undefined') return

	// eslint-disable-next-line no-restricted-globals -- SSR-safe: guarded above
	window.location.href = `${window.location.origin}${finalUrl}`
}
