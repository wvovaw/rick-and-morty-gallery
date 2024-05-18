import { describe, expect, it } from "vitest";
import { shallowMount } from "@vue/test-utils";
import { defineComponent } from "vue";
import CharactersGallery from "../characters-gallery.vue";

describe("characters-gallery widget component", () => {
  const SuspendedCharactersGallery = defineComponent({
    components: { CharactersGallery },
    template: "<Suspense><CharactersGallery /></Suspense>",
  });
  it("can mount", () => {
    const wrapper = shallowMount(SuspendedCharactersGallery);
    expect(wrapper.vm).toBeTruthy();
  });
});
