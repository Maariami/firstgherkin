const { expect, assert } = require("chai");
const filters = require("../data/filters");
const chai = require("chai");
const sorts = require("../data/sort");
const productsPage = require("../pages/products.page");
const productDetailsPage = require("../pages/product-details.page");
chai.should();

describe("Products", () => {
  beforeEach(async () => {
    await productsPage.open();
  });

  it("User sees product details successfully", async () => {
    await productsPage.openProduct("Combination Pliers");

    const title = await productDetailsPage.title.getText();
    const price = await productDetailsPage.price.getText();
    const description = await productDetailsPage.description.getText();

    expect(title).to.contain("Combination Pliers");
    assert(price, "14.15");
    description.should.include("combination pliers");
  });

  it("User searches for an exact product successfully", async () => {
    const productName = "Protective Gloves";
    await productsPage.search(productName);
    expect(await productsPage.getProductNames()).to.include(productName);
  });

  filters.forEach((filter) => {
    it("User filters the products successfully", async () => {
      await productsPage.applyFilters(filter);

      await browser.waitUntil(
        async () =>
          (await productsPage.productNames).length ===
          filter.expectedProductNames.length,
        {
          timeoutMsg: `Expected ${filter.expectedProductNames.length} products after filtering`,
        },
      );

      const filteredItems = await productsPage.getProductNames();
      filteredItems
        .sort()
        .should.deep.equal([...filter.expectedProductNames].sort());
    });
  });

  sorts.forEach((sort) => {
    it("User sorts the products successfully", async () => {
      const sortOption =
        sort.type === "price" ? (a, b) => a - b : (a, b) => a.localeCompare(b);
      const sortOrder =
        sort.order === "asc" ? sortOption : (a, b) => sortOption(b, a);

      await productsPage.sortBy(sort.option);

      await browser.waitUntil(
        async () => {
          const sortedItems = await productsPage.getSortedProducts(sort.type);
          return (
            sortedItems.length > 0 &&
            JSON.stringify(sortedItems) ===
              JSON.stringify([...sortedItems].sort(sortOrder))
          );
        },
        {
          timeout: 8000,
          timeoutMsg: `Products were not sorted by ${sort.option}`,
        },
      );

      const sortedProducts = await productsPage.getSortedProducts(sort.type);
      const expectedResult = [...sortedProducts].sort(sortOrder);
      assert.deepEqual(sortedProducts, expectedResult);
    });
  });
});
