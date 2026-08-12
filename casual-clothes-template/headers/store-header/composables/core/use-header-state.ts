import { ref, computed, type Ref, type ComputedRef } from 'vue'
import type { Category } from '../../types'

/**
 * Header State Interface
 * Centralized state management for all header overlays and menus
 */
export interface HeaderState {
	// Overlay states (readonly for consumers)
	readonly isCatalogOpen: Ref<boolean>
	readonly selectedCategory: Ref<Category | null>
	readonly isFindStoreOpen: Ref<boolean>
	readonly isCustomerCareOpen: Ref<boolean>
	readonly isSearchOverlayOpen: Ref<boolean>
	readonly isMobileSiteMenuOpen: Ref<boolean>
	readonly isMobileCatalogOverlayOpen: Ref<boolean>

	// Computed helpers
	readonly hasAnyOverlayOpen: ComputedRef<boolean>

	// Catalog actions
	openCatalog: (category: Category) => void
	closeCatalog: () => void
	closeAllCatalogs: () => void

	// Find Store actions
	toggleFindStore: () => void
	closeFindStore: () => void
	closeAllFindStore: () => void

	// Customer Care actions
	toggleCustomerCare: () => void
	closeCustomerCare: () => void
	closeAllCustomerCare: () => void

	// Search Overlay actions
	toggleSearchOverlay: () => void
	openSearchOverlay: () => void
	closeSearchOverlay: () => void

	// Mobile Site Menu actions
	toggleMobileSiteMenu: () => void
	closeMobileSiteMenu: () => void

	// Mobile Catalog Overlay actions
	toggleMobileCatalogOverlay: () => void
	closeMobileCatalogOverlay: () => void

	// Global actions
	closeAllOverlays: () => void
}

// ============================================================================
// Singleton State - created once at module level
// ============================================================================

// Overlay states
const isCatalogOpen = ref(false)
const selectedCategory = ref<Category | null>(null)
const isFindStoreOpen = ref(false)
const isCustomerCareOpen = ref(false)
const isSearchOverlayOpen = ref(false)
const isMobileSiteMenuOpen = ref(false)
const isMobileCatalogOverlayOpen = ref(false)

// Computed helpers
const hasAnyOverlayOpen = computed(() =>
	isCatalogOpen.value ||
	isFindStoreOpen.value ||
	isCustomerCareOpen.value ||
	isSearchOverlayOpen.value ||
	isMobileSiteMenuOpen.value ||
	isMobileCatalogOverlayOpen.value,
)

// Helper to close all main overlays (not mobile menu/catalog)
const closeMainOverlays = () => {
	isCatalogOpen.value = false
	selectedCategory.value = null
	isFindStoreOpen.value = false
	isCustomerCareOpen.value = false
	isSearchOverlayOpen.value = false
}

// Catalog actions
const openCatalog = (category: Category) => {
	// Toggle: if opening the same category, close it
	if (isCatalogOpen.value && selectedCategory.value?.id === category.id) {
		closeCatalog()
	} else {
		// Close other overlays first (only one overlay open at a time)
		isFindStoreOpen.value = false
		isCustomerCareOpen.value = false
		// Open catalog
		selectedCategory.value = category
		isCatalogOpen.value = true
	}
}

const closeCatalog = () => {
	isCatalogOpen.value = false
	selectedCategory.value = null
}

const closeAllCatalogs = () => {
	closeCatalog()
	closeMobileCatalogOverlay()
}

// Find Store actions
const toggleFindStore = () => {
	if (isFindStoreOpen.value) {
		closeFindStore()
	} else {
		closeMainOverlays()
		isFindStoreOpen.value = true
	}
}

const closeFindStore = () => {
	isFindStoreOpen.value = false
}

const closeAllFindStore = () => {
	closeFindStore()
	closeMobileSiteMenu()
}

// Customer Care actions
const toggleCustomerCare = () => {
	if (isCustomerCareOpen.value) {
		closeCustomerCare()
	} else {
		closeMainOverlays()
		isCustomerCareOpen.value = true
	}
}

const closeCustomerCare = () => {
	isCustomerCareOpen.value = false
}

const closeAllCustomerCare = () => {
	closeCustomerCare()
	closeMobileSiteMenu()
}

// Search Overlay actions
const openSearchOverlay = () => {
	closeMainOverlays()
	isMobileCatalogOverlayOpen.value = false
	isSearchOverlayOpen.value = true
}

const closeSearchOverlay = () => {
	isSearchOverlayOpen.value = false
}

const toggleSearchOverlay = () => {
	if (isSearchOverlayOpen.value) {
		closeSearchOverlay()
	} else {
		openSearchOverlay()
	}
}

// Mobile Site Menu actions
const toggleMobileSiteMenu = () => {
	isMobileSiteMenuOpen.value = !isMobileSiteMenuOpen.value
}

const closeMobileSiteMenu = () => {
	isMobileSiteMenuOpen.value = false
}

// Mobile Catalog Overlay actions
const toggleMobileCatalogOverlay = () => {
	if (isMobileCatalogOverlayOpen.value) {
		isMobileCatalogOverlayOpen.value = false
	} else {
		isSearchOverlayOpen.value = false
		isMobileCatalogOverlayOpen.value = true
	}
}

const closeMobileCatalogOverlay = () => {
	isMobileCatalogOverlayOpen.value = false
}

// Global actions
const closeAllOverlays = () => {
	closeMainOverlays()
	closeSearchOverlay()
	closeMobileSiteMenu()
	closeMobileCatalogOverlay()
}

// ============================================================================
// Composable Export
// ============================================================================

/**
 * Returns the centralized header state
 * Uses singleton pattern - same state instance is shared across all components
 */
export function useHeaderState(): HeaderState {
	return {
		// States
		isCatalogOpen,
		selectedCategory,
		isFindStoreOpen,
		isCustomerCareOpen,
		isSearchOverlayOpen,
		isMobileSiteMenuOpen,
		isMobileCatalogOverlayOpen,
		hasAnyOverlayOpen,

		// Actions
		openCatalog,
		closeCatalog,
		closeAllCatalogs,
		toggleFindStore,
		closeFindStore,
		closeAllFindStore,
		toggleCustomerCare,
		closeCustomerCare,
		closeAllCustomerCare,
		toggleSearchOverlay,
		openSearchOverlay,
		closeSearchOverlay,
		toggleMobileSiteMenu,
		closeMobileSiteMenu,
		toggleMobileCatalogOverlay,
		closeMobileCatalogOverlay,
		closeAllOverlays,
	}
}
