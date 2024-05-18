import { describe, expect, it } from "vitest";
import type { VueWrapper } from "@vue/test-utils";
import { mount } from "@vue/test-utils";
import Pagination from ".";

describe("pagination component", () => {
  const E_UPDATE_CURENT_PAGE = "update:currentPage";

  it("can mount and render current page and total page correctly", () => {
    const totalPages = 10;
    const currentPage = 4;
    const wrapper = mount(Pagination, {
      props: {
        totalPages,
        currentPage,
      },
    });
    const currentEl = getCurrentPageText(wrapper);
    const totalEl = getTotalPagesText(wrapper);
    expect(currentEl.text()).toEqual(currentPage.toString());
    expect(totalEl.text()).toEqual(totalPages.toString());
  });

  describe("current page is not first or last page", () => {
    const totalPages = 11;
    const currentPage = 6;
    const wrapper = mount(Pagination, {
      props: {
        totalPages,
        currentPage,
      },
    });

    it(`increment current page by 1 when click on "next" button`, async () => {
      const nextBtn = getNextBtn(wrapper);
      await nextBtn.trigger("click");

      const emitted = wrapper.emitted(E_UPDATE_CURENT_PAGE);
      expect(emitted?.at(0)).toEqual([currentPage + 1]);
    });

    it(`decrement current page by 1 when click on "next" button`, async () => {
      const prevBtn = getPrevBtn(wrapper);
      await prevBtn.trigger("click");

      const emitted = wrapper.emitted(E_UPDATE_CURENT_PAGE);
      expect(emitted?.at(1)).toEqual([currentPage - 1]);
    });
  });

  describe("current page is the first page:", () => {
    const totalPages = 5;
    const currentPage = 1;
    const wrapper = mount(Pagination, {
      props: {
        totalPages,
        currentPage,
      },
    });

    it(`don't update current page when click on "prev" button`, async () => {
      const prevBtn = getPrevBtn(wrapper);
      await prevBtn.trigger("click");

      const emitted = wrapper.emitted();
      expect(emitted).not.haveOwnProperty(E_UPDATE_CURENT_PAGE);

      const currentEl = getCurrentPageText(wrapper);
      expect(currentEl.text()).toEqual(currentPage.toString());
    });
  });

  describe("current page is the last page:", () => {
    const totalPages = 5;
    const currentPage = 5;
    const wrapper = mount(Pagination, {
      props: {
        totalPages,
        currentPage,
      },
    });

    it(`don't update current page when click on "next" button`, async () => {
      const nextBtn = getNextBtn(wrapper);
      await nextBtn.trigger("click");

      const emitted = wrapper.emitted();
      expect(emitted).not.haveOwnProperty(E_UPDATE_CURENT_PAGE);

      const currentEl = getCurrentPageText(wrapper);
      expect(currentEl.text()).toEqual(currentPage.toString());
    });
  });
});

function getNextBtn(wrapper: VueWrapper) {
  return wrapper.find("[data-test-id='pagination-next']");
}
function getPrevBtn(wrapper: VueWrapper) {
  return wrapper.find("[data-test-id='pagination-prev']");
}
function getCurrentPageText(wrapper: VueWrapper) {
  return wrapper.find("[data-test-id='pagination-current']");
}
function getTotalPagesText(wrapper: VueWrapper) {
  return wrapper.find("[data-test-id='pagination-total']");
}
