import { computed, ref, watch, type ComputedRef, type Ref } from 'vue'
import { createColorPresetVars } from '../../utils/color-preset'

/**
 * Returns per-section CSS color preset vars as a computed ref.
 *
 * Spread the result into the section root element's :style to establish the
 * three-level color cascade for all child components:
 *   L1  --element-color          merchant concrete override (createTextVars)
 *   L2  --fg-color / --bg-color  preset → var(--ewp-color-X) injected by IS at :root
 *   (L3 concrete fallbacks removed — semantic vars have no hex tail)
 *
 * Uses watch + lastKnownPreset ref instead of a plain computed so that IS
 * partial design updates (where `preset` is absent) don't reset the active
 * preset back to PRESET_A — the last known value is preserved.
 *
 * @param rawDesign - Raw section design ref (extracts .preset from its value)
 *
 * @example
 * const colorPresetVars = useColorPresetVars(rawDesign)
 *
 * const sectionStyle = computed(() => ({
 *   ...Object.fromEntries(createBackgroundVars(...)),
 *   ...colorPresetVars.value,
 * }))
 *
 * // Template:
 * <section :style="sectionStyle">
 */
export function useColorPresetVars(rawDesign?: Ref<unknown>): ComputedRef<Record<string, string>> {
	const lastKnownPreset = ref<string | undefined>(undefined)

	if (rawDesign) {
		watch(rawDesign, (design) => {
			const preset = (design as Record<string, unknown>)?.preset as string | undefined
			if (preset !== undefined) {
				lastKnownPreset.value = preset
			}
		}, { immediate: true })
	}

	return computed(() => createColorPresetVars(lastKnownPreset.value))
}
