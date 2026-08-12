<template>
	<div>
		<CatalogSubmenu
			v-if="isOpen && !isMobile"
			:is-open="isOpen"
			:category="category"
		/>

		<MobileCatalogSubmenu
			v-if="isMobile && isOpen"
			:is-open="isOpen"
			:category="category"
		/>
	</div>
</template>

<script setup lang="ts">
import CatalogSubmenu from './CatalogSubmenu.vue'
import MobileCatalogSubmenu from '../mobile/MobileCatalogSubmenu.vue'
import type { CatalogOverlayProps } from '../../types/common'
import { useHeaderViewport, useEscapeKey, useHeaderState } from '../../composables'

const props = defineProps<CatalogOverlayProps>()

const { isMobile } = useHeaderViewport()
const { closeCatalog } = useHeaderState()

// Handle Escape key to close overlay
useEscapeKey(
	() => closeCatalog(),
	() => props.isOpen,
)
</script>
