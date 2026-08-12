<template>
	<div class="customer-care">
		<div class="customer-care__info-column">
			<ContactInfo />
			<UsefulLinks />
		</div>
	</div>
</template>

<script setup lang="ts">
import ContactInfo from './ContactInfo.vue'
import UsefulLinks from './UsefulLinks.vue'
</script>

<style scoped lang="scss">
@use '../../constants' as c;

.customer-care {
  display: flex;
  align-items: flex-start;
  gap: clamp(16px, 5vw, 40px);
  padding: 24px;

  @media (max-width: c.$MOBILE_STORE_HEADER_BREAKPOINT) {
    flex-direction: column;
    gap: 32px;
    padding: 0 0 24px 0;
  }

  &__info-column,
  &__form-column {
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: flex-start;
    gap: 32px;
    flex: 1 1 0;
    width: unset;

    @media (max-width: c.$MOBILE_STORE_HEADER_BREAKPOINT) {
      width: 100%;
      flex: none;
    }
  }
}
</style>
