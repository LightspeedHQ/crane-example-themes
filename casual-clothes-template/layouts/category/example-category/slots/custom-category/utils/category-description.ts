const BLOCK_BOUNDARY_PATTERN = /<\/?(?:address|article|aside|blockquote|br|div|footer|h[1-6]|header|li|main|nav|ol|p|section|ul)\b[^>]*>/gi
const HTML_TAG_PATTERN = /<[^>]*>/g
const HTML_ENTITY_PATTERN = /&(?:#(\d+)|#x([\da-f]+)|(amp|apos|gt|lt|nbsp|quot));/gi
const NAMED_ENTITIES: Readonly<Record<string, string>> = {
	amp: '&',
	apos: "'",
	gt: '>',
	lt: '<',
	nbsp: ' ',
	quot: '"',
}

function decodeHtmlEntity(entity: string, decimal?: string, hexadecimal?: string, named?: string): string {
	const codePoint = decimal === undefined
		? Number.parseInt(hexadecimal ?? '', 16)
		: Number.parseInt(decimal, 10)
	if (Number.isFinite(codePoint) && codePoint > 0 && codePoint <= 0x10FFFF) {
		return String.fromCodePoint(codePoint)
	}
	return named === undefined ? entity : (NAMED_ENTITIES[named.toLowerCase()] ?? entity)
}

/** Converts Storefront category HTML to the plain text required by the Atelier heading. */
export function getCategoryDescriptionText(description: string): string {
	let text = description.replace(HTML_ENTITY_PATTERN, decodeHtmlEntity)
	let previousText: string
	do {
		previousText = text
		text = text
			.replace(BLOCK_BOUNDARY_PATTERN, ' ')
			.replace(HTML_TAG_PATTERN, '')
	} while (text !== previousText)

	return text
		.replace(/\s+/g, ' ')
		.trim()
}
