<script setup lang="ts">
import { CharactersGallery } from "@/widgets/characters-gallery";
import { UILoading } from "@/components/ui";
</script>

<template>
  <main class="page">
    <Suspense>
      <template #fallback>
        <UILoading class="loading" />
      </template>
      <CharactersGallery />
    </Suspense>
  </main>
</template>

<style scoped>
.page {
  padding: 1rem;
}
.loading {
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
}
</style>
