<template>
	<div v-if="hasBottomRowContent" class="header-bottom-row">
		<div class="header-bottom-row__left">
			<Categories
				v-if="categoriesShow.enabled"
				:active-category="selectedCategory"
			/>
		</div>
		<div class="header-bottom-row__right">
			<Search v-if="searchShow.enabled" />
		</div>
	</div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import Categories from '../navigation/Categories.vue'
import Search from '../user/Search.vue'
import { useHeaderToggles, useHeaderState } from '../../composables'

const { selectedCategory } = useHeaderState()
const { searchShow, categoriesShow } = useHeaderToggles()

const hasBottomRowContent = computed(() => {
	return searchShow.enabled || categoriesShow.enabled
})
</script>

<style scoped lang="scss">
@use '../../constants' as c;

.header-bottom-row {
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: c.$HEADER_ROW_HEIGHT;
  /* Inherit background from parent header */
  gap: 1rem;
  min-height: c.$HEADER_ROW_HEIGHT;
}

.header-bottom-row__left {
  display: flex;
  align-items: center;
  flex: 1;
}

.header-bottom-row__right {
  display: flex;
  align-items: center;
  flex-shrink: 0;
}
</style>
