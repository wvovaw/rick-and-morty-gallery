<script setup lang="ts">
import { CharacterCard } from "@/components/character-card";
import { character, episode } from "@/__tests__/mocks";
</script>

<template>
  <main>
    <CharacterCard
      :name="character.name"
      :image="{
        alt: character.name,
        src: character.image,
      }"
      :location="character.location.name"
      :status="character.status"
      :episode="episode.name"
    />
  </main>
</template>
