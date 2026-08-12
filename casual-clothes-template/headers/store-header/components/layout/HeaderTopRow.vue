<template>
	<div class="header-top-row">
		<div class="header-top-row__left">
			<CustomLogo></CustomLogo>

			<NavigationMenu />
		</div>
		<div class="header-top-row__right">
			<LanguageSelector v-if="languageSwitcherShow.enabled" />
			<Account v-if="accountShow.enabled" />
			<Favorites v-if="wishlistShow.enabled" />
			<Cart v-if="cartShow.enabled" />
		</div>
	</div>
</template>

<script setup lang="ts">
import LanguageSelector from '../user/LanguageSelector.vue'
import Account from '../user/Account.vue'
import Favorites from '../user/Favorites.vue'
import Cart from '../user/Cart.vue'
import NavigationMenu from '../navigation/NavigationMenu.vue'
import { useHeaderToggles } from '../../composables'
import CustomLogo from './CustomLogo.vue'

const { languageSwitcherShow, accountShow, wishlistShow, cartShow } = useHeaderToggles()
</script>

<style scoped lang="scss">
@use '../../constants' as c;

.header-top-row {
	display: flex;
	justify-content: space-between;
	align-items: center;
	height: c.$HEADER_ROW_HEIGHT;
	/* Inherit background from parent header */
	gap: 1rem;
	min-height: c.$HEADER_ROW_HEIGHT;
}

.header-top-row__left {
	display: flex;
	align-items: center;
	gap: clamp(16px, 2rem, 32px);
	flex: 1;
}

.header-top-row__right {
	display: flex;
	align-items: center;
	gap: clamp(8px, 1rem, 16px);
	flex-shrink: 0;
}
</style>
