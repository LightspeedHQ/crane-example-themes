<template>
	<div v-if="hasDetails" v-show="visible" class="product-details">
		<h2>{{ title }}</h2>
		<dl v-if="hasVisibleFacts" class="product-attributes">
			<div v-if="skuEnabled && sku">
				<dt>{{ skuLabel }}:</dt>
				<dd>{{ sku }}</dd>
			</div>
			<div v-if="stockEnabled && stock !== undefined">
				<dt>{{ stockLabel }}:</dt>
				<dd>{{ stock }}</dd>
			</div>
			<div v-for="attribute in visibleAttributes" :key="attribute.id">
				<dt>{{ attribute.name }}:</dt>
				<dd>{{ attribute.value }}</dd>
			</div>
		</dl>
		<div
			v-if="descriptionEnabled && description"
			class="product-description"
			:class="{ 'product-description--collapsed': hasLongDescription && !descriptionExpanded }"
			itemprop="description"
			v-html="description"
		/>
		<button
			v-if="descriptionEnabled && hasLongDescription"
			type="button"
			class="read-more"
			:aria-expanded="descriptionExpanded"
			@click="descriptionExpanded = !descriptionExpanded"
		>
			{{ descriptionExpanded ? readLessLabel : readMoreLabel }}
			<span aria-hidden="true">⌄</span>
		</button>
	</div>
</template>

<script setup lang="ts">
import type { StorefrontProductAttribute } from '@lightspeed/ecom-headless'
import { computed, ref, watch } from 'vue'

const props = defineProps<{
	visible: boolean,
	title: string,
	skuEnabled: boolean,
	sku?: string,
	skuLabel: string,
	stockEnabled: boolean,
	stock?: number,
	stockLabel: string,
	attributesEnabled: boolean,
	attributes: readonly StorefrontProductAttribute[],
	descriptionEnabled: boolean,
	description: string,
	readMoreLabel: string,
	readLessLabel: string,
}>()

const descriptionExpanded = ref(false)

const visibleAttributes = computed(() => props.attributesEnabled
	? props.attributes.filter(attribute => attribute.type === 'UPC' || attribute.type === 'BRAND')
	: [])
const hasVisibleFacts = computed(() => Boolean(
	(props.skuEnabled && props.sku)
	|| (props.stockEnabled && props.stock !== undefined)
	|| visibleAttributes.value.length > 0,
))
const descriptionText = computed(() => props.description.replace(/<[^>]*>/g, ' ').replace(/\s+/g, ' ').trim())
const hasLongDescription = computed(() => descriptionText.value.length > 190)
const hasDetails = computed(() => Boolean(
	hasVisibleFacts.value || (props.descriptionEnabled && props.description),
))

watch(() => props.description, () => {
	descriptionExpanded.value = false
})
</script>

<style scoped lang="scss">
.product-details {
	margin-top: 32px;
	color: var(--product-details-color, var(--fg-color, #333));
	font-family: var(--product-details-font-family, var(--body-font-family, inherit));
	font-size: var(--product-details-font-size, var(--body-2-font-size, 16px));
	font-style: var(--product-details-font-style, normal);
	font-weight: var(--product-details-font-weight, var(--body-font-weight, 400));
	line-height: 1.5;
}

.product-details h2 {
	margin: 0 0 8px;
	font: inherit;
	font-weight: 700;
}

.product-attributes {
	margin: 0 0 8px;
}

.product-attributes div {
	display: flex;
	gap: 4px;
}

.product-attributes dt {
	font-weight: 700;
}

.product-attributes dd {
	margin: 0;
}

.product-description {
	position: relative;
	max-width: 680px;
	overflow: hidden;
}

.product-description--collapsed {
	max-height: 72px;
}

.product-description :deep(*) {
	margin-top: 0;
}

.read-more {
	display: flex;
	width: 100%;
	align-items: center;
	justify-content: space-between;
	padding: 4px 0 8px;
	border: 0;
	border-bottom: 1px solid #d0d0d0;
	background: transparent;
	color: #0068ff;
	font: inherit;
	cursor: pointer;
}

.read-more span {
	font-size: 22px;
}
</style>
