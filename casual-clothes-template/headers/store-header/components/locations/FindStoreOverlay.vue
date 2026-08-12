<template>
	<div>
		<FindStoreSubmenu
			v-if="hasBeenOpened && !isMobile"
			v-show="isOpen"
			:is-open="isOpen"
		/>

		<MobileFindStoreSubmenu
			v-if="hasBeenOpened && isMobile"
			v-show="isOpen"
			:is-open="isOpen"
		/>
	</div>
</template>

<script setup lang="ts">
import { ref, watch } from 'vue'
import FindStoreSubmenu from './FindStoreSubmenu.vue'
import MobileFindStoreSubmenu from '../mobile/MobileFindStoreSubmenu.vue'
import type { OverlayProps } from '../../types/common'
import { useHeaderViewport, useEscapeKey, useHeaderState } from '../../composables'

const props = defineProps<OverlayProps>()

const { isMobile } = useHeaderViewport()
const { closeFindStore } = useHeaderState()

const hasBeenOpened = ref(false)
watch(
	() => props.isOpen,
	(val) => {
		if (val) hasBeenOpened.value = true
	},
	{ immediate: true },
)

useEscapeKey(
	() => closeFindStore(),
	() => props.isOpen,
)
</script>
