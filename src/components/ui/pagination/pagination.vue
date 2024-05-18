<script setup lang="ts">
import { UIButton } from "@/components/ui";

interface PaginationProps {
  currentPage: number;
  totalPages: number;
}
const props = defineProps<PaginationProps>();
const emit = defineEmits<{
  "update:currentPage": [v: number];
}>();

function goToPreviousPage() {
  if (props.currentPage > 1)
    emit("update:currentPage", props.currentPage - 1);
}
function goToNextPage() {
  if (props.currentPage < props.totalPages)
    emit("update:currentPage", props.currentPage + 1);
}
</script>

<template>
  <div class="pagination">
    <UIButton
      class="pagination__button"
      :disabled="currentPage === 1"
      data-test-id="pagination-prev"
      @click="goToPreviousPage"
    >
      &lt;
    </UIButton>
    <span class="pagination__info">
      Page
      <span data-test-id="pagination-current">{{ currentPage }}</span>
      of
      <span data-test-id="pagination-total">{{ totalPages }}</span>
    </span>
    <UIButton
      class="pagination__button"
      :disabled="currentPage === totalPages"
      data-test-id="pagination-next"
      @click="goToNextPage"
    >
      &gt;
    </UIButton>
  </div>
</template>

<style scoped>
.pagination {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 1rem;
}

.pagination__button {
  font-weight: 900;
}

.pagination__info {
  text-align: center;
  min-width: 120px;
  font-weight: 500;
}
</style>
