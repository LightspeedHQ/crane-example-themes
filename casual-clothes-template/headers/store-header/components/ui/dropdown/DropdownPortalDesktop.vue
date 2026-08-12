<template>
	<div
		@mouseenter="handleHoverTrigger"
		@mouseleave="handleUnHoverTrigger">
		<div
			ref="triggerRef"
			@focusin="handleTriggerFocusIn"
			@focusout="handleFocusOut"
			@keydown="handleTriggerKeydown">
			<slot
				name="trigger"
			/>
		</div>

		<Teleport to="#portal-target" v-if="isMounted">
			<div
				v-show="isDropdownOpen"
				class="bridge"
				:style="{
					top: bridgeStyle?.top,
					'height':  `${somePadding}px`,
					width: '100%'
				}"
				@mouseenter="handleHoverBridge"
				@mouseleave="handleUnHoverBridge"
			/>
			<div
				ref="contentRef"
				v-show="isDropdownOpen"
				class="teleported"
				:style="{
					top: contentStyle?.top,
				}"
				@mouseenter="handleHoverContent"
				@mouseleave="handleUnHoverContent"
				@focusout="handleFocusOut"
				@keydown="handleContentKeydown"
			>
				<slot name="content" />
			</div>
		</Teleport>
	</div>
</template>

<script setup lang="ts">
import { ref, shallowRef, nextTick, watch } from 'vue'
import { useMounted, useDebounceFn, useWindowScroll } from '@vueuse/core'
import { useEscapeKey } from '../../../../../shared/composables'

const isMounted = useMounted()

const somePadding = 5

interface ContentCoordinates {
  top: `${number}px`
}

const isDropdownOpen = defineModel<boolean>({ default: false })

const triggerRef = ref<HTMLElement | null>(null)
const contentRef = ref<HTMLElement | null>(null)

const isHoveringTrigger = ref(false)
const isHoveringContent = ref(false)
const isHoveringBridge = ref(false)

const handleHoverTrigger = () => isHoveringTrigger.value = true
const handleUnHoverTrigger = () => isHoveringTrigger.value = false
const handleHoverBridge = () => isHoveringBridge.value = true
const handleUnHoverBridge = () => isHoveringBridge.value = false
const handleHoverContent = () => isHoveringContent.value = true
const handleUnHoverContent = () => isHoveringContent.value = false

const contentStyle = shallowRef<ContentCoordinates | null>(null)
const bridgeStyle = shallowRef<ContentCoordinates | null>(null)
const scrollY = shallowRef<number>(0)
const computeCoords = () => {
	const trigger = triggerRef.value
	if (!trigger) return

	nextTick(() => {
		const rect = trigger.getBoundingClientRect()
		bridgeStyle.value = { top: `${scrollY.value + rect.bottom}px` }
		contentStyle.value = { top: `${scrollY.value + rect.bottom + somePadding}px` }
	})
}

const { y } = useWindowScroll()

watch(y, (val) => {
	scrollY.value = val
}, { immediate: true })

const closeDropdownDebounced = useDebounceFn(() => {
	if (!isHoveringTrigger.value && !isHoveringContent.value && !isHoveringBridge.value) {
		isDropdownOpen.value = false
	}
}, 30)

const openDropdownDebounced = useDebounceFn(() => {
	if (!isDropdownOpen.value && (isHoveringTrigger.value || isHoveringContent.value || isHoveringBridge.value)) {
		isDropdownOpen.value = true
		computeCoords()
	}
}, 50)

watch([isHoveringTrigger, isHoveringContent, isHoveringBridge], () => {
	openDropdownDebounced()
	closeDropdownDebounced()
})

// Keyboard focus support
const focusableSelector = 'a[href], button:not([disabled])'

// Open on focusin, focus stays on the trigger link
const handleTriggerFocusIn = () => {
	if (!isDropdownOpen.value) {
		isDropdownOpen.value = true
		computeCoords()
	}
}

// Close when focus leaves both trigger and content
const handleFocusOut = (event: FocusEvent) => {
	const relatedTarget = event.relatedTarget as Node | null
	if (triggerRef.value?.contains(relatedTarget)) return
	if (contentRef.value?.contains(relatedTarget)) return
	isDropdownOpen.value = false
}

// Tab from trigger → move focus into first content link
const handleTriggerKeydown = (event: KeyboardEvent) => {
	if (event.key !== 'Tab' || event.shiftKey || !isDropdownOpen.value) return
	const firstFocusable = contentRef.value?.querySelector<HTMLElement>(focusableSelector)
	if (firstFocusable) {
		event.preventDefault()
		firstFocusable.focus()
	}
}

// Find the next focusable element in the document after the trigger
const focusNextAfterTrigger = () => {
	// eslint-disable-next-line no-restricted-globals -- SSR-safe: called from keydown handler
	if (typeof document === 'undefined') return
	// eslint-disable-next-line no-restricted-globals -- SSR-safe: guarded above
	const allFocusables = Array.from(document.querySelectorAll<HTMLElement>(focusableSelector))
		.filter(el => (el.offsetWidth > 0 || el.offsetHeight > 0) && !contentRef.value?.contains(el))
	const triggerFocusables = allFocusables.filter(el => triggerRef.value?.contains(el))
	const lastTrigger = triggerFocusables[triggerFocusables.length - 1]
	// Guard: if the trigger slot contains no focusable elements, do nothing
	if (!lastTrigger) return
	const lastTriggerIdx = allFocusables.indexOf(lastTrigger)
	if (lastTriggerIdx === -1) return
	allFocusables[lastTriggerIdx + 1]?.focus()
}

// Shift+Tab from first content link → back to trigger
// Tab from last content link → next menu item after trigger
const handleContentKeydown = (event: KeyboardEvent) => {
	if (event.key !== 'Tab') return
	// eslint-disable-next-line no-restricted-globals -- SSR-safe: called from keydown handler
	if (typeof document === 'undefined') return
	const focusables = Array.from(
		contentRef.value?.querySelectorAll<HTMLElement>(focusableSelector) ?? [],
	)
	if (!focusables.length) return
	// eslint-disable-next-line no-restricted-globals -- SSR-safe: guarded above
	const active = document.activeElement
	if (event.shiftKey && active === focusables[0]) {
		event.preventDefault()
		triggerRef.value?.querySelector<HTMLElement>(focusableSelector)?.focus()
	} else if (!event.shiftKey && active === focusables[focusables.length - 1]) {
		event.preventDefault()
		isDropdownOpen.value = false
		focusNextAfterTrigger()
	}
}

useEscapeKey(
	() => {
		isDropdownOpen.value = false
		triggerRef.value?.querySelector<HTMLElement>(focusableSelector)?.focus()
	},
	() => isDropdownOpen.value,
)
</script>

<style scoped lang="scss">
.teleported{
  position: absolute;
  width: 100%;
}
.bridge{
  position: absolute;
  width: 100%;
}
</style>
