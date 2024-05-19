<script setup lang="ts">
import { reactive, ref, watch } from "vue";
import Filters, { type IFilters } from "./filters.vue";
import EmptyState from "./empty-state.vue";
import { CharactersGrid } from "@/components/characters-grid";
import { getCharacters } from "@/api";
import type { ICharacter } from "@/models/rick-and-morty";
import { UIPagination } from "@/components/ui";
import { ApiError } from "@/api/errors";

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
  <Filters
    @update-filters="handleUpdateFilters"
  />
</template>
