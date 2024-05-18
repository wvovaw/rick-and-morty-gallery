<script setup lang="ts">
import type { ICharacter } from "@/models/rick-and-morty";
import { CharacterCard } from "@/components/character-card";

defineProps<{
  characters: ICharacter[];
}>();
</script>

<template>
  <div class="container">
    <div class="grid">
      <CharacterCard
        v-for="char in characters"
        :key="char.id"
        :name="char.name"
        :image="{
          alt: char.name,
          src: char.image,
        }"
        :location="char.location.name"
        :status="char.status"
        :episode="char.episode[0]"
        data-test-id="character-card"
      />
    </div>
  </div>
</template>

<style scoped>
.container {
  --gap-size: 16px;

  width: 100%;
  display: flex;
  justify-content: center;
  container-type: inline-size;
  padding: var(--gap-size);
}

.grid {
  display: grid;
  grid-auto-flow: row;
  gap: var(--gap-size);
}

@container (min-width: 1024px) {
  .grid {
    grid-template-columns: 1fr 1fr;
  }
}
</style>
