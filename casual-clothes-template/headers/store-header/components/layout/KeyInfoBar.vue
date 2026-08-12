<template>
	<div v-show="messageDesign?.visible !== false" class="key-info-bar" :style="contentVars">
		{{ message }}
	</div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import {
	useInputboxElementContent,
	useTextElementDesign,
	useBackgroundElementDesign,
	useVueBaseProps,
} from '@lightspeed/crane'
import { Content, Design } from '../../type.ts'
import { createTextVars, createBackgroundVars } from '../../../../shared/utils/design-vars'

const { design: rawDesign } = useVueBaseProps<unknown, Design>()
const messageContent = useInputboxElementContent<Content>('KeyInfoBarContent')
const messageDesign = useTextElementDesign<Design>('KeyInfoBarText') as TextDesignData
const backgroundDesign = useBackgroundElementDesign<Design>(
	'KeyInfoBarBackground',
) as BackgroundDesignData

const message = computed(() => {
	return messageContent.value
})

const contentVars = computed(() =>
	Object.fromEntries([
		...createTextVars('key-info-bar', messageDesign, rawDesign.value?.KeyInfoBarText),
		...createBackgroundVars(
			'key-info-bar',
			backgroundDesign,
			rawDesign.value?.KeyInfoBarBackground,
		),
	]),
)
</script>

<style scoped lang="scss">
@use '../../constants' as c;

.key-info-bar {
	display: flex;
	padding: 8px 32px;
	justify-content: center;
	align-items: center;
	align-self: stretch;
	gap: 9px;
	width: 100%;
	background: var(--key-info-bar-background);
	font-family: var(--key-info-bar-font-family, var(--body-font-family));
	color: var(--key-info-bar-color);
	font-size: var(--key-info-bar-font-size, var(--body-3-font-size));
	font-weight: var(--key-info-bar-font-weight, var(--body-font-weight));
	font-style: var(--key-info-bar-font-style, var(--body-font-style));
	line-height: 150%;
	font-feature-settings:
		'liga' off,
		'clig' off;
	text-align: center;
}

@media (max-width: c.$MOBILE_MAX_WIDTH) {
	.key-info-bar {
		padding: 8px;
	}
}
</style>
