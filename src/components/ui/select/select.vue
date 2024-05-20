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
  appearance: none;
  display: inline-flex;
  align-items: center;
  min-width: max-content;
  justify-content: center;
  height: 3rem;
  padding: 0 1rem;
  padding-right: 30px; /* arrow space */
  font-weight: 500;
  letter-spacing: 0.05em;
  color: hsl(var(--c-fg));
  background-color: hsl(var(--c-bg));
  background-image: url(data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIxZW0iIGhlaWdodD0iMWVtIiB2aWV3Qm94PSIwIDAgMjQgMjQiPjxwYXRoIGZpbGw9IiNiNGIxYjEiIGQ9Ik0xMS40NzUgMTQuNDc1TDcuODUgMTAuODVxLS4wNzUtLjA3NS0uMTEyLS4xNjJUNy43IDEwLjVxMC0uMi4xMzgtLjM1VDguMiAxMGg3LjZxLjIyNSAwIC4zNjMuMTV0LjEzNy4zNXEwIC4wNS0uMTUuMzVsLTMuNjI1IDMuNjI1cS0uMTI1LjEyNS0uMjUuMTc1VDEyIDE0Ljd0LS4yNzUtLjA1dC0uMjUtLjE3NSIvPjwvc3ZnPg==);
  background-repeat: no-repeat;
  background-position: right 5px center;
  background-size: 30px;
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

option {
  background-color: var(--c-bg);
  color: var(--c-fg);
}
</style>
