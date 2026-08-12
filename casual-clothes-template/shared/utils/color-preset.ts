/**
 * IS color preset → semantic CSS custom property mapping.
 *
 * Each preset maps the abstract semantic vars (--bg-color, --fg-color, etc.)
 * to the concrete brand palette vars (--ewp-color-a … --ewp-color-f) that IS
 * injects at :root via createColorPaletteVars(theme.colorPalette) in GlobalStyles.vue.
 *
 * Safety fallbacks: each var(--ewp-color-X, #HEX) includes a concrete hex tail
 * from configuration.ts colorPalette so the template renders correctly when:
 *   - Crane preview/dev (no IS runtime → no --ewp-color-* on :root)
 *   - Teleported components (outside section root DOM scope)
 *   - Edge cases where IS hasn't injected palette vars yet
 *
 * crane-api 2.5.0: the `preset` field is not yet exposed in section design data.
 * createColorPresetVars(undefined) → PRESET_B (safe default for all sections).
 */

type PresetVarMap = Record<string, string>

/**
 * Palette hex values from configuration.ts globalSettings.colorPalette.
 * Used as safety fallbacks inside var(--ewp-color-X, <fallback>).
 */
const P = {
	a: '#FFFFFF',
	b: '#F0EDE5',
	c: '#FFFFFF',
	d: '#000000',
	e: '#767676',
	f: '#000000',
} as const

