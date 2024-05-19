<script setup lang="ts">
import { onMounted, ref } from "vue";
import Status from "./status.vue";
import { useEpisode } from "@/composables/useEpisode";

const props = defineProps<{
  image: {
    src: string;
    alt: string;
  };
  name: string;
  status?: string;
  location: string;
  episode: string;
}>();

const episodeName = ref<string | undefined>();
onMounted(async () => {
  const ep = await useEpisode(props.episode);
  if (ep)
    episodeName.value = ep.name;
  else episodeName.value = "Unknown";
});
</script>

<template>
  <div class="card">
    <div class="card__aside">
      <img :src="image.src" :alt="image.alt" data-test-id="image">
    </div>
    <div class="card__body">
      <div class="card__section">
        <div class="name" data-test-id="name">
          {{ name }}
        </div>
        <Status :status="status" data-test-id="status" />
      </div>
      <div class="card__section">
        <span class="label">Last location:</span>
        <span class="location" data-test-id="location">{{ location }}</span>
      </div>
      <div class="card__section">
        <span class="label">First seen in:</span>
        <span class="episode" data-test-id="episode">
          <template v-if="episodeName">
            {{ episodeName }}
          </template>
          <div
            v-else
            class="skeleton episode-skeleton"
            data-test-id="episode-skeleton"
          />
        </span>
      </div>
    </div>
  </div>
</template>

<style scoped>
.name {
  font-size: 1.5rem;
  font-weight: 500;
}
.label {
  font-size: 0.8rem;
  letter-spacing: 1px;
  color: hsl(var(--c-fg-muted));
}
.card {
  border: 1px solid hsl(var(--c-border));
  background: hsl(var(--c-bg2));
  box-shadow: var(--box-shadow-sm);
  border-radius: var(--border-radius-md);
  overflow: hidden;
}
.card__body {
  padding: 12px;
  display: flex;
  flex-direction: column;
  gap: 1rem;
  justify-content: space-between;
}
.card__section {
  display: flex;
  flex-direction: column;
}

@media only screen and (max-width: 520px) {
  .card {
    display: flex;
    flex-direction: column;
    max-width: 300px;
  }
  .card__aside {
    overflow: hidden;
    width: 100%;
    border-radius: var(--border-radius-md) var(--border-radius-md) 0 0;
  }
  .card__aside img {
    object-fit: cover;
  }
}
@media only screen and (min-width: 521px) {
  .card {
    display: grid;
    grid-template-columns: 180px 1fr;
    max-width: 520px;
  }
  .card__aside {
    overflow: hidden;
    border-radius: var(--border-radius-md) 0 0 var(--border-radius-md);
  }
  .card__aside img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
}

.episode-skeleton {
  height: 1em;
  width: 120px;
  margin-top: .5em;
}
</style>
