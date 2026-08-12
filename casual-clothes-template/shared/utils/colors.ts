/**
 * Extract hex color value from various color formats
 * @param color - Color value that can be a string, object with hex property, or undefined
 * @returns Hex color string or '#000' as fallback
 */
export function getColorHex(color: string | { hex: string } | undefined): string {
	if (typeof color === 'string') return color
	if (color && typeof color === 'object' && 'hex' in color) return color.hex
	return '#000'
}

/**
 * Normalizes a hex color to 6-character uppercase format.
 * Strips the leading '#', takes the first 6 characters, and uppercases the result.
 * This handles 8-character hex with alpha (e.g. #ffffffff → #FFFFFF).
 *
 * @param hex - Hex color string in any format (#rgb, #rrggbb, #rrggbbaa)
 * @returns Normalized 6-character uppercase hex string including '#'
 *
 * @example
 * normalizeHex6('#ffffffff') // '#FFFFFF'
 * normalizeHex6('#1e1e21')   // '#1E1E21'
 */
export function normalizeHex6(hex: string): string {
	const clean = hex.replace('#', '')
	const expanded = clean.length === 3
		? clean.split('').map(c => c + c).join('')
		: clean
	return `#${expanded.slice(0, 6).toUpperCase()}`
}

export function calculateTextColor(hexColor: string): string {
	const hex = hexColor.replace('#', '')

	const r = parseInt(hex.substring(0, 2), 16)
	const g = parseInt(hex.substring(2, 4), 16)
	const b = parseInt(hex.substring(4, 6), 16)

	const brightness = (0.299 * r + 0.587 * g + 0.114 * b) / 255

	return brightness < 0.5 ? '#ffffff' : '#000000'
}