const PRESETS: Record<string, PresetVarMap> = {
	PRESET_A: {
		'--bg-color': `var(--ewp-color-a, ${P.a})`,
		'--fg-color': `var(--ewp-color-f, ${P.f})`,
		'--fg-muted-color': `var(--ewp-color-e, ${P.e})`,
		'--fg-accented-color': `var(--ewp-color-d, ${P.d})`,
		'--container-bg-color': `var(--ewp-color-b, ${P.b})`,
		'--container-fg-color': `var(--ewp-color-f, ${P.f})`,
		'--bg-overlay-color': `var(--ewp-color-c, ${P.c})`,
	},
	PRESET_B: {
		'--bg-color': `var(--ewp-color-b, ${P.b})`,
		'--fg-color': `var(--ewp-color-f, ${P.f})`,
		'--fg-muted-color': `var(--ewp-color-e, ${P.e})`,
		'--fg-accented-color': `var(--ewp-color-d, ${P.d})`,
		'--container-bg-color': `var(--ewp-color-a, ${P.a})`,
		'--container-fg-color': `var(--ewp-color-f, ${P.f})`,
		'--bg-overlay-color': `var(--ewp-color-c, ${P.c})`,
	},
	PRESET_C: {
		'--bg-color': `var(--ewp-color-c, ${P.c})`,
		'--fg-color': `var(--ewp-color-f, ${P.f})`,
		'--fg-muted-color': `var(--ewp-color-e, ${P.e})`,
		'--fg-accented-color': `var(--ewp-color-f, ${P.f})`,
		'--container-bg-color': `var(--ewp-color-a, ${P.a})`,
		'--container-fg-color': `var(--ewp-color-f, ${P.f})`,
		'--bg-overlay-color': `var(--ewp-color-c, ${P.c})`,
	},
	PRESET_D: {
		'--bg-color': `var(--ewp-color-d, ${P.d})`,
		'--fg-color': `var(--ewp-color-a, ${P.a})`,
		'--fg-muted-color': `var(--ewp-color-b, ${P.b})`,
		'--fg-accented-color': `var(--ewp-color-a, ${P.a})`,
		'--container-bg-color': `var(--ewp-color-b, ${P.b})`,
		'--container-fg-color': `var(--ewp-color-a, ${P.a})`,
		'--bg-overlay-color': `var(--ewp-color-c, ${P.c})`,
	},
	PRESET_E: {
		'--bg-color': `var(--ewp-color-e, ${P.e})`,
		'--fg-color': `var(--ewp-color-a, ${P.a})`,
		'--fg-muted-color': `var(--ewp-color-b, ${P.b})`,
		'--fg-accented-color': `var(--ewp-color-c, ${P.c})`,
		'--container-bg-color': `var(--ewp-color-f, ${P.f})`,
		'--container-fg-color': `var(--ewp-color-a, ${P.a})`,
		'--bg-overlay-color': `var(--ewp-color-c, ${P.c})`,
	},
	PRESET_F: {
		'--bg-color': `var(--ewp-color-f, ${P.f})`,
		'--fg-color': `var(--ewp-color-a, ${P.a})`,
		'--fg-muted-color': `var(--ewp-color-b, ${P.b})`,
		'--fg-accented-color': `var(--ewp-color-c, ${P.c})`,
		'--container-bg-color': `var(--ewp-color-e, ${P.e})`,
		'--container-fg-color': `var(--ewp-color-a, ${P.a})`,
		'--bg-overlay-color': `var(--ewp-color-c, ${P.c})`,
	},
	PRESET_G: {
		'--bg-color': `var(--ewp-color-a, ${P.a})`,
		'--fg-color': `var(--ewp-color-f, ${P.f})`,
		'--fg-muted-color': `var(--ewp-color-e, ${P.e})`,
		'--fg-accented-color': `var(--ewp-color-f, ${P.f})`,
		'--container-bg-color': `var(--ewp-color-c, ${P.c})`,
		'--container-fg-color': `var(--ewp-color-f, ${P.f})`,
		'--bg-overlay-color': `var(--ewp-color-c, ${P.c})`,
	},
	PRESET_H: {
		'--bg-color': `var(--ewp-color-a, ${P.a})`,
		'--fg-color': `var(--ewp-color-f, ${P.f})`,
		'--fg-muted-color': `var(--ewp-color-e, ${P.e})`,
		'--fg-accented-color': `var(--ewp-color-a, ${P.a})`,
		'--container-bg-color': `var(--ewp-color-d, ${P.d})`,
		'--container-fg-color': `var(--ewp-color-f, ${P.f})`,
		'--bg-overlay-color': `var(--ewp-color-c, ${P.c})`,
	},
	PRESET_I: {
		'--bg-color': `var(--ewp-color-a, ${P.a})`,
		'--fg-color': `var(--ewp-color-d, ${P.d})`,
		'--fg-muted-color': `var(--ewp-color-e, ${P.e})`,
		'--fg-accented-color': `var(--ewp-color-d, ${P.d})`,
		'--container-bg-color': `var(--ewp-color-b, ${P.b})`,
		'--container-fg-color': `var(--ewp-color-d, ${P.d})`,
		'--bg-overlay-color': `var(--ewp-color-c, ${P.c})`,
	},
}

/**
 * Returns CSS custom property definitions for the given IS color preset.
 * The returned object is suitable for spreading into a Vue component's :style binding
 * at the section root element, establishing the three-level color cascade:
 *   L1  --element-color       (merchant concrete override via createTextVars)
 *   L2  --fg-color / --bg-color  (this function → var(--ewp-color-X) at :root from IS)
 *   L3  #000000 / #FFFFFF        (concrete Atelier fallback, no IS storefront)
 *
 * Falls back to PRESET_A when presetId is absent or unrecognised.
 *
 * @example
 * // Section root component
 * const sectionStyle = computed(() => ({
 *   ...Object.fromEntries(createBackgroundVars(...)),
 *   ...createColorPresetVars(rawDesign.value?.preset),
 * }))
 *
 * // Child CSS
 * color: var(--section-title-color, var(--fg-color));
 * background: var(--section-background, var(--bg-color));
 */
export function createColorPresetVars(presetId?: string): Record<string, string> {
	if (!presetId) return PRESETS.PRESET_A
	const key = presetId.toUpperCase().replace(/-/g, '_')
	return PRESETS[key] ?? PRESETS.PRESET_A
}
