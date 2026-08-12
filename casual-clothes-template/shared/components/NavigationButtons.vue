<template>
	<div
		class="navigation"
		:class="{ 'navigation--hover': showHover }"
		:style="{
			'--padding-mobile': paddingMobile,
			'--padding-desktop': paddingDesktop,
			'--disabled-opacity': DISABLED_OPACITY,
		}"
	>
		<button
			class="navigation__button"
			:disabled="prevDisabled"
			:aria-label="prevLabel"
			@click="$emit('prev')"
		>
			<svg
				:width="iconSizePx"
				:height="iconSizePx"
				:viewBox="`0 0 ${viewBoxSize} ${viewBoxSize}`"
				fill="none"
				xmlns="http://www.w3.org/2000/svg"
			>
				<path
					v-if="iconSize === 'md'"
					d="M15 18L9 12L15 6"
					stroke="currentColor"
					stroke-width="2"
					stroke-linecap="round"
					stroke-linejoin="round"
				/>
				<path
					v-else
					d="M10 12L6 8L10 4"
					stroke="currentColor"
					stroke-width="2"
					stroke-linecap="round"
					stroke-linejoin="round"
				/>
			</svg>
		</button>

		<button
			class="navigation__button"
			:disabled="nextDisabled"
			:aria-label="nextLabel"
			@click="$emit('next')"
		>
			<svg
				:width="iconSizePx"
				:height="iconSizePx"
				:viewBox="`0 0 ${viewBoxSize} ${viewBoxSize}`"
				fill="none"
				xmlns="http://www.w3.org/2000/svg"
			>
				<path
					v-if="iconSize === 'md'"
					d="M9 18L15 12L9 6"
					stroke="currentColor"
					stroke-width="2"
					stroke-linecap="round"
					stroke-linejoin="round"
				/>
				<path
					v-else
					d="M6 4L10 8L6 12"
					stroke="currentColor"
					stroke-width="2"
					stroke-linecap="round"
					stroke-linejoin="round"
				/>
			</svg>
		</button>
	</div>
</template>

<script setup lang="ts">
import { computed } from 'vue'

interface Props {
  prevDisabled: boolean
  nextDisabled: boolean
  prevLabel?: string
  nextLabel?: string
  paddingMobile?: string
  paddingDesktop?: string
  iconSize?: 'sm' | 'md'
  showHover?: boolean
}

const props = withDefaults(defineProps<Props>(), {
	prevLabel: 'Previous',
	nextLabel: 'Next',
	paddingMobile: '0',
	paddingDesktop: '0',
	iconSize: 'md',
	showHover: true,
})

const DISABLED_OPACITY = 0.5

defineEmits<{
  prev: []
  next: []
}>()

const iconSizePx = computed(() => (props.iconSize === 'sm' ? 16 : 24))
const viewBoxSize = computed(() => iconSizePx.value)
</script>

<style scoped>
.navigation {
	position: absolute;
	top: 50%;
	left: var(--padding-mobile, 0);
	right: var(--padding-mobile, 0);
	transform: translateY(-50%);
	display: flex;
	justify-content: space-between;
	pointer-events: none;
	z-index: 10;
}

@media (min-width: 768px) {
	.navigation {
		left: var(--padding-desktop, 0);
		right: var(--padding-desktop, 0);
	}
}

.navigation__button {
	width: 44px;
	height: 44px;
	background: rgba(255, 255, 255, 0.64);
	border: none;
	display: flex;
	align-items: center;
	justify-content: center;
	cursor: pointer;
	pointer-events: auto;
	color: var(--fg-color);
	z-index: 10;
	transition: background 0.2s;
}

.navigation__button:disabled {
	opacity: var(--disabled-opacity, 0.5);
	cursor: not-allowed;
}

.navigation--hover .navigation__button:hover:not(:disabled) {
	background: rgba(255, 255, 255, 0.8);
}

.navigation__button svg {
	display: block;
}
</style>
