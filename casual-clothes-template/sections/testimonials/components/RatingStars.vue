<template>
	<div class="stars-row">
		<star-icon :percent="starsPercents[0]" :index="0"></star-icon>
		<star-icon :percent="starsPercents[1]" :index="1"></star-icon>
		<star-icon :percent="starsPercents[2]" :index="2"></star-icon>
		<star-icon :percent="starsPercents[3]" :index="3"></star-icon>
		<star-icon :percent="starsPercents[4]" :index="4"></star-icon>
	</div>
</template>

<script setup lang="ts">

import StarIcon from './StarIcon.vue'
import { computed } from 'vue'

interface Props {
  rating: number | null
}

const props = defineProps<Props>()

const starsPercents = computed(() => {
	if (props.rating === null) {
		return [0, 0, 0, 0, 0]
	}

	const normalized = Math.max(0, Math.min(props.rating, 500))
	const fullStars = Math.floor(normalized / 100)
	const remainder = normalized % 100

	return Array(5).fill(0).map((_, i) => {
		if (i < fullStars) return 100
		if (i === fullStars && remainder > 0) return remainder
		return 0
	})
})
</script>

<style scoped>
.stars-row {
  display: flex;
  gap: 8px;
  align-items: center;
}
</style>
