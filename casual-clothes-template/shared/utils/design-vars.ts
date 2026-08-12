import { getColorHex, calculateTextColor } from './colors'

/**
 * A CSS custom property entry: [variable name, value]
 */
export type CssVar = [string, string]

/**
 * Returns undefined for global.* token strings and empty/undefined values.
 * Passes concrete string values through as-is.
 *
 * @example
 * resolveToken('global.fontFamily.title') // undefined → CSS cascade handles it
 * resolveToken('inter')                   // 'inter'
 * resolveToken(undefined)                 // undefined
 */
export function resolveToken(value: string | undefined): string | undefined {
	if (!value || value.startsWith('global.')) return undefined
	return value
}

/**
 * Resolves a Crane Color value to a hex string.
 * Returns undefined for global.* tokens and missing values.
 * Accepts both the Color class object AND string/plain-object values, since Crane
 * may pass global-token references as `{ hex: 'global.color.title' }` at runtime.
 */
export function resolveColor(color: Color | { hex: string } | string | undefined): string | undefined {
	if (!color) return undefined
	if (typeof color === 'string') {
		return color.startsWith('global.') ? undefined : color
	}
	if (typeof color === 'object' && 'hex' in color) {
		const hex = (color as { hex: string }).hex
		return hex.startsWith('global.') ? undefined : hex
	}
	return undefined
}

/**
 * Converts a numeric size to a px string.
 * Returns undefined for undefined values.
 * Handles string fallback safely (e.g. if global token was not resolved).
 */
export function resolveTokenSize(value: number | string | undefined): string | undefined {
	if (value === undefined || value === null) return undefined
	if (typeof value === 'number') return `${value}px`
	if (typeof value === 'string' && value.startsWith('global.')) return undefined
	return value
}

/**
 * Returns true when the value is a Crane global.* design token string.
 * Used to decide whether to skip emitting a section-level CSS var and let
 * the CSS cascade fall through to the corresponding brand/global variable.
 */
function isGlobalToken(value: unknown): boolean {
	return typeof value === 'string' && value.startsWith('global.')
}

/**
 * Returns true only when rawDesign contains an explicit, concrete (non-global-token)
 * value for the given key. Both absent rawDesign and global.* token values mean
 * "let the CSS cascade handle it" — so both produce false.
 *
 * This is the correct gate for font-family: the absence of a rawDesign field means
 * "no user override, use defaults", and the section defaults are always global.* tokens.
 * Without this guard, useTextElementDesign would resolve the token to a concrete font name
 * (e.g. 'Inter') and emit --foo-font-family: Inter, pinning the font and breaking
 * reactivity with Global Brand Settings changes.
 */
function isConcreteOverride(rawDesign: unknown, key: string): boolean {
	const field = getRawField(rawDesign, key)
	return field !== undefined && !isGlobalToken(field)
}

/**
 * Returns true only when rawDesign contains an explicit, concrete (non-global-token)
 * color value for the given key. Handles both formats that Crane/IS may use in raw store JSON:
 *
 *   'global.color.button'          → false  (string global token)
 *   { hex: 'global.color.button' } → false  (object with global token as hex)
 *   '#191919ff'                    → true   (concrete string)
 *   { hex: '#191919ff' }           → true   (concrete object)
 *   undefined                      → false  (absent — cascade handles it)
 *
 * Unlike isConcreteOverride, which only checks string tokens via isGlobalToken,
 * this helper also inspects the { hex } object format to correctly detect global
 * token references stored as objects in the raw design.
 */
export function isConcreteColorField(rawDesign: unknown, key: string): boolean {
	const field = getRawField(rawDesign, key)
	if (field === undefined) return false
	if (typeof field === 'string') return !field.startsWith('global.')
	if (typeof field === 'object' && field !== null && 'hex' in field) {
		const hex = (field as { hex: unknown }).hex
		if (typeof hex === 'string') return !hex.startsWith('global.')
	}
	return true // unknown format → treat as concrete (safe fallback)
}

/**
 * Safely reads a named field from an unknown raw design object.
 * Returns undefined for non-objects (e.g. when InferDesignType resolves a field as string).
 */
function getRawField(rawDesign: unknown, key: string): unknown {
	if (!rawDesign || typeof rawDesign !== 'object' || Array.isArray(rawDesign)) return undefined
	return (rawDesign as Record<string, unknown>)[key]
}

