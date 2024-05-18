import { describe, expect, it } from "vitest";
import { mount } from "@vue/test-utils";
import { UIButton } from "@/components/ui";

describe("ui-button component", () => {
  it("renders an html button by default", () => {
    const wrapper = mount(UIButton);
    const buttonRoot = wrapper.find("button");
    expect(buttonRoot).toBeDefined();
  });

  it("renders as 'a' if prop 'as=a' defined", () => {
    const wrapper = mount(UIButton, { props: { as: "a" } });
    const buttonRoot = wrapper.find("a");
    expect(buttonRoot).toBeDefined();
  });

  it("renders default slot content", () => {
    const content = "Click me";
    const wrapper = mount(UIButton, { slots: { defalt: content } });
    const buttonRoot = wrapper.find(content);
    expect(buttonRoot).toBeDefined();
  });

  it("click event works", async () => {
    const wrapper = mount(UIButton);
    await wrapper.trigger("click");
    expect(wrapper.emitted()).toHaveProperty("click");
  });
});
