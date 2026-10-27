const BasePage = require("./base.page");

class FavoritesPage extends BasePage {
  get favoritesLink() {
    return $('[data-test="nav-my-favorites"]');
  }

  get productNames() {
    return $$('[data-test="product-name"]');
  }

  async open() {
    await this.click(this.favoritesLink);
  }

  async getProductNames() {
    const elements = await this.productNames;
    const names = [];
    for (let index = 0; index < elements.length; index += 1) {
      names.push(await elements[index].getText());
    }
    return names;
  }
}

module.exports = new FavoritesPage();
