import { describe, expect, it } from "vitest";
import { mount } from "@vue/test-utils";
import app from "@/app.vue";

describe("app root component", () => {
  it("can mount", () => {
    const wrapper = mount(app);
    expect(wrapper.vm).toBeTruthy();
  });
});
