<template>
	<div
		class="testimonials-cards"
		:class="{ 'testimonials-cards--stretch': shouldStretchCards }"
		:style="reviewVars"
	>
		<div v-for="card in cards" :key="card.id" class="testimonial-card">
			<div class="testimonial-card__rating">
				<RatingStars :rating="Number(card.rating?.value) || 0" />
			</div>

			<p v-show="props.reviewTextDesign?.visible !== false" class="testimonial-card__review">
				{{ card.reviewText?.value }}
			</p>

			<div class="testimonial-card__author" v-if="props.reviewerNameDesign?.visible">
				<span class="testimonial-card__dash">—</span>
				<span class="testimonial-card__name">
					{{ card.reviewedBy?.value }}
				</span>
			</div>
		</div>
	</div>
</template>

<script setup lang="ts">
import RatingStars from './RatingStars.vue'
import { computed } from 'vue'
import { TestimonialCard } from '../types'
import { createTextVars } from '../../../shared/utils/design-vars'

interface Props {
	cards: TestimonialCard[]
	reviewerNameDesign?: TextDesignData
	reviewTextDesign?: TextDesignData
	rawReviewerNameDesign?: unknown
	rawReviewTextDesign?: unknown
}

const props = defineProps<Props>()

const shouldStretchCards = computed(() => props.cards.length <= 3)

const reviewVars = computed(() =>
	Object.fromEntries([
		...createTextVars('reviewer-name', props.reviewerNameDesign, props.rawReviewerNameDesign),
		...createTextVars('review', props.reviewTextDesign, props.rawReviewTextDesign),
	]),
)
</script>

<style scoped>
/* Mobile: Vertical stack */
.testimonials-cards {
	display: flex;
	flex-direction: column;
	gap: 8px;
	width: 100%;
}

/* Card */
.testimonial-card {
	display: flex;
	flex-direction: column;
	gap: 24px;
	padding: 32px;
	background-color: var(--container-bg-color);
	width: 100%;
}

/* Rating */
.testimonial-card__rating {
	display: flex;
	gap: 2px;
}

/* Review Text */
.testimonial-card__review {
	font-family: var(--review-font-family, var(--body-font-family));
	color: var(--review-color, var(--container-fg-color));
	font-size: var(--review-font-size, var(--body-2-font-size));
	font-weight: var(--review-font-weight, var(--body-font-weight));
	font-style: var(--review-font-style, var(--body-font-style));
	line-height: 1.5;
	margin: 0;
	white-space: pre-line;
}

/* Author Row */
.testimonial-card__author {
	display: flex;
	align-items: center;
	gap: 4px;
}

/* Dash */
.testimonial-card__dash {
	font-size: 12px;
	line-height: 16px; /* Fixed line-height per Figma */
}

/* Reviewer Name */
.testimonial-card__name {
	font-family: var(--reviewer-name-font-family, var(--body-font-family));
	color: var(--reviewer-name-color, var(--container-fg-accented-color));
	font-size: var(--reviewer-name-font-size, var(--body-2-font-size));
	font-weight: var(--reviewer-name-font-weight, var(--body-font-weight));
	font-style: var(--reviewer-name-font-style, var(--body-font-style));
	line-height: 1.5;
}

/* Desktop: Horizontal scroll with visible scrollbar */
@media (min-width: 768px) {
	.testimonials-cards {
		flex-direction: row;
		gap: 16px;
		overflow-x: auto;
		overflow-y: hidden;
		scroll-behavior: smooth;
		-webkit-overflow-scrolling: touch;
		padding-bottom: 16px; /* Space for scrollbar */
		align-items: flex-start; /* Allow cards to have different heights based on content */
	}

	/* Custom scrollbar styling - smaller and lower contrast */
	.testimonials-cards::-webkit-scrollbar {
		height: 6px;
	}

	.testimonials-cards::-webkit-scrollbar-track {
		background: #e8e8e8;
		border-radius: 3px;
	}

	.testimonials-cards::-webkit-scrollbar-thumb {
		background: #c4c4c4;
		border-radius: 3px;
	}

	.testimonials-cards::-webkit-scrollbar-thumb:hover {
		background: #a0a0a0;
	}

	.testimonial-card {
		width: 448px; /* Fixed width per Figma */
		flex-shrink: 0;
	}
}

/* Large screens (>2000px): Stretch cards when 3 or fewer */
@media (min-width: 2000px) {
	.testimonials-cards--stretch .testimonial-card {
		flex: 1;
		width: auto;
		min-width: 448px;
	}
}
</style>
