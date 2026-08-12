<template>
	<div class="empty-state">
		<div class="empty-state__content">
			<p class="empty-state__title">{{ title }}</p>
			<p v-if="message" class="empty-state__message">{{ message }}</p>
		</div>
	</div>
</template>

<script setup lang="ts">
interface Props {
	title: string;
	message?: string;
}

defineProps<Props>()
</script>

<style scoped>
.empty-state {
	display: flex;
	justify-content: center;
	align-items: center;
	padding: 60px 20px;
	min-height: 300px;
}

.empty-state__content {
	text-align: center;
	max-width: 500px;
}

.empty-state__title {
	font-size: 24px;
	font-weight: 600;
	color: var(--fg-color);
	margin: 0 0 12px 0;
}

.empty-state__message {
	font-size: 16px;
	color: var(--fg-muted-color);
	line-height: 1.5;
	margin: 0;
}
</style>
