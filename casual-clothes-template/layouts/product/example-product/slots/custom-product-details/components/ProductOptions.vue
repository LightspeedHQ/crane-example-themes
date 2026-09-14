<template>
	<div v-if="options.length" class="product-options">
		<fieldset v-for="option in options" :key="option.optionId" class="product-option">
			<legend v-show="labelsVisible" class="product-option__label">
				{{ option.optionText }}:
			</legend>

			<div v-if="option.type === 'SWATCHES'" class="product-option__choices product-option__choices--swatches">
				<button
					v-for="choice in option.choices"
					:key="choice.choiceId"
					type="button"
					class="swatch"
					:class="{ 'swatch--selected': isChoiceSelected(option.optionId, choice.choiceId) }"
					:style="swatchStyle(choice)"
					:title="choice.choiceName"
					:aria-label="`${option.optionText}: ${choice.choiceName}`"
					:aria-pressed="isChoiceSelected(option.optionId, choice.choiceId)"
					:disabled="isChoiceDisabled(choice)"
					@click="selectChoice(option.optionId, choice.choiceId)"
				/>
			</div>

			<div v-else-if="option.type === 'RADIO' || option.type === 'SIZE'" class="product-option__choices">
				<button
					v-for="choice in option.choices"
					:key="choice.choiceId"
					type="button"
					class="choice-button"
					:class="{ 'choice-button--selected': isChoiceSelected(option.optionId, choice.choiceId) }"
					:aria-pressed="isChoiceSelected(option.optionId, choice.choiceId)"
					:disabled="isChoiceDisabled(choice)"
					@click="selectChoice(option.optionId, choice.choiceId)"
				>
					{{ choice.choiceName }}
				</button>
			</div>

			<div v-else-if="option.type === 'CHECKBOX'" class="product-option__choices">
				<label v-for="choice in option.choices" :key="choice.choiceId" class="check-choice">
					<input
						type="checkbox"
						:checked="isCheckboxSelected(option.optionId, choice.choiceId)"
						:disabled="isChoiceDisabled(choice)"
						@change="toggleCheckbox(option.optionId, choice.choiceId)"
					>
					<span>{{ choice.choiceName }}</span>
				</label>
			</div>

			<select
				v-else-if="option.type === 'DROPDOWN'"
				class="option-input"
				:value="selectedOptions[option.optionId] || ''"
				:required="option.required"
				@change="onSelectChanged(option.optionId, $event)"
			>
				<option value="" disabled>—</option>
				<option
					v-for="choice in option.choices"
					:key="choice.choiceId"
					:value="choice.choiceId"
					:disabled="isChoiceDisabled(choice)"
				>
					{{ choice.choiceName }}
				</option>
			</select>

			<textarea
				v-else-if="option.type === 'TEXTAREA'"
				class="option-input option-input--textarea"
				:value="selectedOptions[option.optionId] || ''"
				:required="option.required"
				:maxlength="option.maxLength"
				:placeholder="option.placeholder"
				@input="onTextOptionChanged(option.optionId, $event)"
			/>

			<input
				v-else-if="option.type !== 'FILES'"
				class="option-input"
				:type="option.type === 'DATE' ? 'date' : option.type === 'EMAIL' ? 'email' : 'text'"
				:value="selectedOptions[option.optionId] || ''"
				:required="option.required"
				:maxlength="option.maxLength"
				:placeholder="option.placeholder"
				@input="onTextOptionChanged(option.optionId, $event)"
			>
		</fieldset>
	</div>
</template>

<script setup lang="ts">
import type { StorefrontProductOption } from '@lightspeed/ecom-headless'

import type { SelectedOptionValue } from '../product-details-types.ts'

const props = defineProps<{
	options: readonly StorefrontProductOption[],
	selectedOptions: Readonly<Record<string, SelectedOptionValue>>,
	labelsVisible: boolean,
}>()

const emit = defineEmits<{
	updateSelectedOptions: [value: Record<string, SelectedOptionValue>],
}>()

function updateOption(optionId: string, value: SelectedOptionValue) {
	emit('updateSelectedOptions', { ...props.selectedOptions, [optionId]: value })
}

function swatchStyle(choice: StorefrontProductOption['choices'][number]) {
	return { backgroundColor: choice.hexCodes?.[0] || '#d9d9d9' }
}

function isChoiceDisabled(choice: StorefrontProductOption['choices'][number]) {
	return choice.visibility === 'DISABLE'
}

function isChoiceSelected(optionId: string, choiceId: string) {
	return props.selectedOptions[optionId] === choiceId
}

function selectChoice(optionId: string, choiceId: string) {
	updateOption(optionId, choiceId)
}

function isCheckboxSelected(optionId: string, choiceId: string) {
	const selected = props.selectedOptions[optionId]
	return Array.isArray(selected) && selected.includes(choiceId)
}

function toggleCheckbox(optionId: string, choiceId: string) {
	const current = props.selectedOptions[optionId]
	const selected = Array.isArray(current) ? current : []
	updateOption(optionId, selected.includes(choiceId)
		? selected.filter(item => item !== choiceId)
		: [...selected, choiceId])
}

function onSelectChanged(optionId: string, event: Event) {
	selectChoice(optionId, (event.target as HTMLSelectElement).value)
}

function onTextOptionChanged(optionId: string, event: Event) {
	selectChoice(optionId, (event.target as HTMLInputElement | HTMLTextAreaElement).value)
}
</script>

<style scoped lang="scss">
.product-options {
	display: flex;
	flex-direction: column;
	gap: 16px;
	margin-top: 18px;
}

.product-option {
	min-width: 0;
	margin: 0;
	padding: 0;
	border: 0;
}

.product-option__label {
	display: block;
	margin-bottom: 8px;
	padding: 0;
	color: var(--product-option-labels-color, inherit);
	font-family: var(--product-option-labels-font-family, var(--body-font-family, inherit));
	font-size: var(--product-option-labels-font-size, 14px);
	font-style: var(--product-option-labels-font-style, normal);
	font-weight: var(--product-option-labels-font-weight, 700);
	line-height: 21px;
}

.product-option__choices {
	display: flex;
	flex-wrap: wrap;
	gap: 8px;
}

.product-option__choices--swatches {
	gap: 16px;
}

.swatch {
	position: relative;
	display: block;
	width: 20px;
	height: 20px;
	padding: 0;
	border: 0;
	border-radius: 50%;
	background-position: center;
	background-size: cover;
	cursor: pointer;
}

.swatch--selected::after {
	position: absolute;
	inset: -6px;
	border: 1px solid var(--fg-color, #191919);
	border-radius: 50%;
	content: '';
}

.swatch:disabled,
.choice-button:disabled,
.check-choice:has(input:disabled) {
	opacity: 0.45;
	cursor: not-allowed;
}

.choice-button {
	min-width: 44px;
	height: 40px;
	padding: 0 14px;
	border: 1px solid #b5b5b5;
	background: transparent;
	color: inherit;
	cursor: pointer;
}

.choice-button--selected {
	border-color: var(--fg-color, #191919);
	background: var(--fg-color, #191919);
	color: var(--bg-color, #fff);
}

.check-choice {
	display: flex;
	align-items: center;
	gap: 8px;
	font-size: 14px;
}

.option-input {
	width: min(100%, 320px);
	min-height: 44px;
	padding: 9px 12px;
	border: 1px solid #9a9a9a;
	border-radius: 0;
	background: transparent;
	color: inherit;
	font: inherit;
}

.option-input--textarea {
	min-height: 88px;
	resize: vertical;
}
</style>
