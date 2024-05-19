<script setup lang="ts">
import { computed, ref } from "vue";

const props = withDefaults(defineProps<{
  position: "left" | "right" | "top" | "bottom";
  visibleMarginPx?: number;
  hiddenMarginPx?: number;
  offsetPercentage?: number;
}>(), {
  offsetPercentage: 50,
  visibleMarginPx: 0,
  hiddenMarginPx: 0,
});

const isVisible = ref(false);

function togglePanel() {
  isVisible.value = !isVisible.value;
}

const pannelStyleAttr = computed(() => {
  const offset = `${props.offsetPercentage}%`;
  switch (props.position) {
    case "left":
      return {
        top: offset,
        transform: isVisible.value ? "translateY(-50%) translateX(0)" : `translateY(-50%) translateX(calc(-100% + ${props.hiddenMarginPx}px))`,
        marginLeft: isVisible.value ? `${props.visibleMarginPx}px` : "0",
      };
    case "right":
      return {
        top: offset,
        transform: isVisible.value ? "translateY(-50%) translateX(0)" : `translateY(-50%) translateX(calc(100% - ${props.hiddenMarginPx}px))`,
        marginRight: isVisible.value ? `${props.visibleMarginPx}px` : "0",
      };
    case "top":
      return {
        left: offset,
        transform: isVisible.value ? "translateX(-50%) translateY(0)" : `translateX(-50%) translateY(calc(-100% + ${props.hiddenMarginPx}px))`,
        marginTop: isVisible.value ? `${props.visibleMarginPx}px` : "0",
      };
    case "bottom":
      return {
        left: offset,
        transform: isVisible.value ? "translateX(-50%) translateY(0)" : `translateX(-50%) translateY(calc(100% - ${props.hiddenMarginPx}px))`,
        marginBottom: isVisible.value ? `${props.visibleMarginPx}px` : "0",
      };
    default:
      throw new Error("Wrong floating-pannel position prop");
  }
});
</script>

<template>
  <div class="floating-panel" :class="[position]" :style="pannelStyleAttr">
    <button class="handle" :class="position" @click="togglePanel">
      <slot name="handle-icon" />
    </button>
    <div class="content" :tabindex="isVisible ? 0 : -1">
      <slot />
    </div>
  </div>
</template>

<style scoped>
.floating-panel {
  --handle-size: 40px;
  --handle-offset: calc((var(--handle-size) * -1) + (var(--handle-size) / 2));

  position: fixed;
  transition: transform 0.2s ease-in-out;
  z-index: 1000;
}
.floating-panel.left { left: 0; }
.floating-panel.right { right: 0; }
.floating-panel.top { top: 0; }
.floating-panel.bottom { bottom: 0; }

.handle {
  cursor: pointer;
  position: absolute;
  width: var(--handle-size);
  height: var(--handle-size);
  padding: 12px;
  border-radius: 100%;
  background-color: hsl(var(--c-bg2));
  box-shadow: var(--box-shadow-md);
}
.handle.left {
  right: var(--handle-offset);
  top: 50%;
  transform: translateY(-50%);
}
.handle.right {
  left: var(--handle-offset);
  top: 50%;
  transform: translateY(-50%);
}
.handle.top {
  bottom: var(--handle-offset);
  left: 50%;
  transform: translateX(-50%);
}
.handle.bottom {
  top: var(--handle-offset);
  left: 50%;
  transform: translateX(-50%);
}
</style>
