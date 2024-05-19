<script setup lang="ts">
import { reactive } from "vue";
import { UIButton, UIInput, UISelect, type UISelectOptions } from "@/components/ui";

type PossibleStatus = "alive" | "dead" | "unknown";
export interface IFilters {
  name?: string;
  status?: PossibleStatus;
}
const props = withDefaults(defineProps<{
  initialState?: Partial<IFilters>;
}>(), {
  initialState: () => ({
    name: undefined,
    status: undefined,
  }),
});
const emit = defineEmits<{
  updateFilters: [f: IFilters];
}>();

const statusOptions: UISelectOptions<PossibleStatus> = [
  { key: "1", label: "Unknown", value: "unknown" },
  { key: "2", label: "Alive", value: "alive" },
  { key: "3", label: "Dead", value: "dead" },
];

const filters = reactive<IFilters>({
  name: props.initialState.name,
  status: props.initialState.status,
});

function handleSubmit() {
  emit("updateFilters", { ...filters });
}
function handleReset() {
  filters.name = props.initialState.name;
  filters.status = props.initialState.status;
  emit("updateFilters", { ...filters });
}
</script>

<template>
  <div class="filters">
    <div class="filters__control">
      <label for="chars-gal-filters-name-input">Character name</label>
      <UIInput
        id="chars-gal-filters-name-input"
        v-model="filters.name"
        placeholder="Rick"
        data-test-id="name-input"
      />
    </div>
    <div class="filters__control">
      <label for="chars-gal-filters-status-input">Status</label>
      <UISelect
        id="chars-gal-filters-status-input"
        v-model="filters.status"
        :options="statusOptions"
        data-test-id="status-select"
      />
    </div>
    <div class="filters__buttons">
      <UIButton
        data-test-id="submit"
        @click="handleSubmit"
      >
        Submit
      </UIButton>
      <UIButton
        data-test-id="reset"
        @click="handleReset"
      >
        Reset
      </UIButton>
    </div>
  </div>
</template>

<style scoped>
.filters {
  padding: 16px;
  width: fit-content;
  background-color: hsl(var(--c-bg2));
  border-radius: var(--border-radius-md);
  box-shadow: var(--box-shadow-sm);

  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.filters__control {
  display: flex;
  flex-direction: column;
  align-items: start;
  gap: .5rem;
}
.filters__buttons {
  width: 100%;
  display: flex;
  gap: 1rem;
}
.filters__buttons :first-child {
  flex-grow: 1;
}

.filters__control > select {
  width: 100%;
}
</style>
