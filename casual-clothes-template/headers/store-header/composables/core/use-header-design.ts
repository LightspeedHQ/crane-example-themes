import { computed } from 'vue'
import { useBackgroundElementDesign, useTextElementDesign, useVueBaseProps } from '@lightspeed/crane'
import { Design } from '../../type'
import { createTextVars, createBackgroundVars, resolveColor, isConcreteColorField } from '../../../../shared/utils/design-vars'
import { useColorPresetVars } from '../../../../shared/composables/design'

/**
 * Composable for header design settings.
 *
 * Returns:
 * - `headerVars` — CSS custom property map for CustomHeader's cascade.
 *   Includes IS color preset semantic vars (--fg-color, --bg-color, etc.)
 *   injected first so the header CSS fallback chain can reach them.
 * - `headerBackgroundColor` / `headerTextColor` — color refs used by teleported
 *   overlay containers that apply colors as inline styles (FullScreenOverlay,
 *   CatalogSubmenu, SearchOverlay, mobile overlays, etc.).
 *   When the raw design color is a global.* token (absent or default), returns a
 *   CSS var reference ('var(--bg-color)' / 'var(--fg-color)')
 *   so overlays stay reactive to Global Brand Settings. Works because all overlay
 *   containers are DOM descendants of .custom-header where the preset vars are
 *   defined via headerVars.
 */
export function useHeaderDesign() {
	const { design: rawDesign } = useVueBaseProps<unknown, Design>()
	const menuBackground = useBackgroundElementDesign<Design>('HeaderBackground') as BackgroundDesignData
	const menuText = useTextElementDesign<Design>('HeaderText') as TextDesignData

	const colorPresetVars = useColorPresetVars(rawDesign)

	// CSS vars for the .custom-header root.
	// colorPresetVars spread first so --bg-color / --fg-color etc. are available
	// as fallbacks for --header-background / --header-color in CustomHeader.vue CSS.
	// createBackgroundVars internally gates on rawDesign.background.solid.color presence —
	// global token default (rawDesign = { overlay: {} }) produces no --header-background,
	// letting the CSS cascade fall through to var(--bg-color).
	const headerVars = computed(() => Object.fromEntries([
		...Object.entries(colorPresetVars.value),
		...createBackgroundVars('header', menuBackground, rawDesign?.value?.HeaderBackground),
		...createTextVars('header', menuText, rawDesign?.value?.HeaderText),
	]))

	// Concrete-or-semantic color for overlay containers.
	// When HeaderBackground has no explicit color in rawDesign (default: global token)
	// → return CSS var so the overlay inherits from the IS preset cascade.
	// When a merchant sets a concrete color override → return that hex directly.
	const headerBackgroundColor = computed((): string => {
		const rawBg = rawDesign?.value?.HeaderBackground as unknown as Record<string, unknown> | undefined
		const rawSolidColor = (rawBg?.background as Record<string, unknown> | undefined)
			?.solid as Record<string, unknown> | undefined
		if (!rawSolidColor?.color) {
			return 'var(--bg-color)'
		}
		if (!menuBackground?.background) return 'var(--bg-color)'
		const { background } = menuBackground
		if (background.type === 'solid' && background.solid?.color) {
			return resolveColor(background.solid.color) ?? 'var(--bg-color)'
		}
		if (background.type === 'gradient' && background.gradient) {
			const from = resolveColor(background.gradient.fromColor)
			const to = resolveColor(background.gradient.toColor)
			return from && to ? `linear-gradient(to right, ${from}, ${to})` : 'var(--bg-color)'
		}
		return 'var(--bg-color)'
	})

	// Same pattern for text color — used via v-bind() in ~20 components.
	// When HeaderText.color is a global.* token (or absent) → CSS var reference
	// so all components using v-bind(headerTextColor) pick up --fg-color from the
	// IS preset. When merchant has a concrete color override → pinned hex.
	const headerTextColor = computed(() => {
		if (!isConcreteColorField(rawDesign.value?.HeaderText, 'color')) {
			return 'var(--fg-color)'
		}
		return resolveColor(menuText?.color) ?? 'var(--fg-color)'
	})

	return {
		headerVars,
		headerBackgroundColor,
		headerTextColor,
		/** Preset vars for teleported components that live outside .custom-header DOM */
		headerPresetVars: colorPresetVars,
	}
}
