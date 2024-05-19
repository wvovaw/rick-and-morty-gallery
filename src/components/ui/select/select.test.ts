import { describe, expect, it } from "vitest";
import { mount } from "@vue/test-utils";
import Select from "./select.vue";
import type { Options } from "./select.vue";

describe("ui-select component", () => {
  const options: Options<number> = [
    { key: "1", label: "1", value: 1 },
    { key: "2", label: "2", value: 2 },
    { key: "3", label: "3", value: 3 },
  ];

  it("renders an html select element with provided options", () => {
    const modelValue = 1;
    const wrapper = mount(Select, {
      props: {
        options,
        modelValue,
      },
    });
    const selectEl = wrapper.find("select");
    const selectOptionsEls = selectEl.findAll("option");

    selectOptionsEls.forEach((o, ix) => {
      expect(o.element.value).toBe(options[ix].value.toString());
      expect(o.element.text).toBe(options[ix].key);
    });
  });

  it("updates modelValue when selected value change", async () => {
    const modelValue = 1;
    const wrapper = mount(Select, {
      props: {
        options,
        modelValue,
      },
    });

    const selectEl = wrapper.find("select");
    const option3El = wrapper.findAll("option")[2];
    await selectEl.setValue(option3El.element.value);

    const emitted = wrapper.emitted("update:modelValue");
    expect(emitted!.at(0)).toEqual([options[2].value.toString()]);
  });
});
