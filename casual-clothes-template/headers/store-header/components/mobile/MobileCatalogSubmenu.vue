<template>
	<FullScreenOverlay
		:is-open="isOpen"
		:background-color="headerBackgroundColor"
		:text-color="headerTextColor"
		:preset-vars="headerPresetVars"
		@close="closeCatalog"
	>
		<div class="mobile-catalog-submenu">
			<MobileCatalogSubmenuHeader />
			<MobileCatalogSubmenuGrid :category="category" />
		</div>
	</FullScreenOverlay>
</template>

<script setup lang="ts">
import type { CatalogOverlayProps } from '../../types/common'
import { FullScreenOverlay } from '../ui/overlay'
import MobileCatalogSubmenuHeader from './MobileCatalogSubmenuHeader.vue'
import MobileCatalogSubmenuGrid from './MobileCatalogSubmenuGrid.vue'
import { useHeaderDesign, useHeaderState } from '../../composables'

defineProps<CatalogOverlayProps>()

const { closeCatalog } = useHeaderState()
const { headerBackgroundColor, headerTextColor, headerPresetVars } = useHeaderDesign()
</script>

<style scoped lang="scss">
.mobile-catalog-submenu {
  display: flex;
  flex-direction: column;
  height: 100%;
  width: 100%;
}
</style>
