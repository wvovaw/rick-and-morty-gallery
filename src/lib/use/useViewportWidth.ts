import { onMounted, onUnmounted, ref } from "vue";

export function useViewportWidth() {
  const width = ref(window.innerWidth);

  const updateWidth = () => {
    width.value = window.innerWidth;
  };

  onMounted(() => {
    window.addEventListener("resize", updateWidth);
  });

  onUnmounted(() => {
    window.removeEventListener("resize", updateWidth);
  });

  return { width };
}
