import { computed, type ComputedRef, ref, onMounted } from 'vue'
import { searchCategories, type Category as EcwidCategory } from '@lightspeed/ecom-headless'
import { useVueBaseProps } from '@lightspeed/crane'
import { useInitStorefrontApi } from '../../../../shared/init-storefront-api'
import { getCurrentLanguageCode } from '../../../../shared/utils/use-current-language'
import { getDefaultLanguageCode } from '../../../../shared/utils/language'
import type { Category } from '../../types/category'
import { CATEGORY_MENU_LIMIT, SUBMENU_COLUMN_LIMIT } from '../../constants'

type FullCategory = EcwidCategory & { parentId?: number }

/**
 * Add language prefix to URL path if needed
 * @param url - Original URL (e.g., 'https://example.com/products/category-c123')
 * @param language - Language code (e.g., 'de', 'fr')
 * @param defaultLanguage - The store's default language code
 * @returns URL with language prefix (e.g., 'https://example.com/de/products/category-c123')
 */
function addLanguagePrefixToUrl(url: string | undefined, language: string | undefined, defaultLanguage: string | undefined): string | undefined {
	if (!url || !language) {
		return url
	}
	
	// Skip if it's the default language (no prefix needed)
	if (language === defaultLanguage) {
		return url
	}
	
	try {
		const urlObj = new URL(url)
		const path = urlObj.pathname
		
		// Check if language prefix already exists
		if (path.startsWith(`/${language}/`)) {
			return url
		}
		
		// Add language prefix
		urlObj.pathname = `/${language}${path}`
		return urlObj.toString()
	} catch {
		// If URL parsing fails, return original
		return url
	}
}

/**
 * Build nested category tree from flat API response
 * When you request categories with a language parameter (lang: 'de'), the Ecwid API returns:
 * - name: The translated name in the requested language
 * - url: The category URL WITHOUT language prefix - we need to add it
 */
function buildCategoryTree(flatCategories: FullCategory[], language?: string, defaultLanguage?: string): Category[] {
	const categoryMap = new Map<number, Category>()
	const rootCategories: Category[] = []

	// First pass: Create all category objects
	flatCategories.forEach(cat => {
		const urlWithLanguage = addLanguagePrefixToUrl(cat.url, language, defaultLanguage)
		categoryMap.set(cat.id, {
			id: cat.id,
			// When fetched with lang parameter, 'name' is already the translated name
			name: cat.name,
			// Add language prefix to URL (skipped if default language)
			url: urlWithLanguage,
			urlPath: urlWithLanguage,
			children: [],
			hasChildren: false,
		})
	})

	// Second pass: Build parent-child relationships
	flatCategories.forEach(cat => {
		const category = categoryMap.get(cat.id)!
		
		if (cat.parentId) {
			const parent = categoryMap.get(cat.parentId)
			if (parent) {
				parent.children!.push(category)
				parent.hasChildren = true
			} else {
				rootCategories.push(category)
			}
		} else {
			rootCategories.push(category)
		}
	})
	
	return rootCategories
}

/**
 * Composable for fetching and building category tree for header navigation
 * Uses same simple pattern as sections
 */
export function useCategoryTree() {
	const rawCategories = ref<FullCategory[]>([])
	const currentLanguage = ref<string | undefined>(undefined)
	const defaultLanguage = ref<string | undefined>(undefined)
	const isLoading = ref(true)

	/**
	 * Get the category tree from fetched data
	 */
	const categoryTree = computed<Category[]>(() => {
		if (isLoading.value || rawCategories.value.length === 0) {
			return []
		}
		return buildCategoryTree(rawCategories.value, currentLanguage.value, defaultLanguage.value)
	})

	/**
	 * Get level one categories with enhanced data
	 */
	const levelOneCategories = computed<Category[]>(() => {
		return categoryTree.value.map(rawCategory => ({
			...rawCategory,
			hasChildren: rawCategory.children && rawCategory.children.length > 0,
			urlPath: rawCategory.urlPath || rawCategory.url,
		}))
	})

	/**
	 * Get visible level one categories (limited by CATEGORY_MENU_LIMIT)
	 */
	const visibleCategories = computed<Category[]>(() => {
		return levelOneCategories.value.slice(0, CATEGORY_MENU_LIMIT)
	})

	// Fetch categories on mount (simple pattern like sections)
	onMounted(async () => {
		try {
			await useInitStorefrontApi()
			const baseProps = useVueBaseProps()
			
			// Get default language from site data
			defaultLanguage.value = getDefaultLanguageCode(baseProps.site?.value?.languages)
			
			// Get language from baseProps first
			let language = getCurrentLanguageCode(baseProps.site?.value?.languages)
			
			// FALLBACK: If site data isn't loaded yet, parse language from URL
			// Headers load before site data, so we need this fallback
			// eslint-disable-next-line no-restricted-globals -- SSR-safe: guarded by typeof check
			if (!language && typeof window !== 'undefined') {
				// eslint-disable-next-line no-restricted-globals -- SSR-safe: inside typeof guard
				const path = window.location.pathname
				const segments = path.split('/').filter(Boolean)
				// Language codes are typically 2-5 characters (en, de, pt_BR, etc.)
				const possibleLang = segments[0]
				if (possibleLang && possibleLang.length <= 5 && possibleLang !== 'products') {
					language = possibleLang
				}
			}
			
			// Store language for use in computed
			currentLanguage.value = language
			
			const response = await searchCategories({ lang: language })
			rawCategories.value = (response.items || []) as FullCategory[]
		} catch (error) {
			console.error('[Header] Error fetching categories:', error)
		} finally {
			isLoading.value = false
		}
	})

	return {
		categoryTree,
		levelOneCategories,
		visibleCategories,
	}
}

/**
 * Composable for getting visible subcategories from a category
 */
export function useVisibleSubcategories(
	category: ComputedRef<Category | null> | { value: Category | null },
): ComputedRef<Category[]> {
	return computed<Category[]>(() => {
		const cat = 'value' in category ? category.value : category
		if (!cat?.children) {
			return []
		}
		return cat.children.slice(0, SUBMENU_COLUMN_LIMIT)
	})
}
