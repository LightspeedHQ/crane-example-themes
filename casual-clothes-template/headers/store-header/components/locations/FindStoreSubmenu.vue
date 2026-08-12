<template>
	<Teleport to="body" v-if="isMounted">
		<div
			v-show="isOpen"
			:style="headerPresetVars"
			:aria-hidden="!isOpen"
			:inert="!isOpen"
		>
			<div class="find-store-submenu-overlay" @click="closeFindStore" />
			<div
				class="find-store-submenu-overlay__content"
				:style="{ top: findStoreSubmenuTopOffset }"
				@mouseleave="onMouseLeave">
				<Locations />
			</div>
		</div>
	</Teleport>
</template>

<script setup lang="ts">
import { useMounted } from '@vueuse/core'
import type { OverlayProps } from '../../types'
import { useEscapeKey, useHeaderDesign, useSubmenuPosition, useHeaderViewport, useHeaderState } from '../../composables'
import Locations from './Locations.vue'

const props = defineProps<OverlayProps>()

const isMounted = useMounted()

const { isDesktop } = useHeaderViewport()
const { closeFindStore } = useHeaderState()

const onMouseLeave = () => {
	if (isDesktop.value) {
		closeFindStore()
	}
}

const { headerBackgroundColor, headerPresetVars } = useHeaderDesign()
const { submenuTopOffset: findStoreSubmenuTopOffset } = useSubmenuPosition(() => props.isOpen, '.header-top-row')

useEscapeKey(
	() => closeFindStore(),
	() => props.isOpen,
)
</script>

<style scoped lang="scss">
@use '../../constants' as c;

.find-store-submenu-overlay {
  position: fixed;
  inset: 0;
  background-color: transparent;
}

.find-store-submenu-overlay__content {
  position: fixed;
  left: 0;
  right: 0;
  background-color: v-bind(headerBackgroundColor);
  box-shadow: 0 8px 16px 0 rgba(0, 0, 0, 0.2);
  padding: 16px;
  z-index: c.$Z_INDEX_CATALOG_CONTENT;
  max-height: 80vh;
  overflow-y: auto;
}
</style>
