<script setup lang="ts">
import { computed } from "vue";

const props = defineProps<{
  status: string | undefined;
}>();

type Status = "alive" | "dead" | "unknown";

const resolvedStatus = computed<Status>(() => props.status ? props.status.toLowerCase() as Status : "unknown");
</script>

<template>
  <div class="status">
    <div
      class="status__indicator" :class="{
        'status__indicator--alive': resolvedStatus === 'alive',
        'status__indicator--dead': resolvedStatus === 'dead',
        'status__indicator--unknown': resolvedStatus === 'unknown',
      }"
    />
    <span class="status__label"> {{ resolvedStatus }}</span>
  </div>
</template>

<style scoped>
.status {
  --color-alive: hsl(var(--c-green));
  --color-dead: hsl(var(--c-red));
  --color-unknown: hsl(var(--c-border));
  display: flex;
  align-items: center;
  gap: 6px;
}
.status__indicator {
  width: 15px;
  height: 15px;
  border-radius: 100%;
  border: 1px solid hsl(var(--c-border));
}
.status__indicator--alive {
  background-color: var(--color-alive);
}
.status__indicator--dead {
  background-color: var(--color-dead);
}
.status__indicator--unknown {
  background-color: var(--color-unknown);
}
.status__label {
  text-transform: uppercase;
  font-size: 0.8rem;
  font-weight: 200;
}
</style>
