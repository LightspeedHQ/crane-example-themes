interface SlotDataLike {
	readonly content: unknown
	readonly design: unknown
	readonly defaults: unknown
	readonly externalContent: unknown
}

export function normalizeServerSlotData<T extends SlotDataLike>(data: T): T {
	return {
		...data,
		content: data.content ?? {},
		design: data.design ?? {},
		defaults: data.defaults ?? {},
		externalContent: data.externalContent ?? {},
	} as T
}
