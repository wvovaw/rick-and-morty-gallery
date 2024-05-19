import { beforeEach, describe, expect, it, vi } from "vitest";
import { flushPromises, mount } from "@vue/test-utils";
import { CharacterCard } from "@/components/character-card";
import { character, episode } from "@/__tests__/mocks";
import { useEpisode } from "@/composables/useEpisode";

vi.mock("@/composables/useEpisode", () => ({
  useEpisode: vi.fn(),
}));

describe("character-card component", () => {
  beforeEach(() => {
    vi.resetAllMocks();
  });

  type CharacterCardProps = InstanceType<typeof CharacterCard>["$props"];
  const testProps: CharacterCardProps = {
    image: {
      src: character.image,
      alt: character.name,
    },
    name: character.name,
    status: character.status,
    location: character.location.name,
    episode: character.episode[0],
  };

  it("can mount", () => {
    const wrapper = mount(CharacterCard, {
      props: testProps,
    });
    expect(wrapper.vm).toBeTruthy();
  });

  describe("corectly displaying character information", async () => {
    const wrapper = mount(CharacterCard, {
      props: testProps,
    });

    it("name", () => {
      const nameEl = wrapper.find("[data-test-id='name']");
      expect(nameEl.text()).toEqual(testProps.name);
    });
    it("status", () => {
      const statEl = wrapper.find("[data-test-id='status']");
      expect(statEl.text().toLowerCase()).toEqual(testProps.status?.toLowerCase());
    });
    it("location", () => {
      const locEl = wrapper.find("[data-test-id='location']");
      expect(locEl.text()).toEqual(testProps.location);
    });
    it("image", () => {
      const imgEl = wrapper.find("[data-test-id='image']");
      expect(imgEl.attributes("src")).toEqual(testProps.image.src);
    });

    describe("episode", () => {
      it("displays eskeleton loader while episode name is loading", () => {
        (useEpisode as any).mockResolvedValueOnce(episode);
        const wrapper = mount(CharacterCard, {
          props: testProps,
        });
        const skeletonEl = wrapper.find("[data-test-id='episode-skeleton']");
        expect(skeletonEl.exists()).toBeTruthy();
      });
      it("displays episode name when ready", async () => {
        (useEpisode as any).mockResolvedValueOnce(episode);
        const wrapper = mount(CharacterCard, {
          props: testProps,
        });
        await flushPromises();
        const epEl = wrapper.find("[data-test-id='episode']");
        expect(epEl.text()).toEqual(episode.name);
      });
      it("displays 'Unknown' if episode is not found", async () => {
        (useEpisode as any).mockResolvedValueOnce(null);
        const wrapper = mount(CharacterCard, {
          props: testProps,
        });
        await flushPromises();

        const epEl = wrapper.find("[data-test-id='episode']");
        expect(epEl.text()).toEqual("Unknown");
      });
    });
  });
});
