<template>
	<section class="section">
		<div class="section__wrapper">
			<slot />
		</div>
	</section>
</template>

<style lang="scss" scoped>
.section {
	padding: 32px 8px;
	background: var(--section-background, var(--bg-color));

	&__blank_space {
		height: 40px;
	}

	@media screen and (min-width: 768px) {
		padding: 48px 16px;
	}

	&__wrapper {
		max-width: 1440px;
		margin: 0 auto;
	}
}
</style>
<script setup lang="ts"></script>