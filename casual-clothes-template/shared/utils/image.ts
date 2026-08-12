/**
 * Image validation utilities
 *
 * Provides functions for validating image URLs and checking image availability.
 */

/**
 * Checks if an image URL is valid (not undefined, empty, whitespace-only, or containing 'undefined')
 *
 * @param url - The image URL to validate
 * @returns The trimmed URL if valid, empty string otherwise
 *
 * @example
 * ```typescript
 * const imageUrl = isValidImageUrl(item.image?.highResolutionDesktopImage)
 * // Returns '' if URL is undefined, whitespace-only, '/undefined', or contains 'undefined'
 * // Returns the trimmed URL if valid
 * ```
 */
export function isValidImageUrl(url: string | undefined): string {
	const trimmedUrl = url?.trim()

	if (!trimmedUrl || trimmedUrl === '/undefined' || trimmedUrl === 'undefined' || trimmedUrl.includes('undefined')) {
		return ''
	}
	return trimmedUrl
}

/**
 * Checks if an image URL exists and is valid
 *
 * @param url - The image URL to check
 * @returns true if the URL is valid and not empty
 *
 * @example
 * ```typescript
 * const hasImage = hasValidImage(product.imageUrl)
 * // Returns true if imageUrl is a valid non-empty string
 * ```
 */
export function hasValidImage(url: string | undefined): boolean {
	return !!isValidImageUrl(url)
}

/**
 * Checks if an ImageContent object has a valid high-resolution desktop image
 *
 * @param imageContent - The ImageContent object from Crane
 * @returns true if the image has a valid high-resolution desktop URL
 *
 * @example
 * ```typescript
 * const hasImage = hasValidImageContent(item.image)
 * ```
 */
export function hasValidImageContent(imageContent: { highResolutionDesktopImage?: string } | undefined): boolean {
	return hasValidImage(imageContent?.highResolutionDesktopImage)
}
