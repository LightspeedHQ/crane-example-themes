<template>
	<div class="location-map">
		<div
			v-for="(location, index) in locations"
			:key="location.id"
			class="location-map__frame"
			:class="{ 'location-map__frame--active': index === selectedIndex }"
		>
			<!-- Loading skeleton -->
			<div v-if="!loadedMaps[index]" class="location-map__skeleton">
				<div class="location-map__skeleton-pulse"></div>
			</div>

			<!-- Only load iframe for selected location to improve performance -->
			<iframe
				v-if="location.location_address?.value && (index === selectedIndex || loadedMaps[index])"
				:src="getMapUrl(location.location_address.value)"
				width="100%"
				height="100%"
				style="border:0;"
				allowfullscreen
				loading="lazy"
				referrerpolicy="no-referrer-when-downgrade"
				:title="getMapTitle(location.location_name?.value)"
				@load="onMapLoad(index)"
			/>
		</div>
	</div>
</template>

<script setup lang="ts">
import { ref, watch } from 'vue'
import { useHeaderTranslations } from '../../composables'
import type { LocationCard } from '../../types/locations'

interface Props {
  locations: LocationCard[]
  selectedIndex: number
  zoom?: number // Zoom level (1-21, where 15 is a good default for city blocks)
}

const props = withDefaults(defineProps<Props>(), {
	zoom: 15,
})

const { translate } = useHeaderTranslations()

const loadedMaps = ref<Record<number, boolean>>({})

const onMapLoad = (index: number) => {
	loadedMaps.value[index] = true
}

watch(() => props.locations, () => {
	loadedMaps.value = {}
})

const getMapTitle = (locationName?: string): string => {
	if (locationName) {
		return translate('$label.aria.map_of_location', 'Map of {location}').replace('{location}', locationName)
	}
	return translate('$label.aria.map_of_store', 'Map of store location')
}

/**
 * Generate Google Maps embed URL with zoom parameter
 * Uses output=embed parameter for iframe embedding
 * No API key required for basic embedding
 * Note: The 'z' parameter is unofficial but widely supported
 */
const getMapUrl = (address: string): string => {
	const encodedAddress = encodeURIComponent(address)
	return `https://maps.google.com/maps?q=${encodedAddress}&z=${props.zoom}&output=embed`
}
</script>

<style scoped lang="scss">
.location-map {
  position: relative;
  width: 100%;
  height: 450px;
  background: #f0f0f0;
  border-radius: 8px;
  overflow: hidden;

  &__frame {
    position: absolute;
    inset: 0;
    opacity: 0;
    visibility: hidden;
    transition: opacity 0.3s ease, visibility 0.3s ease;

    &--active {
      opacity: 1;
      visibility: visible;
      z-index: 1;
    }
  }

  &__skeleton {
    position: absolute;
    inset: 0;
    background: #f0f0f0;
    display: flex;
    align-items: center;
    justify-content: center;
    z-index: 2;
  }

  &__skeleton-pulse {
    width: 60px;
    height: 60px;
    border: 4px solid #e0e0e0;
    border-top-color: #999;
    border-radius: 50%;
    animation: spin 1s linear infinite;
  }

  @keyframes spin {
    to {
      transform: rotate(360deg);
    }
  }

  @media (max-width: 768px) {
    height: 350px;
  }
}
</style>
