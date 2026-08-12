/**
 * Store Header Composables
 *
 * Organized into three categories:
 * - core/     - Base header functionality (design, toggles, translations, viewport)
 * - features/ - Specific feature implementations (categories, customer care, etc.)
 * - ui/       - UI utility composables (scroll lock, positioning)
 */

// Core composables
export {
	useHeaderDesign,
	useHeaderToggles,
	useHeaderTranslations,
	getHeaderTranslatedText,
	useHeaderViewport,
	useHeaderState,
} from './core'
export type { HeaderState } from './core'

// Feature composables
export {
	useCategoryTree,
	useVisibleSubcategories,
	useCustomerCare,
	useLanguageSelector,
	useLocations,
} from './features'
export type { Language } from './features'

// UI composables
export {
	useBodyScrollLock,
	useSubmenuPosition,
} from './ui'

// Re-export shared composables used by header
export { useEscapeKey } from '../../../shared/composables'
