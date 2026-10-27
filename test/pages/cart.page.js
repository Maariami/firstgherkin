const BasePage = require("./base.page");

class CartPage extends BasePage {
  get productTitles() {
    return $$('[data-test="product-title"]');
  }

  get productQuantities() {
    return $$('[data-test="product-quantity"]');
  }

  get firstCheckoutButton() {
    return $('[data-test="proceed-1"]');
  }

  get secondCheckoutButton() {
    return $('[data-test="proceed-2"]');
  }

  async waitForItems() {
    await this.productTitles[0].waitForDisplayed();
  }

  async getItems() {
    const titles = await this.productTitles;
    const quantities = await this.productQuantities;
    const items = [];
    for (let index = 0; index < titles.length; index += 1) {
      items.push({
        title: (await titles[index].getText()).trim(),
        quantity: Number(await quantities[index].getValue()),
      });
    }
    return items;
  }

  async beginCheckout() {
    await this.click(this.firstCheckoutButton);
    await this.click(this.secondCheckoutButton);
  }
}

module.exports = new CartPage();
