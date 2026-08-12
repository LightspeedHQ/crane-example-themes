<template>
	<div
		@click="handleOpenClose"
	>
		<div ref="triggerRef">
			<slot name="trigger" />
		</div>

		<Teleport to="#portal-target" v-if="isMounted">
			<div
				ref="dropdownRef"
				v-if="isDropdownOpen"
				class="teleported"
				:style="{
					top: contentStyle?.top,
				}"
			>
				<slot name="content" />
			</div>
		</Teleport>
	</div>
</template>

<script setup lang="ts">
import { ref, shallowRef, nextTick, watch } from 'vue'
import { onClickOutside, useMounted, useWindowScroll } from '@vueuse/core'

const somePadding = 5

interface ContentCoordinates{
  top: `${number}px`
}

const isMounted = useMounted()

const isDropdownOpen = defineModel<boolean>({ default: false })

const triggerRef = ref<HTMLElement | null>(null)
const dropdownRef = ref<HTMLElement | null>(null)

const handleOpenClose = () => {
	if (isDropdownOpen.value) {
		isDropdownOpen.value = false
	}
	else {
		computeCoords()
		isDropdownOpen.value = true
	}
}

const handleClose = () => {
	isDropdownOpen.value = false
}

const contentStyle = shallowRef<ContentCoordinates | null>(null)
const scrollY = shallowRef<number>(0)

const computeCoords = () => {
	const trigger = triggerRef.value
	if (!trigger) return {}
	nextTick(()=>{
		const rect = trigger.getBoundingClientRect()

		contentStyle.value = {
			top: `${scrollY.value + rect.bottom + somePadding}px`,
		}
	})
}

const { y } = useWindowScroll()

watch(y, (val) => {
	scrollY.value = val
}, { immediate: true })

onClickOutside(
	dropdownRef,
	handleClose,
	{
		ignore: [triggerRef],
	})
</script>

<style scoped lang="scss">
.teleported{
  position: absolute;
  width: 100%;
}
</style>
