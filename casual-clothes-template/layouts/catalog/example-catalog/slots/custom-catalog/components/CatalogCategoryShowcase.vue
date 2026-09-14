<template>
	<section
		v-if="categories.length"
		class="category-showcase"
		:aria-labelledby="titleVisible ? titleId : undefined"
		:aria-label="titleVisible ? undefined : title"
	>
		<header class="category-showcase__header">
			<h1 v-show="titleVisible" :id="titleId" class="category-showcase__title">{{ title }}</h1>
			<p v-show="subtitleVisible" class="category-showcase__subtitle">{{ subtitle }}</p>
		</header>
		<div class="category-showcase__grid">
			<a
				v-for="category in categories"
				:key="category.id"
				class="category-showcase__card"
				:href="categoryHref(category)"
				@click="openCategory($event, category.id)"
			>
				<img
					v-if="categoryImage(category)"
					class="category-showcase__image"
					:src="categoryImage(category)"
					:alt="category.media?.alt || category.name"
					loading="lazy"
				>
				<span v-else class="category-showcase__image-placeholder" />
				<span class="category-showcase__name">{{ category.name }}</span>
			</a>
		</div>
	</section>
</template>

<script setup lang="ts">
import { useVueBaseProps } from '@lightspeed/crane'
import { openPage, type StorefrontCategorySummary } from '@lightspeed/ecom-headless'

import { getCurrentLanguageFromSite, makeLanguageAwareUrl } from '../../../../../../shared/utils/language.ts'

const props = defineProps<{
	categories: readonly StorefrontCategorySummary[],
	title: string,
	subtitle: string,
	titleVisible: boolean,
	subtitleVisible: boolean,
	isPreviewMode: boolean,
}>()
const { site } = useVueBaseProps()
const titleId = 'catalog-category-showcase-title'

function categoryImage(category: StorefrontCategorySummary) {
	return category.media?.image800pxUrl
		|| category.media?.image1500pxUrl
		|| category.media?.image400pxUrl
		|| category.media?.imageOriginalUrl
}

function categoryHref(category: StorefrontCategorySummary) {
	const path = `/products/${category.slugs.forRouteWithoutId || category.slugs.forRouteWithId}`
	const siteContent = site?.value
	return makeLanguageAwareUrl(
		path,
		getCurrentLanguageFromSite(siteContent),
		siteContent?.languages,
	)
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

<style scoped lang="scss">
* { box-sizing: border-box; }
.category-showcase { padding: 64px 16px; }
.category-showcase__header { display: grid; margin-bottom: 32px; gap: 24px; }
.category-showcase__title,
.category-showcase__subtitle { margin: 0; }
.category-showcase__title {
	font: var(--section-title-font-style, normal) var(--section-title-font-weight, 400)
		var(--section-title-font-size, var(--heading-1-font-size, 32px))/1.5
		var(--section-title-font-family, var(--heading-font-family, inherit));
	color: var(--section-title-color, var(--fg-color, #191919));
}
.category-showcase__subtitle {
	font: var(--section-subtitle-font-style, normal) var(--section-subtitle-font-weight, 400)
		var(--section-subtitle-font-size, var(--body-2-font-size, 16px))/1.5
		var(--section-subtitle-font-family, var(--body-font-family, inherit));
	color: var(--section-subtitle-color, var(--fg-color, #191919));
}
.category-showcase__grid { display: grid; grid-template-columns: repeat(4, minmax(0, 1fr)); gap: 32px 16px; }
.category-showcase__card { display: grid; min-width: 0; gap: 16px; color: inherit; text-decoration: none; }
.category-showcase__image,
.category-showcase__image-placeholder { display: block; width: 100%; aspect-ratio: 1; background: #efede8; }
.category-showcase__image { object-fit: cover; }
.category-showcase__name {
	font: var(--product-text-font-style, normal) var(--product-text-font-weight, 400)
		var(--product-text-font-size, var(--body-2-font-size, 16px))/1.5
		var(--product-text-font-family, var(--body-font-family, inherit));
	color: var(--product-text-color, var(--fg-color, #191919));
}
@media (max-width: 900px) { .category-showcase__grid { grid-template-columns: repeat(2, minmax(0, 1fr)); } }
@media (max-width: 520px) {
	.category-showcase { padding-block: 48px; }
	.category-showcase__grid { grid-template-columns: 1fr; }
}
</style>
