/**
 * Layout and Display Limits
 * 
 * These control the number of categories/subcategories displayed in navigation menus.
 * Currently hardcoded - not yet configurable via Crane UI (requires NUMBER setting type).
 * 
 * To modify: Change values here. All components import from this file.
 * Future: When Crane supports NUMBER settings, these can become user-configurable.
 */

/**
 * Maximum number of categories to display in the main navigation menu
 * @default 6
 * @recommended 4-8 (optimal for desktop navigation without overwhelming users)
 */
export const CATEGORY_MENU_LIMIT = 6

/**
 * Maximum number of subcategory columns to display in the catalog submenu
 * @default 4
 * @recommended 3-6 (maintains readability and fits most screen sizes)
 */
export const SUBMENU_COLUMN_LIMIT = 4

/**
 * Breakpoints
 */
// This is the breakpoint for the mobile store header
// Had to change from 768 to 992 to accommodate the full header.
export const MOBILE_STORE_HEADER_BREAKPOINT = 992
// This is the maximum width for the mobile store header
export const MOBILE_MAX_WIDTH = 768

/**
 * Z-Index Layers
 * Note: FullScreenOverlay uses 9999, so we need to be higher
 */
export const Z_INDEX_CATALOG_OVERLAY = 10000
export const Z_INDEX_CATALOG_CONTENT = 10001

/**
 * Layout Positions
 */
// Height of each header row: KeyInfoBar, HeaderTopRow, HeaderBottomRow
// Must stay in sync with the height/min-height in HeaderTopRow.vue, HeaderBottomRow.vue,
// and the padding-derived height of KeyInfoBar.vue (padding: 8px top + ~24px line-height + 8px bottom = 40px).
// Mirrored as $HEADER_ROW_HEIGHT in _constants.scss.
export const HEADER_ROW_HEIGHT = 40
// Distance from top of viewport to the catalog submenu.
// Formula: KeyInfoBar + HeaderTopRow + HeaderBottomRow - 2px borders = 118px
export const CATALOG_SUBMENU_TOP_OFFSET = HEADER_ROW_HEIGHT * 3 - 2
