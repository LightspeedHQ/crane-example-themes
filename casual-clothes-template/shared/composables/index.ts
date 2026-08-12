/**
 * Shared Composables
 *
 * Re-export all shared composables for convenient imports.
 * These composables are generic and can be used across multiple components.

 * Organized by category:
 * - ui/      - UI interactions and state management
 * - crane/   - Crane SDK integration
 * - design/  - CSS styles from Crane design data
 *
 * Note: Design styles are handled by shared/utils/design-vars.ts (CSS custom properties).
 */

// Design - CSS styles from Crane design data
export { useBackgroundStyle, getBackgroundValue } from './design'

// UI - UI interactions and state management
export { useCarousel, useClickOutside, useEscapeKey } from './ui'

// Crane - Crane SDK integration
export {
	useMappedDeckCards,
	field,
	createFieldConfig,
	usePreviewMode,
	useTranslations,
	useOrderedSelectorProducts,
	type TranslationDictionary,
} from './crane'
