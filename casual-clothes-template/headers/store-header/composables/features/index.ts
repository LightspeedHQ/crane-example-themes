/**
 * Feature Composables
 *
 * Composables for specific header features:
 * - Category navigation
 * - Customer care
 * - Language selector
 * - Store locations
 */

export { useCategoryTree, useVisibleSubcategories } from './use-category-data'
export { useCustomerCare } from './use-customer-care'
export { useLanguageSelector } from './use-language-selector'
export type { Language } from './use-language-selector'
export { useLocations } from './use-locations'
