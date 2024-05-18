<script setup lang="ts">
import { onMounted, ref } from "vue";
import { CharactersGrid } from "@/components/characters-grid";
import { getCharacters } from "@/api";
import type { ICharacter } from "@/models/rick-and-morty";

const chars = ref<ICharacter[]>([]);

onMounted(async () => {
  const res = await getCharacters();
  if (res?.results)
    chars.value = res.results;
});
</script>

<template>
  <main>
    <CharactersGrid
      :characters="chars"
    />
  </main>
</template>
