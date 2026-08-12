<template>
	<div class="locations-list">
		<div
			v-for="(location, index) in locations"
			:key="index"
			class="locations-list__item"
			:class="{ 'locations-list__item--selected': index === selectedIndex }"
			@click="handleLocationClick(index)">
			<LocationCard 
				:location="location" 
				:view-on-map-text="viewOnMapText"
				:is-selected="index === selectedIndex"
				@close="$emit('close')" 
			/>
		</div>
	</div>
</template>

<script setup lang="ts">
import LocationCard from './LocationCard.vue'
import type { LocationCard as LocationCardType } from '../../types/locations'

interface Props {
  locations: LocationCardType[]
  selectedIndex: number
  viewOnMapText: string
}

const props = defineProps<Props>()

const emit = defineEmits<{
  (e: 'select', index: number): void
  (e: 'close'): void
}>()

/**
 * Handle location click
 * Only emit select event if map is shown (selectedIndex >= 0)
 */
const handleLocationClick = (index: number) => {
	if (props.selectedIndex >= 0) {
		emit('select', index)
	}
}
</script>

<style scoped lang="scss">
.locations-list {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 16px;
  align-self: stretch;

  &__item {
    display: flex;
    flex: 1 0 auto;
    padding: 12px;
    flex-direction: column;
    align-items: flex-start;
    gap: 16px;
    align-self: stretch;
    position: relative;

    border-radius: 8px;
    transition: all 0.2s ease;

    // When map is shown (selectedIndex >= 0), make items clickable
    .locations-list:has(&--selected) & {
      cursor: pointer;

      &:hover {
        background-color: rgba(0, 0, 0, 0.03);
        transform: translateX(4px);
      }
    }

    &--selected {
      background-color: rgba(0, 0, 0, 0.05);
      cursor: default;
      position: relative;

      &:hover {
        background-color: rgba(0, 0, 0, 0.05);
        transform: none;
      }

      // Left border indicator (monochrome design)
      &::before {
        content: '';
        position: absolute;
        left: 0;
        top: 50%;
        transform: translateY(-50%);
        width: 3px;
        height: 40%;
        background-color: currentColor;
        border-radius: 2px;
      }
    }
  }
}
</style>
