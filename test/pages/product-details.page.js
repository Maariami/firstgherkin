const BasePage = require("./base.page");

class ProductDetailsPage extends BasePage {
  get title() {
    return $("h1");
  }

  get price() {
    return $(".price-section span span");
  }

  get description() {
    return $("#description");
  }

  get increaseQuantityButton() {
    return $('[data-test="increase-quantity"]');
  }

  get addToFavoritesButton() {
    return $("#btn-add-to-favorites");
  }

  get addToCartButton() {
    return $("#btn-add-to-cart");
  }

  get successToast() {
    return $(".toast-success");
  }

  async increaseQuantityBy(amount) {
    for (let count = 1; count < amount; count += 1) {
      await this.click(this.increaseQuantityButton);
    }
  }

  async addToFavorites() {
    await this.click(this.addToFavoritesButton);
  }

  async addToCart() {
    await this.click(this.addToCartButton);
  }

  async waitForSuccessToast() {
    await this.successToast.waitForDisplayed();
    return this.successToast.isDisplayed();
  }
}

module.exports = new ProductDetailsPage();
