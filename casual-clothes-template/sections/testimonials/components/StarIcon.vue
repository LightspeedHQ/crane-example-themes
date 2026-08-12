<template>
	<svg
		:width="width"
		:height="height"
		viewBox="0 0 20 20"
		xmlns="http://www.w3.org/2000/svg"
	>
		<path
			d="M10 0L12.645 6.35942L19.5106 6.90983L14.2798 11.3906L15.8779 18.0902L10 14.5L4.12215 18.0902L5.72025 11.3906L0.489435 6.90983L7.35497 6.35942L10 0Z"
			fill="black"
		/>

		<clipPath :id="clipId">
			<rect
				:width="percentWidth"
				height="20"
				x="0"
				y="0" />
		</clipPath>

		<path
			d="M10 0L12.645 6.35942L19.5106 6.90983L14.2798 11.3906L15.8779 18.0902L10 14.5L4.12215 18.0902L5.72025 11.3906L0.489435 6.90983L7.35497 6.35942L10 0Z"
			fill="#FFD700"
			:clip-path="`url(#${clipId})`"
		/>
	</svg>
</template>

<script setup lang="ts">
import { computed } from 'vue'

interface Props {
  percent: number
  width?: number
  height?: number
  /** Unique index for SSR-safe clip ID generation (0-based, e.g., star position in rating) */
  index?: number
}

const props = defineProps<Props>()

const percentWidth = computed(() => (props.percent / 100) * 20)

const width = props.width ?? 20
const height = props.height ?? 20

// Use deterministic ID based on percent and index for SSR hydration safety
// Math.random() causes hydration mismatch since server/client generate different values
const clipId = `fillClip-${props.index ?? 0}-${Math.round(props.percent)}`
</script>
