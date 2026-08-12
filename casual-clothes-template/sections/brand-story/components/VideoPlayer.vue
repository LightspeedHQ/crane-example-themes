<template>
	<ClientOnly>
		<div
			:id="playerId"
			class="brand-story__video-player"
			:class="{ 'brand-story__video-player--no-controls': !hasPlayedOnce }"
		>
			<!-- YouTube player will be inserted here -->
		</div>
	</ClientOnly>
</template>

<script setup lang="ts">
defineProps<{
  playerId: string
  hasPlayedOnce: boolean
}>()
</script>

<style scoped lang="scss">
.brand-story__video-player {
  width: 100%;
  height: 100%;

  &--no-controls {
    pointer-events: none;
  }

  & :deep(iframe) {
    /* Note: YouTube logo cannot be fully removed per YouTube's embedding policy */
    /* modestbranding: 1 parameter reduces but doesn't eliminate branding */
  }

  & :deep(.ytp-settings-button),
  & :deep(.ytp-youtube-button) {
    display: none !important;
  }
}
</style>
