import { describe, expect, it } from "vitest";
import { mount } from "@vue/test-utils";
import UIInput from "./input.vue";

describe("ui-input component", () => {
  it("renders an html input element with placeholder", () => {
    const placeholder = "This is placeholder";
    const wrapper = mount(UIInput, {
      props: {
        placeholder,
      },
    });
    const inputEl = wrapper.find("input");
    expect(inputEl.element.placeholder).toEqual(placeholder);
  });

  describe("disabled=false", () => {
    it("model value updates as expected", async () => {
      const wrapper = mount(UIInput, {
        props: {
          modelValue: "",
        },
      });

      const inputText = "Test input text";
      const inputEl = wrapper.find("input");
      await inputEl.setValue(inputText);
      const emitted = wrapper.emitted("update:modelValue");
      expect(emitted?.at(0)).toEqual([inputText]);
    });
  });
  describe("disabled=true", () => {
    it("has 'disabled' html attribute", () => {
      const wrapper = mount(UIInput, {
        props: {
          disabled: true,
        },
      });
      const inputEl = wrapper.find("input");
      expect(inputEl.element.disabled).toEqual(true);
    });

    it("model value don't update", async () => {
      const currentModelValue = "current value";
      const wrapper = mount(UIInput, {
        props: {
          modelValue: currentModelValue,
          disabled: true,
        },
      });
      const inputEl = wrapper.find("input");
      await inputEl.setValue("test value change");
      const emitted = wrapper.emitted("update:modelValue");
      expect(emitted).toEqual(undefined);
    });
  });
});
