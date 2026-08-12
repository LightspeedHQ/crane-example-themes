<template>
	<div v-if="hasLocations" class="locations">
		<!-- Map + List View -->
		<div v-if="showMap" class="locations__content locations__content--with-map">
			<LocationMap
				:locations="locationCards"
				:selected-index="selectedLocationIndex"
				:zoom="mapZoom"
				class="locations__map"
			/>
			<LocationsList
				:locations="locationCards"
				:selected-index="selectedLocationIndex"
				:view-on-map-text="viewOnMapText"
				class="locations__list"
				@select="selectedLocationIndex = $event"
				@close="$emit('close')"
			/>
		</div>

		<!-- List Only View -->
		<div v-else class="locations__content locations__content--list-only">
			<LocationsList
				:locations="locationCards"
				:selected-index="-1"
				:view-on-map-text="viewOnMapText"
				@close="$emit('close')"
			/>
		</div>
	</div>

	<!-- Empty State -->
	<div v-else class="locations__empty">
		<p class="locations__empty-text">{{ emptyStateText }}</p>
	</div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useLocations, useHeaderTranslations } from '../../composables'
import LocationMap from './LocationMap.vue'
import LocationsList from './LocationsList.vue'

defineEmits<{
  (e: 'close'): void
}>()

const { locationCards, hasLocations, showMap, viewOnMapText, mapZoom } = useLocations()
const { translate } = useHeaderTranslations()
const emptyStateText = translate('$label.empty_state.no_locations', 'No store locations configured')

const selectedLocationIndex = ref(0)
</script>

<style scoped lang="scss">
.locations {
  padding: 24px;

  &__content {
    display: flex;
    gap: 20px;

    &--with-map {
      // Side-by-side layout for map + list
      .locations__map,
      .locations__list {
        flex: 1 0 0;
      }
    }

    &--list-only {
      // Full width list when no map
      .locations__list {
        flex: 1;
      }
    }
  }

  // Mobile responsive
  @media (max-width: 768px) {
    padding: 0; // FullScreenOverlay already provides 16px padding
    height: 100%; // Fill the overlay
    display: flex;
    flex-direction: column;

    &__content {
      flex-direction: column;
      flex: 1; // Take remaining space
      min-height: 0; // Allow scrolling

      &--with-map {
        display: flex;
        flex-direction: column;

        .locations__map {
          flex-shrink: 0; // Don't shrink map
          margin-bottom: 20px; // Space between map and list
        }

        .locations__list {
          flex: 1; // Take remaining space
          overflow-y: auto; // Make scrollable
          min-height: 0; // Required for flex child scrolling
        }
      }

      &--list-only {
        display: flex;
        flex-direction: column;

        .locations__list {
          flex: 1;
          overflow-y: auto;
          min-height: 0;
        }
      }
    }
  }
}

// Empty state styling
.locations__empty {
  padding: 40px 24px;
  text-align: center;

  &-text {
    color: inherit;
    font-family: var(--header-font-family, var(--body-font-family));
    font-size: inherit;
    font-weight: inherit;
    font-style: inherit;
    opacity: 0.6;
    margin: 0;
  }
}
</style>
