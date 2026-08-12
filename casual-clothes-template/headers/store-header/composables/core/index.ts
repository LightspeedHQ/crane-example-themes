/**
 * Core Header Composables
 *
 * Base composables for header functionality:
 * - Design settings (colors, fonts)
 * - Feature toggles
 * - Translations
 * - Viewport detection
 * - Centralized state management
 */

export { useHeaderDesign } from './use-header-design'
export { useHeaderToggles } from './use-header-toggles'
export { useHeaderTranslations, getHeaderTranslatedText } from './use-header-translations'
export { useHeaderViewport } from './use-header-viewport'
export { useHeaderState } from './use-header-state'
export type { HeaderState } from './use-header-state'
