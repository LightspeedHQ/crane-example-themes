<template>
	<component
		:is="tag"
		v-show="props.design?.visible !== false"
		:href="href"
		:type="isButton ? type : undefined"
		class="button"
		:class="buttonClasses"
		:style="computedStyle"
		:disabled="disabled"
		@click="handleClick"
	>
		<span v-if="displayText" class="button__text">{{ displayText }}</span>
		<slot v-else />
		<ArrowRightIcon
			v-if="showArrow"
			color="currentColor"
			:width="15"
			:height="12"
			class="button__arrow"
		/>
	</component>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { createButtonVars } from '../utils/design-vars'
import ArrowRightIcon from './icons/ArrowRightIcon.vue'

/**
 * Universal Button component with Crane ButtonContentData and ButtonDesignData support
 *
 * Supports three rendering modes:
 * - Button (default): renders as <button>
 * - Link: renders as <a> when href is provided
 * - Custom: renders as any tag via 'as' prop
 *
 * Can be used with Crane content/design data or standalone with slots.
 *
 * @example
 * ```vue
 * <!-- Basic button with slot -->
 * <Button @click="handleClick">Click me</Button>
 *
 * <!-- Link button -->
 * <Button href="/products">View Products</Button>
 *
 * <!-- With Crane content and design (auto-calls performAction on click) -->
 * <Button :content="ctaButtonContent" :design="ctaButtonDesign" show-arrow />
 *
 * <!-- Full width on mobile -->
 * <Button :content="buttonContent" :design="buttonDesign" show-arrow full-width />
 * ```
 */

/**
 * Crane ButtonContentData interface for type safety
 */
interface ButtonContentProp {
	title?: string
	hasTitle?: boolean
	performAction?: () => void
}

/**
 * Flexible ButtonDesignData type that accepts the result of useButtonElementDesign
 * Uses string types to be compatible with Crane's actual values
 * (e.g., 'solid-button', 'outline-button', 'text-link' for appearance)
 * Color can be an object with hex or a GlobalColorsString
 */
interface ButtonDesignProp {
	appearance?: string
	font?: string
	size?: string
	style?: string
	color?: { hex?: string } | string
	visible?: boolean
}

interface Props {
	/** Crane ButtonContentData with title and performAction */
	content?: ButtonContentProp
	/** Crane ButtonDesignData for styling (accepts useButtonElementDesign result) */
	design?: ButtonDesignProp
	/** Raw design from useVueBaseProps().design.value[elementName] for global token detection */
	rawDesign?: unknown
	/** URL for link mode (renders as <a>) */
	href?: string
	/** Button type attribute (only for button mode) */
	type?: 'button' | 'submit' | 'reset'
	/** Disabled state */
	disabled?: boolean
	/** Show arrow icon after text */
	showArrow?: boolean
	/** Custom tag to render as */
	as?: string
	/** Full width button */
	fullWidth?: boolean
}

const props = withDefaults(defineProps<Props>(), {
	type: 'button',
	disabled: false,
	showArrow: false,
	fullWidth: false,
})

const emit = defineEmits<{
	click: [event: MouseEvent]
}>()

// Display text from content prop
const displayText = computed(() => props.content?.title)

// Determine which tag to render
const tag = computed(() => {
	if (props.as) return props.as
	if (props.href) return 'a'
	return 'button'
})

const isButton = computed(() => tag.value === 'button')

// CSS custom properties from design
const buttonVars = computed(() =>
	Object.fromEntries(
		createButtonVars(
			'btn',
			props.design as Partial<ButtonDesignData> | undefined,
			props.rawDesign,
		),
	),
)

// Merge computed vars with full-width override
const computedStyle = computed(() => {
	const styles = { ...buttonVars.value }
	if (props.fullWidth) {
		styles.width = '100%'
	}
	return styles
})

// CSS classes
const buttonClasses = computed(() => ({
	'button--disabled': props.disabled,
	'button--full-width': props.fullWidth,
	'button--with-arrow': props.showArrow,
}))

// Handle click - calls performAction if content prop is provided
const handleClick = (event: MouseEvent) => {
	if (props.disabled) {
		event.preventDefault()
		return
	}

	// Call Crane performAction if available
	if (props.content?.performAction) {
		props.content.performAction()
	}

	emit('click', event)
}
</script>

<style scoped lang="scss">
.button {
	display: inline-flex;
	justify-content: center;
	align-items: center;
	gap: 10px;
	padding: var(--btn-padding, 10px 20px);
	background: var(--btn-bg-color, var(--fg-accented-color));
	color: var(--btn-text-color, var(--bg-color));
	border-radius: var(--btn-border-radius);
	border: var(--btn-border-width) solid var(--btn-border-color, var(--fg-accented-color));
	font-family: var(--btn-font-family, var(--body-font-family));
	font-size: var(--btn-font-size, var(--button-font-size));
	font-style: var(--button-font-style);
	font-weight: var(--button-font-weight);
	cursor: pointer;
	transition: all 0.2s ease;
	text-decoration: none;
	font-style: normal;
	line-height: 150%;
	letter-spacing: -0.08px;

	&:hover:not(.button--disabled) {
		opacity: 0.8;
	}

	&:active:not(.button--disabled) {
		opacity: 0.6;
	}

	&:focus-visible {
		outline: 2px solid currentColor;
		outline-offset: 2px;
	}

	&--disabled {
		opacity: 0.5;
		cursor: not-allowed;
		pointer-events: none;
	}

	&--full-width {
		width: 100%;
	}

	&__text {
		line-height: 150%;
	}

	&__arrow {
		flex-shrink: 0;
		transition: transform 0.2s ease;
	}

	&:hover:not(.button--disabled) &__arrow {
		transform: translateX(4px);
	}
}
</style>
