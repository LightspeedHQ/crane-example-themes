<template>
	<nav v-if="pageCount > 1" class="pagination" :aria-label="paginationLabel">
		<button
			class="pagination__previous"
			type="button"
			:disabled="currentPage === 1"
			@click="selectPage(currentPage - 1)"
		><span aria-hidden="true">←</span> {{ previousLabel }}</button>
		<div class="pagination__pages">
			<button
				v-for="page in visiblePages"
				:key="page"
				type="button"
				:class="{ 'pagination__page--current': page === currentPage }"
				:aria-current="page === currentPage ? 'page' : undefined"
				@click="selectPage(page)"
			>{{ page }}</button>
		</div>
		<button
			class="pagination__next"
			type="button"
			:disabled="currentPage === pageCount"
			@click="selectPage(currentPage + 1)"
		>{{ nextLabel }} <span aria-hidden="true">→</span></button>
	</nav>
</template>

<script setup lang="ts">
import { computed } from 'vue'

const props = defineProps<{
	offset: number,
	limit: number,
	total: number,
	previousLabel: string,
	nextLabel: string,
	paginationLabel: string,
}>()
const emit = defineEmits<{ 'update:offset': [offset: number] }>()
const safeLimit = computed(() => (
	Number.isFinite(props.limit) && props.limit > 0 ? Math.floor(props.limit) : 1
))
const pageCount = computed(() => Math.max(1, Math.ceil(Math.max(0, props.total) / safeLimit.value)))
const currentPage = computed(() => Math.min(
	pageCount.value,
	Math.max(1, Math.floor(Math.max(0, props.offset) / safeLimit.value) + 1),
))
const visiblePages = computed(() => {
	const firstPage = Math.max(1, Math.min(currentPage.value - 3, pageCount.value - 6))
	const lastPage = Math.min(pageCount.value, firstPage + 6)
	return Array.from({ length: lastPage - firstPage + 1 }, (_, index) => firstPage + index)
})

function selectPage(page: number) {
	if (page >= 1 && page <= pageCount.value) emit('update:offset', (page - 1) * safeLimit.value)
}
</script>

<style scoped>
.pagination { display: grid; grid-template-columns: 1fr auto 1fr; align-items: center; margin-top: 32px; gap: 8px; }
.pagination__pages { display: flex; align-items: center; justify-content: center; gap: 8px; }
.pagination__previous { justify-self: start; }
.pagination__next { justify-self: end; }
.pagination button {
	display: inline-flex;
	align-items: center;
	padding: 8px 12px;
	border: 0;
	background: transparent;
	color: inherit;
	font-size: 18px;
	line-height: 24px;
	gap: 8px;
	cursor: pointer;
}
.pagination button:disabled { opacity: 0.35; cursor: default; }
.pagination__page--current { text-decoration: underline; text-underline-offset: 5px; }
</style>
