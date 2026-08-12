<template>
	<Teleport to="body" v-if="isMounted">
		<Transition name="search-overlay-fade">
			<div
				v-if="isOpen"
				class="search-overlay"
				:style="{
					...headerPresetVars,
					top: submenuTopOffset,
					backgroundColor: headerBackgroundColor,
					color: headerTextColor,
				}"
				role="dialog"
				aria-modal="true"
				:aria-label="dialogLabel"
			>
				<form role="search" class="search-overlay__form" @submit.prevent="submitSearch">
					<input
						ref="inputRef"
						v-model="keyword"
						type="search"
						name="keyword"
						class="search-overlay__input"
						enterkeyhint="search"
						autocomplete="off"
						maxlength="2048"
						:aria-label="dialogLabel"
						:placeholder="placeholder"
					/>
					<button type="submit" class="search-overlay__submit">
						{{ findLabel }}
					</button>
				</form>
			</div>
		</Transition>
	</Teleport>
</template>

<script setup lang="ts">
import { ref, watch, onUnmounted } from 'vue'
import { useMounted } from '@vueuse/core'
import { useInstantsiteJsApi } from '@lightspeed/crane'
import type { OverlayProps } from '../../types'
import {
	useHeaderDesign,
	useHeaderTranslations,
	useHeaderState,
	useSubmenuPosition,
} from '../../composables'
import { useEscapeKey } from '../../../../shared/composables'

const props = defineProps<OverlayProps>()

const { headerBackgroundColor, headerTextColor, headerPresetVars } = useHeaderDesign()
const { translate } = useHeaderTranslations()
const { closeSearchOverlay } = useHeaderState()
const isMounted = useMounted()
const { submenuTopOffset } = useSubmenuPosition(() => props.isOpen)

const instantsite = useInstantsiteJsApi()

const keyword = ref('')
const inputRef = ref<HTMLInputElement | null>(null)

const placeholder = translate('$label.search.placeholder', 'Search by category, brand, or keyword')
const findLabel = translate('$label.search.find_button', 'Find')
const dialogLabel = translate('$label.aria.search_dialog', 'Search')

function submitSearch() {
	const trimmed = keyword.value.trim()
	instantsite?.openSearchPage(trimmed || undefined)
	closeSearchOverlay()
}

watch(
	() => props.isOpen,
	(open) => {
		// eslint-disable-next-line no-restricted-globals -- SSR-safe: typeof check
		if (typeof document !== 'undefined') {
			// eslint-disable-next-line no-restricted-globals -- SSR-safe: typeof check
			document.body.style.overflow = open ? 'hidden' : ''
		}

		if (!open) return

		keyword.value = ''
		inputRef.value?.focus()
	},
	{ flush: 'post' },
)

onUnmounted(() => {
	// eslint-disable-next-line no-restricted-globals -- SSR-safe: inside onUnmounted
	document.body.style.overflow = ''
})

useEscapeKey(
	() => closeSearchOverlay(),
	() => props.isOpen,
)
</script>

<style scoped lang="scss">
@use '../../constants' as c;

.search-overlay {
	position: fixed;
	left: 0;
	right: 0;
	bottom: 0;
	z-index: c.$Z_INDEX_CATALOG_OVERLAY;
	display: flex;
	align-items: center;
	justify-content: center;
	padding: 16px;
	box-sizing: border-box;
	overflow-y: auto;
}

.search-overlay-fade-enter-active,
.search-overlay-fade-leave-active {
	transition: opacity 200ms ease;
}

.search-overlay-fade-enter-from,
.search-overlay-fade-leave-to {
	opacity: 0;
}

.search-overlay__form {
	display: flex;
	align-items: center;
	gap: 16px;
	width: 100%;
	max-width: 720px;

	@media (max-width: c.$MOBILE_MAX_WIDTH) {
		flex-direction: column;
		align-items: stretch;
		gap: 24px;
		max-width: 320px;
	}
}

.search-overlay__input {
	flex: 1;
	min-width: 0;
	background: transparent;
	border: none;
	border-bottom: 1px solid currentColor;
	padding: 8px 0;
	color: inherit;
	font-family: var(--header-font-family, var(--body-font-family));
	font-size: inherit;
	font-style: italic;
	outline: none;

	&::placeholder {
		color: inherit;
		opacity: 0.6;
		font-style: italic;
	}

	&::-webkit-search-cancel-button {
		appearance: none;
	}

	&:focus {
		border-bottom-color: currentColor;
	}
}

.search-overlay__submit {
	background-color: var(--bg-color);
	color: var(--fg-color);
	font-family: var(--header-font-family, var(--body-font-family));
	font-size: inherit;
	font-style: italic;
	font-weight: 700;
	border: none;
	height: 33px;
	padding: 0 32px;
	cursor: pointer;
	transition: opacity 0.2s ease;
	width: fit-content;
	align-self: center;
	margin-top: auto;

	&:hover {
		opacity: 0.85;
	}

	&:active {
		opacity: 0.7;
	}

	&:focus-visible {
		outline: 2px solid currentColor;
		outline-offset: 2px;
	}
}
</style>
