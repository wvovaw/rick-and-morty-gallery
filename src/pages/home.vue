<script setup lang="ts">
import { CharactersGrid } from "@/components/characters-grid";
import { charactersList } from "@/__tests__/mocks";
</script>

<template>
  <main>
    <CharactersGrid
      :characters="charactersList"
    />
  </main>
</template>
