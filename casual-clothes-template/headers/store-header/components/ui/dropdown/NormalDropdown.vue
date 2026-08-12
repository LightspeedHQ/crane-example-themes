<template>
	<div
		@click="handleOpenClose"
	>
		<div ref="triggerRef">
			<slot name="trigger" :isDropdownOpen="isDropdownOpen"/>
		</div>

		<Teleport to="#portal-target" v-if="isMounted">
			<div
				ref="dropdownRef"
				v-if="isDropdownOpen"
				:style="{
					position:'absolute',
					top: contentStyle?.top,
					left: contentStyle?.left
				}"
			>
				<slot name="content" />
			</div>
		</Teleport>
	</div>
</template>

<script setup lang="ts">
import { ref, shallowRef, nextTick, watch, onMounted } from 'vue'
import { onClickOutside, useMounted, useWindowScroll } from '@vueuse/core'

interface ContentCoordinates{
  top: `${number}px`
  left: `${number}px`
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
			top: `${scrollY.value + rect.bottom}px`,
			left: `${rect.left}px`,
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

watch(isDropdownOpen, (newValue) => {
	// SSR guard: document is not available on server
	// eslint-disable-next-line no-restricted-globals -- SSR-safe: typeof check
	if (typeof document === 'undefined') return

	// eslint-disable-next-line no-restricted-globals -- SSR-safe: guarded above
	const borderBottom = document.querySelector('.ins-tile-clicked-border__bottom') as HTMLElement

	if (borderBottom) {
		borderBottom.style.display = newValue ? 'none' : ''
	}
})

//Preview Hack, Important - don't remove
onMounted(() => {
	// eslint-disable-next-line no-restricted-globals -- SSR-safe: inside onMounted
	const element = document.querySelector('[tile-type="CUSTOM_HEADER"]') as HTMLElement

	if (element) {
		element.style.zIndex = '4'
	}
})
</script>

<style lang="scss">
.ins-tile--hovered{
  z-index: 0 !important;
}
</style>
