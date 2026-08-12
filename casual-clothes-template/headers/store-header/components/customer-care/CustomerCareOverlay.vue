<template>
	<div>
		<CustomerCareSubmenu
			v-if="isOpen && !isMobile"
			:is-open="isOpen"
		/>

		<MobileCustomerCareSubmenu
			v-if="isMobile && isOpen"
			:is-open="isOpen"
		/>
	</div>
</template>

<script setup lang="ts">
import CustomerCareSubmenu from './CustomerCareSubmenu.vue'
import MobileCustomerCareSubmenu from '../mobile/MobileCustomerCareSubmenu.vue'
import type { OverlayProps } from '../../types/common'
import { useHeaderViewport, useEscapeKey, useHeaderState } from '../../composables'

const props = defineProps<OverlayProps>()

const { isMobile } = useHeaderViewport()
const { closeCustomerCare } = useHeaderState()

useEscapeKey(
	() => closeCustomerCare(),
	() => props.isOpen,
)
</script>
