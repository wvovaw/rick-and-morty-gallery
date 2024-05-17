import { describe, expect, it } from "vitest";
import { shallowMount } from "@vue/test-utils";
import app from "@/app.vue";

describe("app root component", () => {
  it("can mount", () => {
    const wrapper = shallowMount(app);
    expect(wrapper.vm).toBeTruthy();
  });
});
