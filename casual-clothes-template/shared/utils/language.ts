import translations from '../../headers/store-header/settings/translations'

/**
 * Base language codes that have actual translation files
 */
type BaseLanguage = keyof typeof translations;

/**
 * Supported language codes including regional variants
 * Base languages: en, nl, fr, de, it, es (have translation files)
 * Regional variants:
 *   - fr_CA (Canadian French) falls back to fr
 *   - de_CH (Swiss German) falls back to de
 *   - es_419 (Latin American Spanish) falls back to es
 *   - pt_BR (Brazilian Portuguese) — standalone, no base pt
 *
 * Note: Regional variants will fall back to their base language translations
 */
export type SupportedLanguage =
  | BaseLanguage
  | 'fr_CA'
  | 'de_CH'
  | 'es_419'
  | 'pt_BR';

/**
 * Get the default/main language code from site languages
 * @param languages - Array of languages from site content
 * @returns Default language code or undefined
 */
export function getDefaultLanguageCode(languages: Language[] | undefined): string | undefined {
	if (!languages || languages.length === 0) {
		return undefined
	}
	const mainLang = languages.find(lang => lang.main)
	return mainLang?.code
}

/**
 * Check if a language is the store's default/main language
 * @param language - Language code to check
 * @param languages - Array of languages from site content
 * @returns True if the language is the default language
 */
export function isDefaultLanguage(language: string | undefined, languages: Language[] | undefined): boolean {
	if (!language || !languages) {
		return false
	}
	const defaultLang = getDefaultLanguageCode(languages)
	return defaultLang === language
}

/**
 * Get current language from site content (for translations)
 * @param siteContent - The site content object from useVueBaseProps
 * @returns Current language code (e.g., 'en', 'fr', 'nl') or 'en' as default
 */
export function getCurrentLanguageFromSite(siteContent: SiteContent): SupportedLanguage {
	const languages = siteContent?.languages
	if (languages) {
		const selectedLang = languages.find((lang: Language) => lang.selected)
		const langCode = selectedLang?.code || 'en'
		return langCode as SupportedLanguage
	}
	return 'en'
}

/**
 * Make a URL language-aware by preserving the current language prefix
 * @param url - The URL to make language-aware
 * @param language - The current language code
 * @param languages - Optional: Array of languages to detect default language
 * @returns Language-aware URL
 */
export function makeLanguageAwareUrl(url: string, language: SupportedLanguage, languages?: Language[]): string {
	// Skip if not a relative URL
	if (!url.startsWith('/')) {
		return url
	}

	// Skip if it's the default language (no prefix needed)
	if (languages && isDefaultLanguage(language, languages)) {
		return url
	}

	// Check if URL already has a language prefix (either full code or base language)
	// For regional variants like 'pt_BR', check both '/pt_BR/' and '/pt/'
	const hasLanguagePrefix = url.startsWith(`/${language}/`)

	// For regional variants, also check if URL has base language prefix
	const baseLanguage = language.includes('_') ? language.split('_')[0] : null
	const hasBaseLanguagePrefix = baseLanguage && url.startsWith(`/${baseLanguage}/`)

	// If URL already has any language prefix, return as-is
	if (hasLanguagePrefix || hasBaseLanguagePrefix) {
		return url
	}

	// Add language prefix
	return `/${language}${url}`
}

/**
 * Get translation with fallback mechanism
 * Regional variants (e.g., 'fr_CA', 'de_CH', 'es_419', 'pt_BR') fall back to base language (e.g., 'fr', 'de', 'es')
 * Note: pt_BR has no base 'pt' — falls back directly to English
 * @param key - Translation key
 * @param language - Language code (defaults to 'en')
 * @param fallback - Fallback value if translation not found
 * @returns Translated string or fallback
 */
export function getTranslation(
	key: string,
	language: SupportedLanguage = 'en',
	fallback?: string,
): string {
	// Try to get translation for the specified language (if it's a base language)
	if (language in translations) {
		const langTranslations = translations[language as BaseLanguage]
		if (langTranslations && key in langTranslations) {
			return langTranslations[key as keyof typeof langTranslations]
		}
	}

	// For regional variants (e.g., 'de_CH' → 'de', 'fr_CA' → 'fr'), try base language
	if (language.includes('_')) {
		const baseLanguage = language.split('_')[0] as BaseLanguage
		if (baseLanguage in translations) {
			const baseLangTranslations = translations[baseLanguage]
			if (baseLangTranslations && key in baseLangTranslations) {
				return baseLangTranslations[key as keyof typeof baseLangTranslations]
			}
		}
	}

	// Fallback to English if available
	if (language !== 'en' && translations.en && key in translations.en) {
		return translations.en[key as keyof typeof translations.en]
	}

	// Return provided fallback or the key itself
	return fallback || key
}
