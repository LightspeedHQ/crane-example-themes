<template>
	<div class="catalog-skeleton" aria-hidden="true">
		<section>
			<div class="catalog-skeleton__line catalog-skeleton__line--title" />
			<div class="catalog-skeleton__line" />
			<div class="catalog-skeleton__categories">
				<div v-for="item in 4" :key="`category-${item}`"><span /><i /></div>
			</div>
		</section>
		<section>
			<div class="catalog-skeleton__line catalog-skeleton__line--title" />
			<div class="catalog-skeleton__line" />
			<div class="catalog-skeleton__toolbar" />
			<div class="catalog-skeleton__products">
				<div v-for="item in 12" :key="`product-${item}`"><span /><i /><i /></div>
			</div>
		</section>
	</div>
</template>

<style scoped lang="scss">
@keyframes catalog-shimmer { to { background-position-x: -200%; } }
.catalog-skeleton { width: 100%; max-width: 1408px; margin: 0 auto; padding: 64px 16px; }
.catalog-skeleton section + section { margin-top: 96px; }
.catalog-skeleton span,
.catalog-skeleton i,
.catalog-skeleton__line,
.catalog-skeleton__toolbar {
	display: block;
	background: linear-gradient(100deg, #ececec 20%, #f7f7f7 40%, #ececec 60%);
	background-size: 200% 100%;
	animation: catalog-shimmer 1.4s linear infinite;
}
.catalog-skeleton__line { width: 260px; height: 18px; margin-top: 16px; }
.catalog-skeleton__line--title { width: 340px; height: 40px; margin: 0; }
.catalog-skeleton__categories,
.catalog-skeleton__products { display: grid; grid-template-columns: repeat(4, 1fr); margin-top: 32px; gap: 32px 16px; }
.catalog-skeleton__categories span,
.catalog-skeleton__products span { width: 100%; aspect-ratio: 1; }
.catalog-skeleton__categories i,
.catalog-skeleton__products i { width: 70%; height: 14px; margin-top: 12px; }
.catalog-skeleton__toolbar { width: 100%; height: 58px; margin-top: 32px; }
@media (max-width: 800px) {
	.catalog-skeleton__categories,
	.catalog-skeleton__products { grid-template-columns: repeat(2, 1fr); }
}
@media (prefers-reduced-motion: reduce) {
	.catalog-skeleton span,
	.catalog-skeleton i,
	.catalog-skeleton__line,
	.catalog-skeleton__toolbar { animation: none; }
}
</style>