/**
 * Generates CSS custom property entries for a text element.
 * Only entries with concrete resolved values are included —
 * global.* tokens produce no entry so the CSS cascade falls back
 * to the corresponding brand/global variable injected by the Ecwid storefront.
 *
 * IMPORTANT: This utility does NOT handle the `visible` flag.
 * Every consumer component MUST add a visibility check to the rendered element:
 *   v-show="<elementName>Design?.visible !== false"
 * Omitting this check means the "Show Element" toggle in the editor will have no effect.
 *
 * @param name      - CSS variable name prefix (e.g. 'hero-title' → --hero-title-font-family)
 * @param design    - TextDesignData from useTextElementDesign (resolved — global.* already replaced)
 * @param rawDesign - Optional raw design object from useVueBaseProps().design.value[elementName].
 *                    When provided, fields that were originally global.* tokens in the store JSON
 *                    are detected here and suppressed so the CSS cascade can reach
 *                    --heading-font-family / --body-font-family from Global Brand Settings.
 *
 * @example
 * const { design } = useVueBaseProps<unknown, Design>()
 * const titleDesign = useTextElementDesign<Design>('section_title')
 *
 * createTextVars('story-title', titleDesign.value, design.value?.section_title as Record<string, unknown>)
 * // → [] when section_title.font = "global.fontFamily.title" (cascade handles it)
 * // → [['--story-title-font-family', 'Georgia']] when explicitly overridden
 *
 * // In CSS:
 * .title {
 *   font-family: var(--story-title-font-family,
 *                  var(--heading-font-family,
 *                    var(--global-title-font-family-stack)));
 * }
 */
export function createTextVars(
	name: string,
	design: TextDesignData | undefined,
	rawDesign?: unknown,
): CssVar[] {
	const entries: Array<[string, string | undefined]> = [
		[`--${name}-font-family`, isConcreteOverride(rawDesign, 'font') ? resolveToken(design?.font) : undefined],
		[`--${name}-color`,       isConcreteOverride(rawDesign, 'color') ? resolveColor(design?.color) : undefined],
		// Font size: suppress when the raw value is absent or a global.* token,
		// so the CSS cascade can reach --heading-1-font-size / --body-3-font-size
		// injected by the IS storefront from currentTheme.settings.fonts.general.
		// Mirrors the font-family gate above — same isConcreteOverride logic.
		[`--${name}-font-size`,   isConcreteOverride(rawDesign, 'size') ? resolveTokenSize(design?.size) : undefined],
		// Font weight: emit concrete value only when the merchant has explicitly overridden bold.
		// When rawDesign has no concrete bold override → omit → CSS cascade reaches
		// --heading-font-weight / --body-font-weight from Global Brand Settings.
		// Mirrors the font-family gate above — same isConcreteOverride pattern.
		// Note: for boolean fields isConcreteOverride reduces to getRawField !== undefined,
		// since isGlobalToken is always false for non-string values.
		[`--${name}-font-weight`, isConcreteOverride(rawDesign, 'bold') ? (design?.bold ? '700' : '400') : undefined],
		[`--${name}-font-style`,  design?.italic ? 'italic' : undefined],
	]
	return entries.filter((entry): entry is CssVar => entry[1] !== undefined)
}

/**
 * Generates CSS custom property entries for a button element.
 * Handles color/appearance, size (font-size + padding), shape (border-radius),
 * and border-width. Always emits size/shape/border vars so the CSS cascade has
 * concrete values even when design.color is a global token.
 * Returns an empty array if no design — handle visibility via v-show in the
 * component instead.
 *
 * @param name      - CSS variable name prefix (e.g. 'cta' → --cta-bg-color)
 * @param design    - ButtonDesignData from useButtonElementDesign (resolved)
 * @param rawDesign - Optional raw design from useVueBaseProps().design.value[elementName].
 *                    When provided, suppresses --{name}-font-family when the original
 *                    font value was a global.* token, so the CSS cascade can reach
 *                    --body-font-family from Global Brand Settings.
 *                    Also suppresses color vars (--{name}-bg-color etc.) for solid buttons
 *                    when the original color was a global.* token, so the CSS cascade
 *                    falls through to var(--fg-accented-color) / var(--bg-color).
 */
