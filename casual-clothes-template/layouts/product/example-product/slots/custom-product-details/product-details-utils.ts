import type { StorefrontProductOption } from '@lightspeed/ecom-headless'

import type { SelectedOptionValue } from './product-details-types.ts'

export function cloneSelectedOptions(
	selected: Readonly<Record<string, SelectedOptionValue>>,
): Record<string, SelectedOptionValue> {
	return Object.fromEntries(Object.entries(selected).map(
		([optionId, value]) => [optionId, Array.isArray(value) ? [...value] : value],
	))
}

export function selectedOptionsAreEqual(
	first: Readonly<Record<string, SelectedOptionValue>>,
	second: Readonly<Record<string, SelectedOptionValue>>,
): boolean {
	const keys = new Set([...Object.keys(first), ...Object.keys(second)])
	return [...keys].every((key) => {
		const firstValue = first[key]
		const secondValue = second[key]
		if (Array.isArray(firstValue) || Array.isArray(secondValue)) {
			return Array.isArray(firstValue)
				&& Array.isArray(secondValue)
				&& firstValue.length === secondValue.length
				&& firstValue.every((value, index) => value === secondValue[index])
		}
		return firstValue === secondValue
	})
}

export function positiveNumber(value: number | null | undefined): number | undefined {
	return typeof value === 'number' && value > 0 ? value : undefined
}

export function interpolate(template: string, values: Record<string, string | number>): string {
	return Object.entries(values).reduce(
		(result, [key, value]) => result.replace(`{${key}}`, String(value)),
		template,
	)
}

export function isValidDate(value: string): boolean {
	const match = /^(\d{4})-(\d{2})-(\d{2})$/.exec(value)
	if (!match) return false
	const [, year, month, day] = match.map(Number)
	const date = new Date(Date.UTC(year, month - 1, day))
	return date.getUTCFullYear() === year
		&& date.getUTCMonth() === month - 1
		&& date.getUTCDate() === day
}

export function isChoiceDisabled(choice: StorefrontProductOption['choices'][number]): boolean {
	return choice.visibility === 'DISABLE'
}
