import { describe, expect, it } from "vitest";
import type { VueWrapper } from "@vue/test-utils";
import { mount } from "@vue/test-utils";
import Filters from "../filters.vue";

type FilterProps = InstanceType<typeof Filters>["$props"];

describe("characters-gallery widget component", () => {
  describe("filter component", () => {
    it("renders fields correctly", () => {
      const wrapper = mountFilters({ name: "Rick", status: "alive" });

      const nameInputEl = getNameInput(wrapper);
      const statusSelectEl = getStatusSelect(wrapper);
      const submitBtn = getSubmitButton(wrapper);
      const resetBtn = getResetButton(wrapper);

      expect(nameInputEl.element instanceof HTMLInputElement).toBe(true);
      expect(statusSelectEl.element instanceof HTMLSelectElement).toBe(true);
      expect(submitBtn.element instanceof HTMLButtonElement).toBe(true);
      expect(resetBtn.element instanceof HTMLButtonElement).toBe(true);
    });

    it("emits updateFilters event with correct values on submit", async () => {
      const initialState: FilterProps["initialState"] = { name: "Rick", status: "alive" };
      const newState: FilterProps["initialState"] = { name: "Morty", status: "dead" };
      const wrapper = mountFilters(initialState);

      // Set new data
      const nameInputEl = getNameInput(wrapper);
      await nameInputEl.setValue(newState.name);

      const statusSelectEl = getStatusSelect(wrapper);
      await statusSelectEl.setValue(newState.status);

      const submitBtn = getSubmitButton(wrapper);
      await submitBtn.trigger("click");

      // Fields after submit
      expect((nameInputEl.element as HTMLInputElement).value).toBe(newState.name);
      expect((statusSelectEl.element as HTMLSelectElement).value).toBe(newState.status);

      const emitted = wrapper.emitted("updateFilters");
      expect(emitted?.[0]).toEqual([newState]);
    });

    it("resets filters to initial state when reset button is clicked", async () => {
      const initialState: FilterProps["initialState"] = { name: "Rick", status: "alive" };
      const newState: FilterProps["initialState"] = { name: "Morty", status: "dead" };
      const wrapper = mountFilters(initialState);

      // Set new data
      const nameInputEl = getNameInput(wrapper);
      await nameInputEl.setValue(newState.name);

      const statusSelectEl = getStatusSelect(wrapper);
      await statusSelectEl.setValue(newState.status);

      const submitBtn = getSubmitButton(wrapper);
      await submitBtn.trigger("click");

      // Reset
      const resetBtn = getResetButton(wrapper);
      await resetBtn.trigger("click");

      // Fields after reset
      expect((nameInputEl.element as HTMLInputElement).value).toBe(initialState.name);
      expect((statusSelectEl.element as HTMLSelectElement).value).toBe(initialState.status);

      // updateFitlters has been emited twice
      const emitted = wrapper.emitted("updateFilters");
      expect(emitted).toEqual([[newState], [initialState]]);
    });
  });
});

function mountFilters(
  initialState: FilterProps["initialState"] = { name: undefined, status: undefined },
) {
  return mount(Filters, {
    props: {
      initialState,
    },
  });
}
function getNameInput(wrapper: VueWrapper) {
  return wrapper.find("[data-test-id='name-input']");
}
function getStatusSelect(wrapper: VueWrapper) {
  return wrapper.find("[data-test-id='status-select']");
}
function getSubmitButton(wrapper: VueWrapper) {
  return wrapper.find("[data-test-id='submit']");
}
function getResetButton(wrapper: VueWrapper) {
  return wrapper.find("[data-test-id='reset']");
}