export function createButtonVars(
	name: string,
	design: Partial<ButtonDesignData> | undefined,
	rawDesign?: unknown,
): CssVar[] {
	if (!design) return []

	const entries: Array<[string, string | undefined]> = []

	const appearance = (design.appearance as string | undefined)?.toLowerCase()
	const sizeValue = (design.size as string | undefined)?.toLowerCase()
	const styleValue = (design.style as string | undefined)?.toLowerCase()

	// Font family — skip when the original value was absent or a global.* token
	const fontFamily = isConcreteOverride(rawDesign, 'font') ? resolveToken(design.font) : undefined
	if (fontFamily) entries.push([`--${name}-font-family`, fontFamily])

	// Color / appearance
	// Gate concrete color emission on rawDesign: if the original value was a global.* token
	// (e.g. 'global.color.button'), IS resolves it to a concrete hex before calling this
	// function, but we must NOT pin that resolved hex as an inline CSS var — the CSS cascade
	// must be free to reach var(--fg-accented-color) from the IS preset layer.
	const isConcreteColor = isConcreteColorField(rawDesign, 'color')
	const color = isConcreteColor ? resolveColor(design.color) : undefined

	if (appearance === 'outline-button') {
		// bg is appearance-based — always transparent regardless of color token
		entries.push([`--${name}-bg-color`, 'transparent'])
		// text/border: concrete color when explicitly overridden; otherwise fall back to
		// the preset semantic var so the cascade remains live (not pinned to --bg-color)
		entries.push([`--${name}-text-color`, color ?? 'var(--fg-accented-color)'])
		entries.push([`--${name}-border-color`, color ?? 'var(--fg-accented-color)'])
	}
	else if (appearance === 'text-link') {
		// bg and border are appearance-based — always transparent
		entries.push([`--${name}-bg-color`, 'transparent'])
		entries.push([`--${name}-border-color`, 'transparent'])
		// text: concrete color or fall back to preset semantic var
		entries.push([`--${name}-text-color`, color ?? 'var(--fg-accented-color)'])
	}
	else {
		// solid (default): only emit when there is a concrete color override.
		// Without a concrete override, CSS fallbacks reach:
		//   background  → var(--fg-accented-color)
		//   color       → var(--bg-color)
		//   border-color → var(--fg-accented-color)
		if (color) {
			entries.push(
				[`--${name}-bg-color`, color],
				[`--${name}-text-color`, calculateTextColor(color)],
				[`--${name}-border-color`, color],
			)
		}
	}

	// Size → font-size + padding
	const isTextLink = appearance === 'text-link'
	switch (sizeValue) {
		case 'small':
			entries.push(
				[`--${name}-font-size`, '14px'],
				[`--${name}-padding`, isTextLink ? '0' : '8px 16px'],
			)
			break
		case 'large':
			entries.push(
				[`--${name}-font-size`, '18px'],
				[`--${name}-padding`, isTextLink ? '0' : '12px 24px'],
			)
			break
		default: // medium
			entries.push(
				[`--${name}-font-size`, '16px'],
				[`--${name}-padding`, isTextLink ? '0' : '10px 20px'],
			)
	}

	// Border-width (based on appearance)
	if (isTextLink) {
		entries.push([`--${name}-border-width`, '0'])
	}
	else if (appearance === 'outline-button') {
		entries.push([`--${name}-border-width`, '2px'])
	}
	else {
		entries.push([`--${name}-border-width`, '1px'])
	}

	// Shape (border-radius)
	switch (styleValue) {
		case 'pill':
			entries.push([`--${name}-border-radius`, '999px'])
			break
		case 'round-corner':
			entries.push([`--${name}-border-radius`, '4px'])
			break
		default: // rectangle
			entries.push([`--${name}-border-radius`, '0'])
	}

	return entries.filter((entry): entry is CssVar => entry[1] !== undefined)
}

/**
 * Generates CSS custom property entries for a background element.
 * Supports solid colors and gradients.
 * Returns an empty array when no explicit merchant override exists in rawDesign.
 *
 * IMPORTANT: The rawDesign for BACKGROUND elements uses a NESTED runtime format
 * (different from TEXT elements which are flat). At runtime, IS passes:
 *   - Default (global token): { overlay: {} }  — no `background` field
 *   - Merchant override:      { background: { type: 'solid', solid: { color: {hex, hsl, raw, rgba} } }, overlay: {} }
 *
 * The gate checks whether rawDesign.background.solid.color exists (merchant set it)
 * vs absent (default/global token → let CSS cascade reach --bg-color from preset).
 *
 * @param name - CSS variable name prefix (e.g. 'section' → --section-background)
 * @param design - BackgroundDesignData from useBackgroundElementDesign (resolved)
 * @param rawDesign - Raw design object from useVueBaseProps().design.value[elementName]
 */
export function createBackgroundVars(name: string, design: BackgroundDesignData | undefined, rawDesign?: unknown): CssVar[] {
	if (!design?.background) return []

	const { background } = design
	const rawBg = getRawField(rawDesign, 'background') as Record<string, unknown> | undefined

	if (background.type === 'solid' && background.solid?.color) {
		// Gate: only emit when merchant explicitly set a background color.
		// At runtime, rawDesign.background.solid.color is a Color object when overridden,
		// or the entire rawDesign.background path is absent when using global token defaults.
		const rawSolid = rawBg && typeof rawBg === 'object'
			? (rawBg as Record<string, unknown>).solid as Record<string, unknown> | undefined
			: undefined
		if (!rawSolid?.color) return []

		const color = resolveColor(background.solid.color)
		if (!color) return []
		return [[`--${name}-background`, color]]
	}

	if (background.type === 'gradient' && background.gradient) {
		// Gate: only emit when merchant explicitly set gradient colors.
		const rawGradient = rawBg && typeof rawBg === 'object'
			? (rawBg as Record<string, unknown>).gradient as Record<string, unknown> | undefined
			: undefined
		if (!rawGradient?.fromColor || !rawGradient?.toColor) return []

		const fromColor = resolveColor(background.gradient.fromColor)
		const toColor = resolveColor(background.gradient.toColor)
		if (!fromColor || !toColor) return []
		return [[`--${name}-background`, `linear-gradient(to right, ${fromColor}, ${toColor})`]]
	}

	return []
}

/**
 * Resolves a color to hex, falling back to getColorHex for legacy usage.
 * Convenience re-export for components that need raw hex (not CSS var approach).
 */
export { getColorHex, calculateTextColor }
