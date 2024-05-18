import { describe, expect, it } from "vitest";
import { mount } from "@vue/test-utils";
import CharactersGrid from "./characters-grid.vue";
import { charactersList } from "@/__tests__/mocks";

describe("characters-grid component", () => {
  type CharactersGridProps = InstanceType<typeof CharactersGrid>["$props"];
  const props: CharactersGridProps = {
    characters: charactersList,
  };

  it("can mount", () => {
    const wrapper = mount(CharactersGrid, {
      props,
    });
    expect(wrapper.vm).toBeTruthy();
  });

  it("renders characters provided via props in cards", () => {
    const nOfChars = props.characters.length;
    const wrapper = mount(CharactersGrid, {
      props,
    });
    const cards = wrapper.findAll("[data-test-id='character-card']");
    expect(cards.length).toBe(nOfChars);

    cards.forEach((c, ix) => {
      expect(c.text()).toContain(props.characters[ix].name);
    });
  });
});
