<script setup lang="ts">
import { computed, reactive, ref, watch } from "vue";
import Filters, { type IFilters } from "./filters.vue";
import EmptyState from "./empty-state.vue";
import { FloatingPannel } from "@/components/floating-pannel";
import { CharactersGrid } from "@/components/characters-grid";
import { getCharacters } from "@/api";
import type { ICharacter } from "@/models/rick-and-morty";
import { UIPagination } from "@/components/ui";
import { ApiError } from "@/api/errors";
import { useViewportSize } from "@/lib/use";

const { width } = useViewportSize();
const isUnder768 = computed(() => width.value < 768);

const chars = ref<ICharacter[]>([]);

const pagination = reactive({
  currentPage: 1,
  totalPages: 1,
});
function handleUpdateCurrentPage(newPage: number) {
  pagination.currentPage = newPage;
}

const filters = reactive<IFilters>({
  name: undefined,
  status: undefined,
});
function handleUpdateFilters(newFilters: IFilters) {
  filters.name = newFilters.name;
  filters.status = newFilters.status;
  pagination.currentPage = 1;
}

async function fetchData() {
  try {
    const res = await getCharacters({
      page: pagination.currentPage,
      filters: { name: filters.name, status: filters.status },
    });

    if (res) {
      chars.value = res.results;
      pagination.totalPages = res.info.pages;
    }
  }
  catch (e: unknown) {
    if (e instanceof ApiError) {
      if (e.code === "CHARACTERS_NOT_FOUND") {
        chars.value = [];
        pagination.totalPages = 1;
        pagination.currentPage = 1;
      }
    }
    else { throw e; }
  }
}

watch([
  filters,
  () => pagination.currentPage,
], () => {
  fetchData();
});

await fetchData();
</script>

<template>
  <CharactersGrid
    v-if="chars.length"
    :characters="chars"
  />
  <EmptyState v-else>
    No characters found
  </EmptyState>
  <UIPagination
    :current-page="pagination.currentPage"
    :total-pages="pagination.totalPages"
    @update:current-page="handleUpdateCurrentPage"
  />
  <FloatingPannel
    :position="isUnder768 ? 'bottom' : 'left'"
    :offset-percentage="isUnder768 ? 50 : 80"
    :visible-margin-px="isUnder768 ? 0 : 20"
    :hidden-margin-px="16"
  >
    <Filters
      @update-filters="handleUpdateFilters"
    />
    <template #handle-icon>
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M22 3H2l8 9.46V19l4 2v-8.54z" /></svg>
    </template>
  </FloatingPannel>
</template>
