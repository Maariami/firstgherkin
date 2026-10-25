const { login } = require("../data/login");
const { expect, assert } = require("chai");
const chai = require("chai");
chai.should();

describe("Add to cart and Check out", () => {
  beforeEach(async () => {
    await browser.url("/");
    await login();
  });
  it("User adds products to cart successfully", async () => {
    await $(`//a[contains(text(),"Home")]`).click();
    const productName = "Bolt Cutters";
    await $(`#search-query`).setValue(productName);
    await $(`//button[contains(text(),"Search")]`).click();
    await $(`//h5[contains(text(),"${productName}")]`).click();
    const quantity = 2;
    for (let i = 1; i < quantity; i++) {
      await $('[data-test="increase-quantity"]').click();
    }
    await $(`#btn-add-to-cart`).click();
    const succmesg = await $(`.toast-success`).waitForDisplayed();
    expect(succmesg).to.be.true;

    await $('[aria-label="cart"]').click();
    await $$('[data-test="product-title"]')[0].waitForDisplayed();
    const titles = await $$('[data-test="product-title"]').map((el) =>
      el.getText(),
    );
    const quantities = await $$('[data-test="product-quantity"]').map((el) =>
      el.getValue(),
    );

    const cart = titles.map((title, i) => ({
      title: title.trim(),
      quantity: Number(quantities[i]),
    }));
    const item = cart.find((p) => p.title === productName);
    expect(item, "product not found in cart").to.exist;
    item.quantity.should.equal(quantity);
  });
  it("User checks out successfully", async () => {
    await browser.url("/checkout");
    await $$('[data-test="product-title"]')[0].waitForDisplayed();

    const productName = "Bolt Cutters";

    const titles = await $$('[data-test="product-title"]').map((el) =>
      el.getText(),
    );
    const quantities = await $$('[data-test="product-quantity"]').map((el) =>
      el.getValue(),
    );

    const cart = titles.map((title, i) => ({
      title: title.trim(),
      quantity: Number(quantities[i]),
    }));
    const item = cart.find((p) => p.title === productName);
    assert.exists(item, "product not found in cart");

    await $(`[data-test="proceed-1"]`).click();
    await $(`[data-test="proceed-2"]`).click();
    const house = await $(`#house_number`);
    await house.waitForDisplayed();
    await house.setValue("12");

    await $('[data-test="proceed-3"]').waitForEnabled({ timeout: 10000 });
    await $('[data-test="proceed-3"]').click();
    await $('[data-test="payment-method"]').selectByAttribute(
      "value",
      "cash-on-delivery",
    );
    await $(`[data-test="finish"]`).click();
    const sucmsg = await $(
      `[data-test="payment-success-message"]`,
    ).waitForDisplayed();
    expect(sucmsg).to.be.true;
    await $(`//button[contains(text(),"Confirm")]`).click();
    const inv = await $(`#order-confirmation`).waitForDisplayed();
    inv.should.be.true;
  });
});
