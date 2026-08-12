/**
 * Calculate relative luminance of a color
 * Formula: https://www.w3.org/TR/WCAG20/#relativeluminancedef
 */
function getLuminance(r: number, g: number, b: number): number {
	const rsRGB = r / 255
	const gsRGB = g / 255
	const bsRGB = b / 255

	const rLinear = rsRGB <= 0.03928 ? rsRGB / 12.92 : Math.pow((rsRGB + 0.055) / 1.055, 2.4)
	const gLinear = gsRGB <= 0.03928 ? gsRGB / 12.92 : Math.pow((gsRGB + 0.055) / 1.055, 2.4)
	const bLinear = bsRGB <= 0.03928 ? bsRGB / 12.92 : Math.pow((bsRGB + 0.055) / 1.055, 2.4)

	return 0.2126 * rLinear + 0.7152 * gLinear + 0.0722 * bLinear
}

/**
 * Parse hex color to RGB.
 * Supports 3-char (#rgb), 6-char (#rrggbb), and 8-char (#rrggbbaa) formats.
 * Alpha channel is ignored for contrast calculation.
 */
function hexToRgb(hex: string): { r: number; g: number; b: number } | null {
	// Expand shorthand #rgb → #rrggbb
	const shorthand = /^#?([a-f\d])([a-f\d])([a-f\d])$/i.exec(hex)
	if (shorthand) {
		return {
			r: parseInt(shorthand[1] + shorthand[1], 16),
			g: parseInt(shorthand[2] + shorthand[2], 16),
			b: parseInt(shorthand[3] + shorthand[3], 16),
		}
	}

	// 6-char or 8-char (#rrggbb or #rrggbbaa — alpha ignored)
	const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})/i.exec(hex)
	return result ? {
		r: parseInt(result[1], 16),
		g: parseInt(result[2], 16),
		b: parseInt(result[3], 16),
	} : null
}

/**
 * Get best contrast color (black or white) for a given background color
 * @param backgroundColor - Hex color string (e.g., '#FF0000')
 * @returns '#000000' or '#FFFFFF' depending on which provides better contrast
 */
export function getContrastColor(backgroundColor: string): string {
	const rgb = hexToRgb(backgroundColor)
	if (!rgb) return '#FFFFFF' // Default to white if parsing fails

	const luminance = getLuminance(rgb.r, rgb.g, rgb.b)
	
	// If background is light (luminance > 0.5), use black text
	// If background is dark (luminance <= 0.5), use white text
	return luminance > 0.5 ? '#000000' : '#FFFFFF'
}
