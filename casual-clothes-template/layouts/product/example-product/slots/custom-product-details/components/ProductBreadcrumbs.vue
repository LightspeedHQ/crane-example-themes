<template>
	<nav v-show="visible" class="breadcrumbs" aria-label="Breadcrumb">
		<a :href="catalogHref" @click="openCatalog">{{ catalogLabel }}</a>
		<template v-for="category in categories" :key="category.id">
			<span aria-hidden="true">/</span>
			<a :href="categoryHref(category)" @click="openCategory($event, category.id)">
				{{ category.name }}
			</a>
		</template>
		<span aria-hidden="true">/</span>
		<span aria-current="page">{{ productName }}</span>
	</nav>
</template>

<script setup lang="ts">
import { useVueBaseProps } from '@lightspeed/crane'
import { openPage, type StorefrontCategorySummary } from '@lightspeed/ecom-headless'
import { computed } from 'vue'

import { getCurrentLanguageFromSite, makeLanguageAwareUrl } from '../../../../../../shared/utils/language.ts'

const props = defineProps<{
	visible: boolean,
	catalogLabel: string,
	categories: readonly StorefrontCategorySummary[],
	productName: string,
	isPreviewMode: boolean,
}>()

const { site } = useVueBaseProps()
const catalogHref = computed(() => makeStorefrontUrl('/products'))

function makeStorefrontUrl(path: string) {
	const siteContent = site?.value
	return makeLanguageAwareUrl(
		path,
		getCurrentLanguageFromSite(siteContent),
		siteContent?.languages,
	)
}

function categoryHref(category: StorefrontCategorySummary) {
	return makeStorefrontUrl(`/products/${category.slugs.forRouteWithoutId || category.slugs.forRouteWithId}`)
}

function isPlainLeftClick(event: MouseEvent) {
	return event.button === 0 && !event.metaKey && !event.ctrlKey && !event.shiftKey && !event.altKey
}

async function openStorefrontPage(event: MouseEvent, categoryId: number) {
	if (props.isPreviewMode) {
		event.preventDefault()
		return
	}
	if (!isPlainLeftClick(event)) return

	const fallbackUrl = (event.currentTarget as HTMLAnchorElement).href
	event.preventDefault()
	try {
		await openPage('category', { id: categoryId })
	}
	catch {
		globalThis.location.assign(fallbackUrl)
	}
}

function openCatalog(event: MouseEvent) {
	return openStorefrontPage(event, 0)
}

function openCategory(event: MouseEvent, categoryId: number) {
	return openStorefrontPage(event, categoryId)
}
</script>

<style scoped lang="scss" src="./product-breadcrumbs.scss"></style>
