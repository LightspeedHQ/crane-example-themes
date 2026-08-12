<template>
	<div class="mobile-dropdown">
		<button
			type="button"
			class="mobile-dropdown__trigger"
			@click.prevent="toggleOpen"
			:aria-expanded="isOpen"
			aria-haspopup="true"
		>
			<slot name="trigger" />
		</button>

		<div v-if="isOpen" class="mobile-dropdown__overlay" :style="overlayStyle">
			<div class="mobile-dropdown__header">
				<button
					class="mobile-dropdown__close"
					aria-label="Close dropdown"
					@click="close"
				>
					<span class="mobile-dropdown__close-icon" v-html="CloseIcon"></span>
				</button>
			</div>

			<div class="mobile-dropdown__content">
				<slot />
			</div>
		</div>
	</div>
</template>

<script setup lang="ts">
import { ref, onMounted, onBeforeUnmount, computed } from 'vue'
import CloseIcon from '../../../../../shared/assets/close-icon.svg?raw'
import { useClickOutside } from '../../../../../shared/composables'

defineSlots<{ trigger(): unknown; default(): unknown }>()

interface Props {
  backgroundColor?: string;
  textColor?: string;
}

const props = defineProps<Props>()

const overlayStyle = computed(() => ({
	backgroundColor: props.backgroundColor,
	color: props.textColor,
}))

const isOpen = ref(false)

const toggleOpen = () => {
	isOpen.value = !isOpen.value
}

const close = () => {
	isOpen.value = false
}

// Keyboard handler
const onKeydown = (e: KeyboardEvent) => {
	if (e.key === 'Escape') close()
}

// Use click-outside composable
useClickOutside(
	null,
	(e: MouseEvent) => {
		const target = e.target as HTMLElement
		if (target.closest('.mobile-dropdown__overlay') && !target.closest('.mobile-dropdown__content')) {
			close()
		}
	},
	() => isOpen.value,
)

onMounted(() => {
	// eslint-disable-next-line no-restricted-globals -- SSR-safe: inside onMounted
	document.addEventListener('keydown', onKeydown)
})

onBeforeUnmount(() => {
	// eslint-disable-next-line no-restricted-globals -- SSR-safe: inside onBeforeUnmount
	document.removeEventListener('keydown', onKeydown)
})
</script>

<style scoped>
.mobile-dropdown {
  width: 100%;
}

.mobile-dropdown__trigger {
  /* Inherit color and font from parent */
  color: inherit;
  font-family: inherit;
  font-size: inherit;
  font-style: normal;
  font-weight: 400;
  line-height: 150%;
  letter-spacing: -0.08px;
  cursor: pointer;
  display: flex;
  align-items: center;
  height: 100%;
  background: none;
  border: none;
  padding: 0;
}

.mobile-dropdown__trigger:hover {
  opacity: 0.8;
}

.mobile-dropdown__trigger:focus-visible {
  outline: 2px solid currentColor;
  outline-offset: 2px;
}

.mobile-dropdown__overlay {
  position: fixed;
  inset: 0;
  /* Default background and color, can be overridden by inline styles */
  background-color: var(--bg-color);
  z-index: 1000;
  display: flex;
  flex-direction: column;
}

@keyframes slideUp {
  from {
    transform: translateY(100%);
  }
  to {
    transform: translateY(0);
  }
}

.mobile-dropdown__header {
  display: flex;
  align-items: center;
  justify-content: flex-end;
  padding: 16px;
  flex-shrink: 0;
}

.mobile-dropdown__close {
  background: none;
  border: none;
  cursor: pointer;
  padding: 8px;
  border-radius: 4px;
  transition: background-color 0.2s ease;
  color: inherit;
  display: flex;
  align-items: center;
  justify-content: center;
}

.mobile-dropdown__close:hover {
  background-color: rgba(0, 0, 0, 0.05);
}

.mobile-dropdown__close:focus-visible {
  outline: 2px solid currentColor;
  outline-offset: 2px;
}

.mobile-dropdown__close-icon {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 24px;
  height: 24px;
}

.mobile-dropdown__close-icon :deep(svg) {
  width: 100%;
  height: 100%;
  color: inherit;
}

.mobile-dropdown__content {
  flex: 1;
  overflow-y: auto;
  padding: 16px;
  display: flex;
  flex-direction: column;
  gap: 12px;
}
</style>
