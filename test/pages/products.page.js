const BasePage = require("./base.page");

class ProductsPage extends BasePage {
  get searchInput() {
    return $("#search-query");
  }

  get searchButton() {
    return $('//button[contains(text(),"Search")]');
  }

  get sortSelect() {
    return $('[data-test="sort"]');
  }

  get productNames() {
    return $$('[data-test="product-name"]');
  }

  get productPrices() {
    return $$('[data-test="product-price"]');
  }

  productCard(name) {
    return $(`//h5[contains(normalize-space(.), "${name}")]`);
  }

  filterOption(name) {
    return $(`//label[contains(text(),"${name}")]`);
  }

  async search(name) {
    await this.searchInput.setValue(name);
    await this.click(this.searchButton);
    await this.productCard(name).waitForDisplayed();
  }

  async openProduct(name) {
    const product = this.productCard(name);
    await product.waitForDisplayed();
    await this.click(product);
    const title = $("h1");
    await title.waitForDisplayed();
    await browser.waitUntil(
      async () => (await title.getText()).includes(name),
      { timeoutMsg: `Product details did not open for "${name}"` },
    );
  }

  async applyFilters(filters) {
    const filterCriteria = [
      filters.brand,
      filters.category,
      filters.sustainability,
    ].filter(Boolean);
    for (const value of filterCriteria) {
      await this.click(this.filterOption(value));
    }
  }

  async getProductNames() {
    const elements = await this.productNames;
    const names = [];
    for (let index = 0; index < elements.length; index += 1) {
      names.push(await elements[index].getText());
    }
    return names;
  }

  async sortBy(option) {
    await this.sortSelect.scrollIntoView();
    await this.sortSelect.waitForDisplayed();
    await this.sortSelect.selectByVisibleText(option);
  }

  async getSortedProducts(type) {
    if (type === "name") {
      const elements = await this.productNames;
      const names = [];
      for (let index = 0; index < elements.length; index += 1) {
        names.push((await elements[index].getText()).trim());
      }
      return names;
    } else if (type === "price") {
      const elements = await this.productPrices;
      const prices = [];
      for (let index = 0; index < elements.length; index += 1) {
        const text = await elements[index].getText();
        prices.push(parseFloat(text.replace(/[^0-9.]/g, "")));
      }
      return prices;
    }
  }
}

module.exports = new ProductsPage();
