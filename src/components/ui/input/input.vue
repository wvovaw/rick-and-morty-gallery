<script setup lang="ts">
interface InputProps {
  modelValue?: string;
  placeholder?: string;
  disabled?: boolean;
}
defineProps<InputProps>();
defineEmits<{
  "update:modelValue": [payload: NonNullable<InputProps["modelValue"]>];
}>();
</script>

<template>
  <input
    type="text"
    :placeholder="placeholder"
    :disabled="disabled"
    :value="modelValue"
    @input="(e) => $emit('update:modelValue', (e.target as HTMLInputElement).value)"
  >
</template>

<style scoped>
input {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  height: 3rem;
  padding: 0 1rem;
  font-weight: 500;
  letter-spacing: 0.05em;
  color: hsl(var(--c-fg));
  background-color: hsl(var(--c-bg));
  border: 2px solid;
  border-color: hsl(var(--c-border));
  border-radius: 0.5rem;
  transition: background-color 0.2s, border-color 0.2s, border-size 0.2s;
}
input::placeholder {
  color: hsl(var(--c-fg-muted));
}
input:hover {
  border-color: hsl(var(--c-secondary));
}
input:focus {
  outline: none;
  box-shadow: 0 0 0 3px hsl(var(--c-secondary));
}
</style>
