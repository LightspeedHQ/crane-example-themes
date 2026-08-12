<template>
	<section-wrapper :style="backgroundStyle">
		<SectionHeader
			:title="sectionTitle"
			:description="null"
			:title-design="sectionTitleDesign"
			:raw-title-design="rawDesign?.section_title"
		>
		</SectionHeader>

		<ReviewedBy
			:cards="testimonialCards"
			:reviewer-name-design="reviewerNameDesign"
			:review-text-design="reviewTextDesign"
			:raw-reviewer-name-design="rawDesign?.reviewer_name"
			:raw-review-text-design="rawDesign?.review_text"
		>
		</ReviewedBy>
	</section-wrapper>
</template>

<script setup lang="ts">
import ReviewedBy from './components/ReviewedBy.vue'
import SectionWrapper from '../../shared/components/SectionWrapper.vue'
import { Content, Design } from './type'
import {
	useBackgroundElementDesign,
	useDeckElementContent,
	useInputboxElementContent,
	useTextElementDesign,
	useVueBaseProps,
} from '@lightspeed/crane'
import { useMappedDeckCards } from '../../shared/composables'
import { useColorPresetVars } from '../../shared/composables/design'
import { createBackgroundVars } from '../../shared/utils/design-vars'
import { computed } from 'vue'
import { TestimonialCard, TestimonialDeckConfig } from './types'
import SectionHeader from '../../shared/components/SectionHeader.vue'

const sectionTitle = useInputboxElementContent<Content>('sectionTitle')
const reviewsRaw = useDeckElementContent<Content>('reviews')

const sectionTitleDesign = useTextElementDesign<Design>('section_title') as TextDesignData
const reviewerNameDesign = useTextElementDesign<Design>('reviewer_name') as TextDesignData
const reviewTextDesign = useTextElementDesign<Design>('review_text') as TextDesignData

const backgroundDesign = useBackgroundElementDesign<Design>('background') as BackgroundDesignData

const { design: rawDesign } = useVueBaseProps<unknown, Design>()
const colorPresetVars = useColorPresetVars(rawDesign)
const backgroundStyle = computed(() => ({
	...Object.fromEntries(createBackgroundVars('section', backgroundDesign, rawDesign.value?.background)),
	...colorPresetVars.value,
}))

const testimonialCards = useMappedDeckCards<TestimonialCard, Content>(reviewsRaw, TestimonialDeckConfig)

</script>

<style lang="scss" scoped>
:deep(.section) {
	@media (min-width: 768px) {
		padding: 32px 32px 100px 32px;
	}
}

/* Allow testimonials to expand beyond standard max-width on large screens */
:deep(.section__wrapper) {
	@media (min-width: 2000px) {
		max-width: 100%;
		padding: 0 32px;
	}
}
</style>
