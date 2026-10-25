const { expect, assert } = require("chai");
const filters = require("../data/filters");
const chai = require("chai");
const sorts = require("../data/sort");
chai.should();

describe("Products Listing Page", () => {
  beforeEach(async () => {
    await browser.url("/");
    await browser.url("/");
  });

  it("User sees product details successfully", async () => {
    await $(
      '//*[contains(text(), "Combination Pliers")]/ancestor::div[1]',
    ).click();

    const title = await $("h1").getText();
    const price = await $(".price-section span span").getText();
    const desc = await $("#description").getText();

    expect(title).to.contain("Combination Pliers");
    expect(price).to.contain("14.15");
    expect(desc).to.include("combination pliers");
  });

  it("User searches for an exact product successfully", async () => {
    await $("#search-query").setValue("Protective Gloves");
    await $('//button[contains(text(),"Search")]').click();
    const product = await $(
      '//*[contains(text(), "Protective Gloves")]/ancestor::div[1]',
    );
    expect(await product.isDisplayed()).to.be.true;
  });

  filters.forEach((filter) => {
    const selected = [
      filter.brand,
      filter.category,
      filter.sustainability,
    ].filter(Boolean);

    it("User filters the products successfully", async () => {
      for (name of selected) {
        await $(`//label[contains(text(),"${name}")]`).click();
      }

      await browser.waitUntil(
        async () =>
          (await $$('[data-test="product-name"]')).length ===
          filter.expected.length,
        {
          timeoutMsg: `Expected ${filter.expected.length} products after filtering`,
        },
      );

      const filteredItems = [];
      for (const product of await $$('[data-test="product-name"]')) {
        filteredItems.push(await product.getText());
      }

      filteredItems.sort().should.deep.equal([...filter.expected].sort());
    });
  });

  sorts.forEach((sort) => {
    it("User sorts the products successfully", async () => {
      const GetPrices = async () => {
        const prices = [];
        for (const product of await $$('[data-test="product-price"]')) {
          const text = await product.getText();
          prices.push(parseFloat(text.replace(/[^0-9.]/g, "")));
        }
        return prices;
      };

      const getNames = async () => {
        const names = [];
        for (const product of await $$('[data-test="product-name"]')) {
          names.push((await product.getText()).trim());
        }
        return names;
      };

      const compareValue =
        sort.type === "price" ? (a, b) => a - b : (a, b) => a.localeCompare(b);

      const sortOrder =
        sort.order === "asc" ? compareValue : (a, b) => compareValue(b, a);

      const sortingValues = async () =>
        sort.type === "price" ? await GetPrices() : await getNames();

      await $('[data-test="sort"]').selectByVisibleText(sort.option);

      await browser.waitUntil(
        async () => {
          const current = await sortingValues();
          return (
            current.length > 0 &&
            JSON.stringify(current) ===
              JSON.stringify([...current].sort(sortOrder))
          );
        },
        {
          timeout: 8000,
          timeoutMsg: `Products were not sorted by ${sort.option}`,
        },
      );

      const values = await sortingValues();
      const expected = [...values].sort(sortOrder);

      assert.deepEqual(values, expected);
    });
  });
});
