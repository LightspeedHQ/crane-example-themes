<template>
	<span
		v-if="text"
		class="badge"
		:class="badgeClasses"
		:style="badgeStyle"
	>
		<slot>{{ text }}</slot>
	</span>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { getContrastColor } from '../utils'

/**
 * Badge component for product ribbons, sale labels, and status indicators
 *
 * Automatically calculates text color based on background for optimal contrast.
 * Supports different variants and positions.
 *
 * @example
 * ```vue
 * <!-- Basic badge -->
 * <Badge text="Sale" color="#ff0000" />
 *
 * <!-- With ribbon data from product -->
 * <Badge :text="product.ribbon?.text" :color="product.ribbon?.color" />
 *
 * <!-- Different variants -->
 * <Badge text="New" variant="pill" color="#00ff00" />
 * <Badge text="Hot" variant="tag" position="top-right" />
 * ```
 */

type BadgeVariant = 'default' | 'pill' | 'tag' | 'ribbon'
type BadgePosition = 'static' | 'top-left' | 'top-right' | 'bottom-left' | 'bottom-right'

interface Props {
	/** Badge text content */
	text?: string
	/** Background color (hex) */
	color?: string
	/** Text color (auto-calculated if not provided) */
	textColor?: string
	/** Badge variant style */
	variant?: BadgeVariant
	/** Position when used as overlay */
	position?: BadgePosition
	/** Font size in pixels */
	fontSize?: number
}

const props = withDefaults(defineProps<Props>(), {
	color: '#000000',
	variant: 'default',
	position: 'static',
	fontSize: 12,
})

// Compute text color with automatic contrast
const computedTextColor = computed(() => {
	if (props.textColor) return props.textColor
	return getContrastColor(props.color || '#000000')
})

// Compute inline styles
const badgeStyle = computed(() => ({
	backgroundColor: props.color,
	color: computedTextColor.value,
	fontSize: `${props.fontSize}px`,
}))

// Compute CSS classes
const badgeClasses = computed(() => ({
	[`badge--${props.variant}`]: true,
	[`badge--${props.position}`]: props.position !== 'static',
}))
</script>

<style scoped lang="scss">
.badge {
	display: inline-flex;
	align-items: center;
	justify-content: center;
	padding: 4px 8px;
	font-family: var(--body-font-family);
	font-weight: 500;
	line-height: 1.2;
	white-space: nowrap;
	text-transform: uppercase;
	letter-spacing: 0.5px;

	// Variants
	&--default {
		border-radius: 2px;
	}

	&--pill {
		border-radius: 999px;
		padding: 4px 12px;
	}

	&--tag {
		border-radius: 4px;
		padding: 6px 10px;
	}

	&--ribbon {
		position: relative;
		padding: 6px 12px;
		border-radius: 0;

		// Ribbon tail effect
		&::after {
			content: '';
			position: absolute;
			right: -8px;
			top: 0;
			border-style: solid;
			border-width: 12px 8px 12px 0;
			border-color: transparent;
			border-left-color: inherit;
		}
	}

	// Positions (for overlay usage)
	&--top-left,
	&--top-right,
	&--bottom-left,
	&--bottom-right {
		position: absolute;
		z-index: 1;
	}

	&--top-left {
		top: 8px;
		left: 8px;
	}

	&--top-right {
		top: 8px;
		right: 8px;
	}

	&--bottom-left {
		bottom: 8px;
		left: 8px;
	}

	&--bottom-right {
		bottom: 8px;
		right: 8px;
	}
}
</style>
