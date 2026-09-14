<template>
	<div class="category-skeleton" aria-hidden="true">
		<div class="category-skeleton__line category-skeleton__line--title" />
		<div class="category-skeleton__line" />
		<div class="category-skeleton__toolbar" />
		<div class="category-skeleton__products">
			<div v-for="item in 12" :key="item"><span /><i /><i /></div>
		</div>
	</div>
</template>

<style scoped lang="scss">
@keyframes category-shimmer { to { background-position-x: -200%; } }
.category-skeleton { width: 100%; max-width: 1408px; margin: 0 auto; padding: 0 16px 64px; }
.category-skeleton span,
.category-skeleton i,
.category-skeleton__line,
.category-skeleton__toolbar {
	display: block;
	background: linear-gradient(100deg, #ececec 20%, #f7f7f7 40%, #ececec 60%);
	background-size: 200% 100%;
	animation: category-shimmer 1.4s linear infinite;
}
.category-skeleton__line { width: 280px; height: 18px; margin-top: 16px; }
.category-skeleton__line--title { width: 200px; height: 40px; margin: 0; }
.category-skeleton__toolbar { width: 100%; height: 58px; margin-top: 32px; }
.category-skeleton__products { display: grid; grid-template-columns: repeat(4, 1fr); margin-top: 32px; gap: 32px 16px; }
.category-skeleton__products span { width: 100%; aspect-ratio: 1; }
.category-skeleton__products i { width: 70%; height: 14px; margin-top: 12px; }
@media (max-width: 800px) { .category-skeleton__products { grid-template-columns: repeat(2, 1fr); } }
@media (max-width: 520px) { .category-skeleton__products { grid-template-columns: 1fr; } }
@media (prefers-reduced-motion: reduce) {
	.category-skeleton span,
	.category-skeleton i,
	.category-skeleton__line,
	.category-skeleton__toolbar { animation: none; }
}
</style>
