<template>
	<div v-if="logoDesign.visible && hasContent" class="logo-section">
		<a href="/" class="logo-link">
			<div
				v-if="logoContent.type === 'TEXT'"
				:class="[
					'logo-link__text-frame',
					{ 'logo-link__text-frame--no-border': !isFrameVisible },
				]"
				:style="logoFrameStyle"
			>
				<h1 class="logo-link__text" :style="logoTextVars">
					{{ logoTextContent }}
				</h1>
			</div>
			<div v-if="logoContent.type === 'IMAGE'" class="logo-link__image">
				<img
					v-if="hasImageContent"
					class="logo-link__image-content"
					:src="logoContent.image?.lowResolutionDesktopImage"
					alt="Logo Image"
				/>
			</div>
		</a>
	</div>
</template>

<script setup lang="ts">
import { useLogoElementContent, useLogoElementDesign, useVueBaseProps } from '@lightspeed/crane'
import { computed } from 'vue'
import { resolveToken, resolveColor, resolveTokenSize, isConcreteColorField } from '../../../../shared/utils/design-vars'
import { getColorHex, hasValidImage } from '../../../../shared/utils'
import type { Design } from '../../type.ts'

const logoContent = useLogoElementContent()
const logoDesign = useLogoElementDesign()
const { design: rawDesign } = useVueBaseProps<unknown, Design>()

const logoTextContent = computed(() => {
	if (logoContent.text !== undefined) {
		if (logoDesign.value.capitalization === 'all') {
			return logoContent.text.toUpperCase()
		}
		if (logoDesign.value.capitalization === 'small') {
			return logoContent.text.toLowerCase()
		}
	}
	return logoContent.text
})

const logoTextVars = computed(() => {
	const d = logoDesign.value
	const result: Record<string, string> = {
		letterSpacing: `${d.spacing ?? 0}px`,
	}
	const fontFamily = resolveToken(d.font ?? undefined)
	if (fontFamily) result['--logo-font-family'] = fontFamily
	// Gate color on rawDesign: when logo.color is a global.* token (e.g. 'global.color.title'),
	// IS resolves it to a concrete hex before we see it — rawDesign check prevents pinning.
	// Falls through to var(--fg-color) in CSS when no concrete override.
	if (isConcreteColorField(rawDesign.value?.logo, 'color')) {
		const color = resolveColor(d.color as Color | undefined)
		if (color) result['--logo-color'] = color
	}
	const fontSize = resolveTokenSize(d.size ?? undefined)
	if (fontSize) result['--logo-font-size'] = fontSize
	if (d.bold) result['--logo-font-weight'] = 'bold'
	if (d.italic) result['--logo-font-style'] = 'italic'
	return result
})

const isFrameVisible = computed<boolean>(() => Boolean(logoDesign.value.frame?.visible))

const logoFrameStyle = computed(() => ({
	borderStyle: isFrameVisible.value ? 'solid' : 'hidden',
	borderWidth: `${logoDesign.value.frame?.width ?? 1}px`,
	borderColor: getColorHex(logoDesign.value.frame?.color),
}))

const hasImageContent = computed(() => hasValidImage(logoContent.image?.lowResolutionDesktopImage))

const hasContent = computed(() => {
	// Check if there's text content
	if (
		logoContent.type === 'TEXT' &&
		logoTextContent.value &&
		logoTextContent.value.trim().length > 0
	) {
		return true
	}

	// Check if there's image content
	return logoContent.type === 'IMAGE' && hasImageContent.value
})
</script>

<style lang="scss" scoped>
.logo {
	&-section {
		max-height: 48px;
		height: 100%;
		max-width: 300px;
		text-align: center;
	}

	&-link {
		display: block;
		text-decoration: none;
		color: inherit;
		width: 100%;
		height: 100%;

		&:hover {
			text-decoration: none;
			color: inherit;
		}

		&:visited {
			color: inherit;
		}

		&__text-frame {
			text-align: center;
			padding: 0 12px;
			border-radius: 3px;

			&--no-border {
				text-align: left;
				padding: 0;
			}
		}

		&__text {
			font-family: var(--logo-font-family, var(--heading-font-family));
			color: var(--logo-color, var(--fg-color));
			font-size: var(--logo-font-size);
			font-weight: var(--logo-font-weight);
			font-style: var(--logo-font-style, var(--heading-font-style));
			overflow: hidden;
			text-overflow: ellipsis;
			white-space: nowrap;
			margin: 0;
		}

		&__image {
			height: 100%;
			display: flex;
			align-items: center;
		}

		&__image-content {
			max-height: 35px;
			max-width: 100%;
			object-fit: contain;
		}
	}
}
</style>
