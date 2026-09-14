export type SelectedOptionValue = string | readonly string[]

export interface GalleryImage {
	readonly id: string
	readonly url: string
	readonly fullSizeUrl: string
	readonly thumbnail: string
	readonly alt: string
	readonly width: number
	readonly height: number
}

export interface GalleryZoomPoint {
	readonly x: number
	readonly y: number
}
