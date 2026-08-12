import type { Reactive } from 'vue'
import type {
	ButtonContentData as RawButtonContentData,
	ImageContent as RawImageContent,
	InputBoxContent as RawInputBoxContent,
	SelectBoxContent as RawSelectBoxContent,
	TextAreaContent as RawTextAreaContent,
	ToggleContent as RawToggleContent,
} from '@lightspeed/crane'

interface BaseCard {
    id: number;
}

// Unwrapped reactive content types. Crane composables return `Reactive<TContent>`,
// which auto-unwraps the ComputedRef fields. Use these aliases anywhere a card or
// injected value carries a Crane content field, instead of importing the wrapped
// shapes directly from `@lightspeed/crane`.
export type InputBoxContent = Reactive<RawInputBoxContent>
export type ImageContent = Reactive<RawImageContent>
export type SelectBoxContent = Reactive<RawSelectBoxContent>
export type TextAreaContent = Reactive<RawTextAreaContent>
export type ToggleContent = Reactive<RawToggleContent>
export type ButtonContent = Reactive<Partial<RawButtonContentData>>

export type { BaseCard }
