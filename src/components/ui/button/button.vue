<script setup lang="ts">
withDefaults(defineProps<{
  as?: string;
}>(), {
  as: "button",
});
</script>

<template>
  <component :is="as">
    <slot />
  </component>
</template>

<style scoped>
button {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  height: 3rem;
  padding: 0 1.5rem;
  font-weight: 500;
  letter-spacing: 0.05em;
  color: hsl(var(--c-fg));
  background-color: hsl(var(--c-primary));
  border-radius: 0.5rem;
  transition: filter 0.2s;
}

button:hover {
  filter: hue-rotate(45deg);
}
</style>
