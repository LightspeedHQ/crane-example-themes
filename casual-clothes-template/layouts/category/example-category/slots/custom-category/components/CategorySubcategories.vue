<template>
	<ul v-if="categories.length" class="category-subcategories" :aria-label="label">
		<li v-for="category in categories" :key="category.id">
			<a
				class="category-subcategories__card"
				:href="categoryHref(category)"
				@click="openCategory($event, category.id)"
			>
				<img
					v-if="categoryImage(category)"
					class="category-subcategories__image"
					:src="categoryImage(category)"
					alt=""
					loading="lazy"
					@error="onImageError(category)"
				>
				<span v-else class="category-subcategories__placeholder" aria-hidden="true" />
				<span class="category-subcategories__name">{{ category.name }}</span>
			</a>
		</li>
	</ul>
</template>

<script setup lang="ts">
import { useVueBaseProps } from '@lightspeed/crane'
import { openPage, type StorefrontCategorySummary } from '@lightspeed/ecom-headless'
import { ref } from 'vue'

import { getCurrentLanguageFromSite, makeLanguageAwareUrl } from '../../../../../../shared/utils/language.ts'

const props = defineProps<{
	categories: readonly StorefrontCategorySummary[],
	label: string,
	isPreviewMode: boolean,
}>()
const { site } = useVueBaseProps()
const failedImages = ref(new Set<string>())

function categoryImage(category: StorefrontCategorySummary) {
	const url = category.media?.image800pxUrl
		|| category.media?.image1500pxUrl
		|| category.media?.image400pxUrl
		|| category.media?.imageOriginalUrl
	return url && !failedImages.value.has(url) ? url : undefined
}

function onImageError(category: StorefrontCategorySummary) {
	const url = categoryImage(category)
	if (url) failedImages.value.add(url)
}

function categoryHref(category: StorefrontCategorySummary) {
	const path = `/products/${category.slugs.forRouteWithoutId || category.slugs.forRouteWithId}`
	const siteContent = site?.value
	return makeLanguageAwareUrl(path, getCurrentLanguageFromSite(siteContent), siteContent?.languages)
}

async function openCategory(event: MouseEvent, categoryId: number) {
	if (props.isPreviewMode) {
		event.preventDefault()
		return
	}
	if (event.button !== 0 || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return

	const fallbackUrl = (event.currentTarget as HTMLAnchorElement).href
	event.preventDefault()
	try {
		await openPage('category', { id: categoryId })
	}
	catch {
		globalThis.location.assign(fallbackUrl)
	}
}
</script>

<style scoped lang="scss" src="./category-subcategories.scss" />
