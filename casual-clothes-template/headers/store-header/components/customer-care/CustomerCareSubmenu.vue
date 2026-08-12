<template>
	<Teleport to="body" v-if="isMounted">
		<div v-if="isOpen" :style="headerPresetVars">
			<div class="customer-care-submenu-overlay" @click="closeCustomerCare" />
			<div
				class="customer-care-submenu-overlay__content"
				:style="{ top: customerCareSubmenuTopOffset }"
				@mouseleave="onMouseLeave">
				<CustomerCare />
			</div>
		</div>
	</Teleport>
</template>

<script setup lang="ts">
import { useMounted } from '@vueuse/core'
import type { OverlayProps } from '../../types'
import { useEscapeKey, useHeaderDesign, useSubmenuPosition, useHeaderViewport, useHeaderState } from '../../composables'
import CustomerCare from './CustomerCare.vue'

const props = defineProps<OverlayProps>()

const isMounted = useMounted()

const { isDesktop } = useHeaderViewport()
const { closeCustomerCare } = useHeaderState()

const onMouseLeave = () => {
	if (isDesktop.value) {
		closeCustomerCare()
	}
}

const { headerBackgroundColor, headerPresetVars } = useHeaderDesign()
const { submenuTopOffset: customerCareSubmenuTopOffset } = useSubmenuPosition(() => props.isOpen, '.header-top-row')

useEscapeKey(
	() => closeCustomerCare(),
	() => props.isOpen,
)
</script>

<style scoped lang="scss">
@use '../../constants' as c;

.customer-care-submenu-overlay {
  position: fixed;
  inset: 0;
  background-color: transparent;
}

.customer-care-submenu-overlay__content {
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
