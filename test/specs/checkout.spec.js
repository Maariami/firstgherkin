const { expect, assert } = require("chai");
const user = require("../data/user");
const authPage = require("../pages/auth.page");
const cartPage = require("../pages/cart.page");
const checkoutPage = require("../pages/checkout.page");
const homePage = require("../pages/home.page");
const productDetailsPage = require("../pages/product-details.page");
const productsPage = require("../pages/products.page");
const chai = require("chai");
chai.should();

describe("Cart and checkout", () => {
  beforeEach(async () => {
    await homePage.open();
    await authPage.login(user);
    await homePage.open();
  });

  it("User adds products to cart successfully", async () => {
    const productName = "Bolt Cutters";
    await productsPage.open();
    await productsPage.search(productName);
    await productsPage.openProduct(productName);
    const quantity = 2;
    await productDetailsPage.increaseQuantityBy(quantity);
    await productDetailsPage.addToCart();
    assert.isTrue(await productDetailsPage.waitForSuccessToast());

    await checkoutPage.open("/checkout");
    await cartPage.waitForItems();
    const cart = await cartPage.getItems();
    const item = cart.find((product) => product.title === productName);
    item.should.exist;
    expect(item.quantity).to.equal(quantity);
  });

  it("User checks out successfully", async () => {
    await checkoutPage.open("/checkout");
    await cartPage.waitForItems();

    const productName = "Bolt Cutters";
    const cart = await cartPage.getItems();
    const item = cart.find((product) => product.title === productName);
    assert.exists(item, `"${productName}" is not in the cart`);

    await cartPage.beginCheckout();
    const successMessage = await checkoutPage.completeCashOnDelivery(
      user.houseNumber,
    );
    expect(successMessage).to.contain("Payment was successful");
    assert.isTrue(await checkoutPage.orderConfirmation.isDisplayed());
  });
});
