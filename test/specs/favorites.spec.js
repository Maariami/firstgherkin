const { expect } = require("chai");
const user = require("../data/user");
const authPage = require("../pages/auth.page");
const favoritesPage = require("../pages/favorites.page");
const homePage = require("../pages/home.page");
const productDetailsPage = require("../pages/product-details.page");
const productsPage = require("../pages/products.page");

describe("Favorites", () => {
  beforeEach(async () => {
    await homePage.open();
    await authPage.login(user);
  });

  it("User adds products to favorites successfully", async () => {
    const productName = "Protective Gloves";
    await homePage.openMenu();
    await favoritesPage.open();
    let favorites = await favoritesPage.getProductNames();

    if (!favorites.some((name) => name.includes(productName))) {
      await productsPage.open();
      await productsPage.search(productName);
      await productsPage.openProduct(productName);
      await productDetailsPage.addToFavorites();

      await homePage.openMenu();
      await favoritesPage.open();
      await browser.waitUntil(
        async () =>
          (await favoritesPage.getProductNames()).some((name) =>
            name.includes(productName),
          ),
        { timeoutMsg: `"${productName}" was not added to favorites` },
      );
      favorites = await favoritesPage.getProductNames();
    }

    expect(favorites.some((name) => name.includes(productName))).to.be.true;
  });
});
