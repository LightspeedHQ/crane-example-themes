<template>
	<div class="error-state">
		<div class="error-state__content">
			<p class="error-state__title">{{ title }}</p>
			<p class="error-state__message">{{ message || defaultMessage }}</p>
		</div>
	</div>
</template>

<script setup lang="ts">
interface Props {
	title: string;
	message?: string | null;
	defaultMessage: string;
}

defineProps<Props>()
</script>

<style scoped>
.error-state {
	display: flex;
	justify-content: center;
	align-items: center;
	padding: 60px 20px;
	min-height: 300px;
}

.error-state__content {
	text-align: center;
	max-width: 500px;
}

.error-state__title {
	font-size: 24px;
	font-weight: 600;
	color: #d32f2f;
	margin: 0 0 12px 0;
}

.error-state__message {
	font-size: 16px;
	color: var(--fg-muted-color);
	line-height: 1.5;
	margin: 0;
}
</style>
