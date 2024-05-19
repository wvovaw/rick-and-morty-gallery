<template>
  <div class="empty-state">
    <div class="empty-state__text">
      <slot />
    </div>
  </div>
</template>

<style scoped>
.empty-state {
  width: 100%;
  display: grid;
  place-content: center;
  padding: 1rem;
}

.empty-state__text {
  font-size: 1.6rem;
  margin-inline: auto;
}
</style>
