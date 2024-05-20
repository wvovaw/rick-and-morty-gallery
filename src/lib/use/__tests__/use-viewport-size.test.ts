import { beforeEach, describe, expect, it, vi } from "vitest";
import { mount } from "@vue/test-utils";
import { useViewportSize } from "../use-viewport-size";

describe("useViewportSize composable", () => {
  // Setup testing environment default viewport sizes befoure each test case
  const DEFAULT_WIDTH = 1024;
  const DEFAULT_HEIGHT = 768;
  beforeEach(() => {
    window.innerWidth = DEFAULT_WIDTH;
    window.innerHeight = DEFAULT_HEIGHT;
  });

  const Comp = {
    template: `<template>
      <div id="vp-width">{{width}}</div>
      <div id="vp-height">{{height}}</div>
    </template>
    `,
    setup: () => {
      const { width, height } = useViewportSize();
      return { width, height };
    },
  };

  it ("correctly shows initial viewport sizes", () => {
    const wrapper = mount(Comp);

    const widthEl = wrapper.find("#vp-width");
    const heightEl = wrapper.find("#vp-height");
    expect(widthEl.text()).toEqual(DEFAULT_WIDTH.toString());
    expect(heightEl.text()).toEqual(DEFAULT_HEIGHT.toString());
  });

  it("correctly updates values after resize event fired", async () => {
    const wrapper = mount(Comp);

    const widthEl = wrapper.find("#vp-width");
    const heightEl = wrapper.find("#vp-height");

    for (let i = 1; i < 10; ++i) {
      const newWidth = 16 * i;
      const newHeight = 9 * i;
      window.innerWidth = newWidth;
      window.innerHeight = newHeight;
      window.dispatchEvent(new Event("resize"));

      await wrapper.vm.$nextTick();

      expect(widthEl.text()).toEqual(newWidth.toString());
      expect(heightEl.text()).toEqual(newHeight.toString());
    }
  });

  it("removes event listener on unmount", async () => {
    const wrapper = mount(Comp);

    const removeEventListenerSpy = vi.spyOn(window, "removeEventListener");

    wrapper.unmount();

    expect(removeEventListenerSpy).toHaveBeenCalledWith("resize", expect.any(Function));
    removeEventListenerSpy.mockRestore();
  });
});
