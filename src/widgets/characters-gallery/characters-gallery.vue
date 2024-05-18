<script setup lang="ts">
import { reactive, ref, watchEffect } from "vue";
import { CharactersGrid } from "@/components/characters-grid";
import { getCharacters } from "@/api";
import type { ICharacter } from "@/models/rick-and-morty";
import { UIPagination } from "@/components/ui";

const chars = ref<ICharacter[]>([]);
const pagination = reactive({
  currentPage: 1,
  totalPages: 1,
});

watchEffect(() => {
  fetchData();
});

async function fetchData() {
  const res = await getCharacters(pagination.currentPage);
  if (res?.results) {
    chars.value = res.results;
    pagination.totalPages = res.info.pages;
  }
}
await fetchData();
</script>

<template>
  <CharactersGrid
    :characters="chars"
  />
  <UIPagination
    :current-page="pagination.currentPage"
    :total-pages="pagination.totalPages"
    @update:current-page="(newPage) => pagination.currentPage = newPage"
  />
</template>

<style scoped>
</style>
