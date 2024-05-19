<script setup lang="ts" generic="T">
import type { OptionHTMLAttributes } from "vue";

export type Options<T> = {
  /** Keys must be unique */
  key: string;
  label: string;
  value: T;
  disabled?: boolean;
} [];
// type Option<T> = Options<T>[number];

interface SelectProps {
  modelValue: T;
  options: Options<T>;
}
defineProps<SelectProps>();

const emit = defineEmits<{
  "update:modelValue": [v: T];
}>();

function handleChange(e: Event) {
  emit("update:modelValue", (e.target as OptionHTMLAttributes).value);
}
</script>

<template>
  <select :value="modelValue" @change="handleChange">
    <option
      v-for="option of options"
      :key="option.key"
      :value="option.value"
      :disabled="option.disabled"
    >
      {{ option.label }}
    </option>
  </select>
</template>

<style scoped>
select {
  display: inline-flex;
  align-items: center;
  min-width: max-content;
  justify-content: center;
  height: 3rem;
  padding: 0 1rem;
  font-weight: 500;
  letter-spacing: 0.05em;
  color: hsl(var(--c-fg));
  background-color: transparent;
  border: 2px solid;
  border-color: hsl(var(--c-border));
  border-radius: 0.5rem;
  transition: background-color 0.2s, border-color 0.2s, border-size 0.2s;
}

select::placeholder {
  color: hsl(var(--c-fg-muted));
}
select:hover {
  border-color: hsl(var(--c-secondary));
}
select:focus {
  outline: none;
  box-shadow: 0 0 0 3px hsl(var(--c-secondary));
}
</style>
