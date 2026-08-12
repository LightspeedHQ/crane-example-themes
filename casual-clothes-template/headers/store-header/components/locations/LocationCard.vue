<template>
	<div class="location-card">
		<h3 v-if="locationName" class="location-card__name">
			{{ locationName }}
		</h3>

		<div v-if="locationAddress" class="location-card__address">
			{{ locationAddress }}
			<a
				:href="createGoogleMapsLink(locationAddress)"
				target="_blank"
				rel="noopener noreferrer"
				class="location-card__map-link"
				:aria-label="getViewOnMapAriaLabel()"
				@click="$emit('close')">
				{{ viewOnMapText }}
			</a>
		</div>

		<div v-if="locationPhone" class="location-card__phone">
			<a :href="`tel:${locationPhone}`" class="location-card__phone-link" :aria-label="getCallAriaLabel()">
				{{ locationPhone }}
			</a>
		</div>

		<!-- separator -->
		<div class="location-card__separator"></div>
	</div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { useHeaderTranslations } from '../../composables'
import type { LocationCard } from '../../types/locations'

interface Props {
  location: LocationCard
  viewOnMapText: string
  isSelected?: boolean
}

const props = defineProps<Props>()
defineEmits<{
  (e: 'close'): void
}>()

const { translate } = useHeaderTranslations()

/**
 * Extract reactive text values from LocationCard
 * LocationCard contains reactive refs with .value properties
 */
const locationName = computed(() => props.location.location_name?.value || '')
const locationAddress = computed(() => props.location.location_address?.value || '')
const locationPhone = computed(() => props.location.location_phone?.value || '')

/**
 * Generate Google Maps search URL from address
 * Opens in new tab with external link
 */
const createGoogleMapsLink = (address: string) => {
	const encodedAddress = encodeURIComponent(address)
	return `https://www.google.com/maps/search/?api=1&query=${encodedAddress}`
}

/**
 * Get aria-label for map link
 */
const getViewOnMapAriaLabel = (): string => {
	if (locationName.value) {
		return translate('$label.aria.view_location_on_map', 'View {location} on map')
			.replace('{location}', locationName.value)
	}
	return props.viewOnMapText
}

/**
 * Get aria-label for phone link
 */
const getCallAriaLabel = (): string => {
	if (locationName.value) {
		return translate('$label.aria.call_location', 'Call {location}')
			.replace('{location}', locationName.value)
	}
	return translate('$label.aria.call_phone', 'Call {phone}')
		.replace('{phone}', locationPhone.value)
}
</script>

<style scoped lang="scss">
.location-card {
  display: flex;
  padding-bottom: 8px;
  flex-direction: column;
  align-items: flex-start;
  gap: 16px;
  align-self: stretch;

  &__name {
    color: inherit;
    font-feature-settings: 'liga' off, 'clig' off;
    font-family: var(--header-font-family, var(--body-font-family));
    font-size: inherit;
    font-style: inherit;
    font-weight: v-bind('isSelected ? "800" : "700"');
    line-height: 150%;
    margin: 0;
    transition: font-weight 0.2s ease;
  }

  &__address {
    color: inherit;
    font-feature-settings: 'liga' off, 'clig' off;
    font-family: var(--header-font-family, var(--body-font-family));
    font-size: inherit;
    font-style: inherit;
    font-weight: inherit;
    line-height: 150%;
    white-space: pre-line
  }

  &__map-link {
    color: inherit;
    text-decoration: underline;
    display: inline-block;
    margin-top: 4px;
    font-family: var(--header-font-family, var(--body-font-family));
    font-size: inherit;
    font-style: inherit;
    font-weight: inherit;
    line-height: 150%;
    cursor: pointer;
    transition: opacity 0.2s ease;

    &:hover {
      opacity: 0.8;
    }

    &:focus-visible {
      outline: 2px solid currentColor;
      outline-offset: 2px;
    }

    &:active {
      opacity: 0.6;
    }
  }

  &__phone {
    color: inherit;
    font-feature-settings: 'liga' off, 'clig' off;
    font-family: var(--header-font-family, var(--body-font-family));
    font-size: inherit;
    font-style: inherit;
    font-weight: inherit;
    line-height: 150%;
  }

  &__phone-link {
    color: inherit;
    text-decoration: none;
    transition: opacity 0.2s ease;

    &:hover {
      text-decoration: underline;
      opacity: 0.8;
    }

    &:focus-visible {
      outline: 2px solid currentColor;
      outline-offset: 2px;
    }

    &:active {
      opacity: 0.6;
    }
  }

  &__separator {
    width: 100%;
    height: 1px;
    background-color: currentColor;
    opacity: 0.16;
  }
}
</style>
