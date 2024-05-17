import { describe, expect, it } from "vitest";
import { mount } from "@vue/test-utils";
import { CharacterCard } from "@/components/character-card";
import { character, episode } from "@/__tests__/mocks";

describe("character-card component", () => {
  type CharacterCardProps = InstanceType<typeof CharacterCard>["$props"];
  const testProps: CharacterCardProps = {
    image: {
      src: character.image,
      alt: character.name,
    },
    name: character.name,
    status: character.status,
    location: character.location.name,
    episode: episode.name,
  };

  it("can mount", () => {
    const wrapper = mount(CharacterCard, {
      props: testProps,
    });
    expect(wrapper.vm).toBeTruthy();
  });

  describe("corectly displaying character information", () => {
    const wrapper = mount(CharacterCard, {
      props: testProps,
    });

    it("name", () => {
      const nameEl = wrapper.find("[data-test-id='name']");
      expect(nameEl.text()).toBe(testProps.name);
    });
    it("status", () => {
      const statEl = wrapper.find("[data-test-id='status']");
      expect(statEl.text().toLowerCase()).toBe(testProps.status?.toLowerCase());
    });
    it("location", () => {
      const locEl = wrapper.find("[data-test-id='location']");
      expect(locEl.text()).toBe(testProps.location);
    });
    it("episode", () => {
      const epEl = wrapper.find("[data-test-id='episode']");
      expect(epEl.text()).toBe(testProps.episode);
    });
    it("image", () => {
      const imgEl = wrapper.find("[data-test-id='image']");
      expect(imgEl.attributes('src')).toBe(testProps.image.src);
    });
  });
});
